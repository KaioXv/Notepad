import Pusher from "pusher"

const pusher = new Pusher({
    appId: "1746816",
    key: "ce283922aa1fbb94bae4",
    secret: "f65dd36242237cf8cc07",
    cluster: "us2",
    useTLS: true,
  });

  export default pusher;