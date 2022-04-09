window.addEventListener("load", () => {
    getChats();

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
            console.log(res.data);
        }
    } catch(err){
        if(err.response.status === 401){
            alert("Something went wrong");
        } else if(err.response.status === 500){
            alert("Cannot get chats");
        }
    }
}