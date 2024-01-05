import Fastify, { FastifyInstance } from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyCookie from "@fastify/cookie";
import FastifyFormBody from "@fastify/formbody";
import FastifyMultipart from "@fastify/multipart";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises"
import Output from "./modules/output.js";


class App {
	private _app: FastifyInstance;


    constructor() {
        this._app = Fastify();
        this._app.register(FastifyStatic,{root: path.join(dirname(fileURLToPath(import.meta.url)), 'public/assets')});

        this._app.register(FastifyCookie);
        this._app.register(FastifyFormBody);
        this._app.register(FastifyMultipart);

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
        await this._app.listen({port: 3000, host: "127.0.0.1"});

        const state = this._app.server.listening;
        if(state) {
            Output.init().fg("yellow").print("Server started at 127.0.0.1:3000");
        }
    }
}

const app = new App();
app.start();
