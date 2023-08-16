const { Server } = require('socket.io')
//Managers
const ProductsManager = require('../dao/mongo/products.mongo.js')
const productsManager = new ProductsManager()
const MessageManager = require('../dao/mongo/message.mongo.js')
const messageManager = new MessageManager()

const chatWebSocket = (server) => {
    const io = new Server(server)
    io.on( 'connection', async (socket)=>{
        //====== Productos ==============
        //enviar al cliente los productos
        console.log("Cliente Conectado")
        socket.emit('sendProducts', await productsManager.getProducts())
        //Agregar producto nuevo a base de datos
        socket.on('newProductToBase', async (data) =>{
            await serviceMongo.createNewDocument(Product, data)
            io.sockets.emit('sendProducts',  await productsManager.getProducts())
        })
        //====== Mensajes ===============
        socket.emit("chats", await messageManager.getMessage())
        socket.on('msg',async (data)=>{
            await serviceMongo.createNewDocument(Message, data)
            io.sockets.emit("chats", await messageManager.getMessage())
        })
    } )

}

const getChatPage = (req,res) => {
    res.render("chat")
}

module.exports = {
    getChatPage,
    chatWebSocket
}