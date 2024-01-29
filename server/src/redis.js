import  { Redis }  from "ioredis"

let instance;

export function getRedisInstance(){
    if (!instance){ 
        instance = new Redis({
        host: "redis-14026.c308.sa-east-1-1.ec2.cloud.redislabs.com:",
        port: 14026,
        username: "default",
        password: "ZQ7cqAsQrHtizra8w4dPGd1l9L1CtAKU",
    })
    instance.on("connect", () => console.log ("redis connected"))
    instance.on("error", (error) => console.log ("redis error", error))
    }

    

    return instance;

}