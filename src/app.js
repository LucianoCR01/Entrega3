const express = require ("express")
const app = express ()

const ProducManager = require("../ProductManager")
const manager = new ProducManager("products.json")

app.use(express.urlencoded({extended:true}))

app.get("/products", async (req, res)  =>{
    let max = req.query;
    let arr = await manager.getProducts();
    let num = Object.values(max)
    let arrFor = []

    if (Object.keys(max) == "limit" && arr.length >= Math.floor(num) ){
        for (let i=0; i < Math.floor(num); i++){
        arrFor.push(arr[i])  
        }
        res.send(arrFor)
    }else{        
        res.send(arr)
    }    
})

app.get("/products/:pid", async (req, res) =>{
    let pid = req.params.pid;
    let busqueda = await manager.getProdctById(pid);
    if (busqueda) {
        res.send(busqueda)
    }else{
        res.send(`No se encontro el objeto con el id ${pid}`) 
    }
})

const PORT = 8080
const server = app.listen(PORT, ()=> console.log("Server running on 8080"))
server.on("error", error => console.log(error))