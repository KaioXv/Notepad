const RoomNameInput = document.getElementById ("RoomName")
const JoinRoomButton = document.getElementById ("JoinRoomButtom")
const usernameinput = document.getElementById("username")

JoinRoomButton.addEventListener("click", () => {
    if (!RoomNameInput.value || !usernameinput.value){
        return;
    }

    localStorage.setItem("username", usernameinput.value);

    const randomNumber = Math.floor(Math.random() * 1000)
    localStorage.setItem("user_id", `${usernameinput.value}-${randomNumber}`)


    window.location.href = `/web/room.html?name=${RoomNameInput.value}`;
})