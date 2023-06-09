const fs = require("fs");
const archivo = "./products.json";


class ProductManager {
    constructor() {
        this.path = archivo;
        try{
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));  //archivo;
        }catch(error){
            this.products=[];
        }
        this.id = this.products.reduce((prev, curr) =>{
            curr.id >= prev.id
            return curr.id+1;
        },1)
    }


    async getProducts(req,res) {
        
        try{
            let { limit } = req.query;
            if(limit){
                let productLimit = this.products.slice(0, limit);
                res.status(200).send(productLimit);
            }
            res.send(this.products)
        } catch (error){
            res.status(500).send("Problema en el Servidor");
        }


    }

    async getProductByld(req,res, id) {

        try{
            const idPar = req.params.pid;
            const productx = this.products.find(product => product.id === parseInt(idPar))
        if (!productx) {
            return res.status(404).send("Producto no encontrado");
        } else {
            return res.status(200).send(productx);
        }
    }catch (error){
        res.status(500).send("Problema en el Servidor");
        
        }
    }  

    async addProduct(req, res, obj) {   
        try{
            let {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            } = req.body;

            const existe = this.products.find(product => product.code === code)
    
            if (existe) {
                return res.status(404).send("Ya eciste un producto igual")
                
            } 
            if (!title||!description||!price||!thumbnail||!code||!stock){
                console.log(`Todos los campos son obligatorios, verificar el producto ${title}`)
            }
             const newProduct = {
                id: this.valadateId(this.products),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };   
            this.products.push(newProduct)
            res.send(this.products);
            console.log("agregado", newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products)); 
        } catch(error){
            res.status(500).send("Problema en el Servidor");
            }
        }
    

    valadateId() {
        return this.id++;
    }
 


    async updateProduct(id, updatedFields) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(contenido);
            const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.log("No se encontró el producto");
            return;
        }
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log("Producto actualizado correctamente");
        } 
        catch (error) {
            res.status(500).send("Problema en el Servidor");
        }
    }

    async deleteProduct(res,req,id) {
        try {

            
        const idPar = req.params.pid;
        const productx = this.products.findIndex(product => product.id === parseInt(idPar))
        
        if (productx === -1) {
            return res.status(404).send("No se encontró el producto");
        }
        
        this.products.splice(productx,1);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return res.status(200).send(`Producto eliminado`);

        } catch (error) {
        res.status(500).send("Problema en el Servidor");
        }
    }

}
module.exports = ProductManager;