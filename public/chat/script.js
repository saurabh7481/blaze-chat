window.addEventListener("load", () => {
    setInterval(() => {
        getChats()
    }, 1000);

    const sendBtn = document.querySelector("#send");
    sendBtn.addEventListener("click", sendMessage);
})

async function sendMessage(){
    const data = {
        message: document.querySelector("#message").value
    }
    try{
        const res = await axios.post("http://localhost:3000/api/chat/send", data);
        if(res.status === 200){
            document.querySelector("#message").value = "";
        }
    } catch(err){
        if(err.response.status === 401){
            alert("Something went wrong");
        } else if(err.response.status === 500){
            alert("Cannot send the message");
        }
    }
}

async function getChats(){
    try{
        const res = await axios.get("http://localhost:3000/api/chat/get");
        if(res.status === 200){
            renderChats(res.data.chats);
        } else {
            alert("Something went wrong")
        }
    } catch(err){
        if(err.response.status === 401){
            alert("Something went wrong");
        } else if(err.response.status === 500){
            alert("Cannot get chats");
        }
    }
}

function renderChats(chats) {
    const chatBox = document.querySelector(".chat-box");
    chats.forEach(chat => {
        let d = new Date(chat.createdAt);
        let time = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
        let tmp = "";
        if(parseInt((chat.id)%2) !== 0){
            tmp = `
            <div class="message primary">
                ${chat.message}
                <div class="timestamp">${time}</div>
            </div>
            `
        } else {
            tmp = `
            <div class="message secondary">
                ${chat.message}
                <div class="timestamp">${time}</div>
            </div>
            `
        }

        chatBox.innerHTML += tmp;
        
    })
}