import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//Connection Event
wss.on("connection", (socket, request) => {
    const ip = request.socket.remoteAddress;
    
    socket.on("message",(rawData)=>{
        console.log({rawData});
        wss.clients.forEach((client)=>{
            
            //States of WebSocket Connection:
            //0. CONNECTING
            //1. OPEN
            //2. CLOSING
            //3. CLOSED
            if(client.readyState === 1){
                client.send(rawData.toLocaleString());
            }
        });
    });

    socket.on("error",(err)=>{
        console.error("Error", err.message);
    });

    socket.on("close",()=>{
        console.log("User disconnected");
    });
});

console.log("Wesocket Server is live on ws://localhost:8080");