const fs = require ("fs");
const carts = "./cart.json";

class CartController {
    constructor(){
        this.path = carts;
        try{
            this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }catch(error){
            this.cart=[];
        }
        this.id = this.cart.reduce((prev, curr) =>{
            curr.id >= prev.id
            return curr.id+1;
        },1)
    }




    valadateId() {
        return this.id++;
    }
    async addCart(req,res){ // Post
        try{
            const newCart = {
                id: this.valadateId(),
                products : []
                
            }
            this.cart.push(newCart);           
            await fs.promises.writeFile(this.path,JSON.stringify(this.cart, null,2));
            console.log("carrito agregado")
            return res.status(200).send(this.cart);
        }catch(error){
            return res.status(500).send("Problema en el servidor")
        }
    }

    async productCart(req,res){
        try{
            const { cid } = req.params;
            const cart = this.cart.find (item => item.id === Number(cid));
            if(!cart){
                return res.status(404).send("Carrito no encontrado");
            }
            return res.status(200).send(cart);
        }catch(error){
            return res.status(500).send("Problema en el servidor");
        }
    }


    async updateCart(req,res){

        try{
            const {cid,pid}= req.params;

            const cart = this.cart.find(item=> item.id === Number(cid));
            if(!cart){
                return res.status(404).send("Carrito no encontrado");
            }

            //Verificamos si el producto existe en el carrito
            const exist = cart.products.find(product => product.id === Number(pid));
            if(exist){
                exist.quantity++;
            }else{
                //Si no existe se agrega al carrito
                cart.products.push({
                    id: Number(pid),
                    quantity:1
                }
                )
                console.log("Producto agregado");
            }

            //Guardamos en Cart.Json
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart,null,2))
            return res.status(200).send(cart);
        }catch(error){
            return res.status(500).send("Problema en el servidor");
        }
    }
}

module.exports = CartController;