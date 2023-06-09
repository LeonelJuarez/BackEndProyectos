const {Router} =  require ("express")
const ProductManager = require("./productsController/productsController")
const bodyParse = require("body-parser")

const product = new ProductManager ("/products.json")

module.exports = app =>{
    let router = new Router();
    app.use(bodyParse.json());
    app.use(bodyParse.urlencoded({extended:true}));



    app.use("/api/products", router);
    router.get("/", product.getProducts.bind(product));
    router.get("/:pid", product.getProductByld.bind(product));
    router.post("/", product.addProduct.bind(product));
    router.put("/:pid", product.updateProduct.bind(product));
    router.delete("/:pid" , product.deleteProduct.bind(product));

}