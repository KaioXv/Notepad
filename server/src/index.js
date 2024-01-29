import express from "express"
import cors from "cors"
import { getRedisInstance } from "./redis.js";
import pusher from "./pusher.js"

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.post("/api/update-notepad",  async (req, res) => {
    const {noteName, noteContent, userId} = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent,
        userId,
    }

    const expiry = 60000 * 60 * 24; //24hours

    pusher.trigger(noteName, "updated-note", noteObj);

    redisInstance.set(noteName, JSON.stringify(noteObj), "PX", expiry)
    res.status(200).send(noteObj);
    
})

app.get("/api/get-notepad:noteName", async (req, res) => {
    const { noteName } =  req.params;

    const redisInstance = getRedisInstance();

    const note = JSON.parse(await redisInstance.get(noteName));

    if(note){
        return res.status(200).send(note)
    }

    return res.sendstatus(404);

})
app.post("/pusher/authorize", async (req, res) => {
    const socketId = req.body.socket_id;
    const user_id = req.body.user_id;
    const username = req.body.username;
    const channelName = req.body.channel_name;
    const data = {
        user_id: user_id,
        user_info:{
            id: user_id,
            username,
        }
    }
    const authorizedUser = pusher.authorizeChannel(socketId, channelName, data)
    res.status(200).send(authorizedUser);

    


})
app.post("/pusher/authenticate", async(req, res) => {
    const socketId = req.body.socket_id;
    const user_id = req.body.user_id;
    const username = req.body.username;

    const user = {
        id: user_id,
        name: username,
    }

    const pusherUser = pusher.authenticateUser(socketId, user)
    return res.status(200).send(pusherUser)
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})