const express = require ("express");
const PORT = 8080;
const routes = require("./routes");
const bodyParse = require("body-parser")

class Server {
    constructor(){
        this.app = express();
        this.setting();
        this.routes();
    }

    setting(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(bodyParse.json());
        this.app.use(bodyParse.urlencoded({extended:true}));
        //rutas publicas
    }

    routes(){
        routes(this.app);
    }

    listen(){
        this.app.listen(PORT, () =>{console.log(`http://localhost:${PORT}`)});
    }
}

module.exports = new Server();

