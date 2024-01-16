import Fastify, { FastifyInstance } from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyCookie from "@fastify/cookie";
import FastifyFormBody from "@fastify/formbody";
import FastifyMultipart from "@fastify/multipart";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises"
import Output from "./modules/Output.js";
import env from "./env.js";
import SessionRepository from "./modules/repositories/SessionRepository.js";


export default class App {
	private _app: FastifyInstance;
    private _orm: PrismaClient;
    private readonly _envMode: "production" | "development";

    public get orm() {
        return this._orm;
    }

    public get fastify() {
        return this._app;
    }

    private async initializeRoutes() {
        const files = await fs.readdir("dist/modules/routes");

        for (const file of files) {
            if(file.endsWith("js")) {
                const routes = await import(`./modules/routes/${file}`)

                for (const route of routes.default) {
                    this._app.route(route);
                }
            }
        }
    }

    constructor() {
        this._envMode = process.env.NODE_ENV as any;

        try {
            this._orm = new PrismaClient();
        } catch (error: any) {
            Output.init().bg("red").fg("white").print('Unable to connect to the database:'+error.message);
            throw(error);
        }

        this._app = Fastify();
        this._app.register(FastifyStatic,{root: path.join(dirname(fileURLToPath(import.meta.url)), 'public/assets')});

        this._app.register(FastifyCookie);
        this._app.register(FastifyFormBody);
        this._app.register(FastifyMultipart);
       

        // If request doesn't match with any api calls, then redirect to web portal, so react router can handle it.
        this._app?.setNotFoundHandler(async (req,res)=>{

            const url=req.url.toLowerCase();

            if(url.startsWith("/api")) {
                res.status(404);
                res.send({
                    status: "Failure",
                    errCode: "InvalidEndpoint",
                    message: "Requested API url and/or method isn't supported by the server."
                });
            }

            const sessionID = req.cookies.session;
            const isTargetLoginPage =url.startsWith("/login");
            

            const anonymousRoutes = ["/home", "/restaurants", "/restaurant", "/register"];
            let isTargetAnonymousRoute = false;
            
            for(const route of anonymousRoutes) {
                if(url.startsWith(route)) {
                    isTargetAnonymousRoute = true;
                    break;
                }
            }

            if(!sessionID&&!isTargetLoginPage&&!isTargetAnonymousRoute) {
                res.redirect(302,"/login");
                return;
            }

            if(sessionID) {
                let isSessionValid: boolean;
                const sessionRepo = new SessionRepository();
                try {
                    const session = await sessionRepo.getSessionByID(sessionID);
                    isSessionValid = session?.isValid() ?? false;
                } catch (error) {
                    isSessionValid = false;
                }
    
                if(isSessionValid===false&&!isTargetLoginPage&&!isTargetAnonymousRoute) {
                    res.clearCookie("session");
                    res.redirect(302,"/Login");
                    return;
                }
    
                if(isSessionValid && (isTargetLoginPage || url.startsWith("/register"))) {
                    res.redirect(302,"/Home");
                    return;
                }
            }


            res.header("content-type","text/html; charset=UTF-8");
            res.header("cache-control","public, max-age=86400, must-revalidate");
            const content = await fs.readFile("dist/public/index.html");
            if(!content) res.send("<h2>Error 500</h2><p>Website entry file couldn't be located. Has the website been built yet?</p>");
            else res.send(content); 
        });

        
    }


    public async start() {
        await this.initializeRoutes();

        await this._app.listen({port: env.LISTEN_PORT, host: env.LISTEN_HOST});

        const state = this._app.server.listening;
        if(state) {
            Output.init().fg("yellow").print(`Server started at ${env.LISTEN_HOST}:${env.LISTEN_PORT}`);
        }
    }
}

global.app = new App();
global.app.start();