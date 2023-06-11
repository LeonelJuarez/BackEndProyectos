const { Router } = require("express");
const CartController = require ("./cartsController/cartsControlles");
const bodyParse = require("body-parser");

const carrito = new CartController ("/cart.json");

module.exports = app => {
    let router = new Router();
    app.use(bodyParse.json());
    app.use(bodyParse.urlencoded({extended:true}))

    app.use("/api/carts", router);
    router.post("/", carrito.addCart.bind(carrito));
    router.get("/:cid", carrito.productCart.bind(carrito));
    router.post("/:cid/product/:pid", carrito.updateCart.bind(carrito));


    }
