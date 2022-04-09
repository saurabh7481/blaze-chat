window.addEventListener("load", () => {
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