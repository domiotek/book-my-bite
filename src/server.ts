import Fastify, { FastifyInstance } from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyCookie from "@fastify/cookie";
import FastifyFormBody from "@fastify/formbody";
import FastifyMultipart from "@fastify/multipart";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises"
import Output from "./modules/Output.js";

import env from "./env.js";

import {Sequelize} from "sequelize";


export default class App {
	private _app: FastifyInstance;
    private _orm: Sequelize;
    private readonly _envMode: "production" | "development";

    public get orm() {
        return this._orm;
    }

    private async loadModels() {

        const files = await fs.readdir("dist/modules/models");

        for (const file of files) {
            if(file.endsWith("js"))
                await import(`./modules/models/${file}`);
        }
    }

    constructor() {
        this._envMode = process.env.NODE_ENV as any;

        this._app = Fastify();
        this._app.register(FastifyStatic,{root: path.join(dirname(fileURLToPath(import.meta.url)), 'public/assets')});

        this._app.register(FastifyCookie);
        this._app.register(FastifyFormBody);
        this._app.register(FastifyMultipart);
        
        this._orm = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {host: env.DB_HOST, dialect: "postgres"});
       

        // If request doesn't match with any api calls, then redirect to web portal, so react router can handle it.
        this._app?.setNotFoundHandler(async (req,res)=>{
            res.header("content-type","text/html; charset=UTF-8");
            res.header("cache-control","public, max-age=86400, must-revalidate");
            const content = await fs.readFile("dist/public/index.html");
            if(!content) res.send("<h2>Error 500</h2><p>Website entry file couldn't be located. Has the website been built yet?</p>");
            else res.send(content); 
        });

        
    }


    public async start() {
        await this._app.listen({port: env.LISTEN_PORT, host: env.LISTEN_HOST});

        const state = this._app.server.listening;
        if(state) {
            Output.init().fg("yellow").print(`Server started at ${env.LISTEN_HOST}:${env.LISTEN_PORT}`);
        }

        try {
            await this._orm.authenticate({logging: false});
        } catch (error: any) {
            Output.init().bg("red").fg("white").print('Unable to connect to the database:'+error.message);
        }

        await this.loadModels();

        (await import("./modules/Associations.js")).default(); 

        await this.orm.sync({force: this._envMode=="development"});
    }
}

global.app = new App();
global.app.start();
