
window.addEventListener("load", () => {
    const chats = JSON.parse(localStorage.getItem("chats"));
    if(chats){
        renderChats();
    }
    // setInterval(() => {
    //     getChats()
    // }, 1000);
    // getChats();

    const sendBtn = document.querySelector("#send");
    sendBtn.addEventListener("click", sendMessage);

    const createGroupToggle = document.querySelector(".create");
    createGroupToggle.addEventListener("click", toggleCreateGroup);

    const createGroupBtn = document.querySelector("#create-btn");
    createGroupBtn.addEventListener("click", createGroup);

    const getGroupsBtn = document.querySelector(".groups");
    getGroupsBtn.addEventListener("click", getGroupsToggle);

    
})

async function createGroup(){
    const data = {
        name: document.querySelector("#group-name").value
    }
    try{
        const res = await axios.post("http://localhost:3000/api/groups/create", data);
        if(res.status === 200){
            alert(res.data.message);
        }
    } catch(err){
        alert("Something went wrong");
    }
}

async function getGroupsToggle(){
    if(document.querySelector("#group").style.display == "none"){
        
        try{
            const res = await axios.get("http://localhost:3000/api/groups/get");
            if(res.status === 200){
                renderGroups(res.data.groups);
                document.querySelector("#group").style.display = "block"
            }
        } catch(err){
            alert("Something went wrong");
        }
    } else {
        document.querySelector("#group").style.display = "none"
    }
}

function goToGroup(e){
    localStorage.setItem("curr_group", JSON.stringify({
        id: e.target.id,
        name: e.target.innerHTML
    }))
    location.href = "http://localhost:3000/group";
}

function renderGroups(groups){
    const container = document.querySelector("#group");
    container.innerHTML = "";
    groups.forEach(group => {
        const tmp = `
            <h4 id=${group.id} class="gotogroup">${group.name}</h4>
        `

        container.innerHTML = container.innerHTML + tmp;
    });
    const goToGroupBtn = document.querySelectorAll(".gotogroup");
    for(let i=0; i<goToGroupBtn.length; i++){
        goToGroupBtn[i].addEventListener("click",e => goToGroup(e));
    }
}

function toggleCreateGroup(){
    if(document.querySelector("#create").style.display == "none"){
        document.querySelector("#create").style.display = "block";
    } else {
        document.querySelector("#create").style.display = "none";
    }
}

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