window.addEventListener("load", () => {
    const chats = JSON.parse(localStorage.getItem("chats"));
    if(chats){
        renderChats();
    }
    setInterval(() => {
        getChats()
    }, 1000);
    // getChats();

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
    const lastChats = JSON.parse(localStorage.getItem("chats"));
    let lastChatId = 0;
    if(lastChats){
        lastChatId = lastChats[lastChats.length - 1].id;
    }
    try{
        console.log(lastChatId);
        const res = await axios.get(`http://localhost:3000/api/chat/get?lastchatid=${lastChatId}`);
        if(res.status === 200){
            const chats = res.data.chats;
            if(!lastChats){
                // if(chats.length > 10000){
                //     const newChats = chats.splice(0, chats.length - 5000);
                //     localStorage.setItem("chats", JSON.stringify(newChats));
                // }
                localStorage.setItem("chats", JSON.stringify(chats));
                renderChats();
            } else {
                lastChats.push(...chats);
                // if(lastChats.length > 10000){
                //     lastChats.splice(0, 500);
                //     renderChats();
                // }
                localStorage.setItem("chats", JSON.stringify(lastChats));
                if(lastChatId < lastChats.length){
                    renderChats(lastChats.splice(lastChatId, lastChats.length));
                }
            }
            
        } else {
            alert("Something went wrong")
        }
    } catch(err){
        if(err.response){
            if(err.response.status === 401){
                alert("Something went wrong");
            } else if(err.response.status === 500){
                alert("Cannot get chats");
            }
        } else {
            console.log(err);
        }
        
    }
}

function renderChats(chats = JSON.parse(localStorage.getItem("chats"))) {
    console.log(chats);
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

        chatBox.innerHTML = chatBox.innerHTML + tmp;
        
    })
}