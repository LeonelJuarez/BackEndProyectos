const productsApi = require("../componets/products");
const cartsApi = require("../componets/carts");

module.exports = app =>{
    productsApi(app);
    //cartsApi(app);
    app.get("/",(req,res)=>res.send("OK!"));
}