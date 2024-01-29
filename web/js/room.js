const RoomNameLabel = document.getElementById("RoomNameLabel")
const RoomContentTextarea = document.getElementById("notepadcontent")

const params = new URLSearchParams(window.location.search);
const RoomName = params.get("name")
RoomNameLabel.innerText = RoomName;



const pusher = new Pusher('ce283922aa1fbb94bae4', {
    cluster: 'us2',
    channelAuthorization:{
      endpoint: "http://localhost:3001/pusher/authorize",
      paramsProvider: () => {
        return{
          user_id: localStorage.getItem("user_id"),
          username: localStorage.getItem("username"),
        }
      }


    },
    userAuthentication: {
      endpoint: "http://localhost:3001/pusher/authenticate",
      paramsProvider: () => {
        return{
          user_id: localStorage.getItem("user_Id"),
          username: localStorage.getItem("username"),
        }
      }
    }
  });

RoomContentTextarea.addEventListener("keyup", async (event) => {
    console.log("change")
    const { value } = event.target;

    await fetch(`http://localhost:3001/api/update-notepad`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({noteName: RoomName, noteContent: value, userId: pusher.sessionID})
    })
})


window.addEventListener("load", async () => {

})
   
const userQuantityLabel = document.getElementById("userQty")

if (RoomName){ 
  pusher.signin()
  console.log("aqui")

  pusher.bind("pusher:signin_success", data => {
    

  })


  const channel = pusher.subscribe(RoomName);
  channel.bind('updated-note', function(data) {
    console.log({ data })
    if(data.content && data.userId !== pusher.sessionID)
    RoomContentTextarea.value =  data.content
  })
  
  channel.bind("pusher:subscription_succeeded", () => {
    userQuantityLabel.innerText = channel.members.count;


  channel.bind ("pusher:member_add", () => {
    userQuantityLabel.innerText = Number(userQuantityLabel.innerText) + 1;
  })

  channel.bind("pusher:member_removed", () => {
    userQuantityLabel.innerText = Number(userQuantityLabel.innerText) - 1;

  })

  

    
  })
}
