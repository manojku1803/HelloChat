import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host: 'redis-3bd72b2e-manojpradhan1803-9884.a.aivencloud.com',
    port: 11458,
    username: 'default',
    password: 'AVNS_Vbki-2UM_hUKMxiFXV6',
});
const sub = new Redis({
    host: 'redis-3bd72b2e-manojpradhan1803-9884.a.aivencloud.com',
    port: 11458,
    username: 'default',
    password: 'AVNS_Vbki-2UM_hUKMxiFXV6',
});


class SocketService{
    private _io: Server;
    constructor(){
        console.log("Init Socket Service...")
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin: "*",
            }
        });
        sub.subscribe('MESSAGES',)

    }

    public initListener(){
        const io = this.io;
        console.log("Initialized Socket Listener...");
        
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id)

            socket.on('event:message', async({message}:{message:string})=>{
                console.log('New Message received',message)
                //publish this message to the redis
                await pub.publish('MESSAGES', JSON.stringify({message}))
            })
        })

        sub.on('message', (channel, message)=>{
            if(channel ==='MESSAGES') {
                io.emit('message',message)
            }
        })

    }

    get io(){
        return this._io;
    }
}

export default SocketService