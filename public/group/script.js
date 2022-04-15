window.addEventListener('load', () => {
  localStorage.removeItem("chats");
  const currGroup = JSON.parse(localStorage.getItem('curr_group'));
  if (currGroup) {
    document.querySelector('.logo').innerHTML = currGroup.name;
  } else {
    location.href = 'http://localhost:3000';
  }

  setInterval(() => {
    getChats();
  }, 1000);

  const toggleinviteBtn = document.querySelector('.invite');
  toggleinviteBtn.addEventListener('click', toggleinvite);

  const toggleRemoveBtn = document.querySelector('.remove');
  toggleRemoveBtn.addEventListener('click', toggleRemove);

  const toggleAdminBtn = document.querySelector('.add-admin');
  toggleAdminBtn.addEventListener('click', toggleAdmin);

  const inviteBtn = document.querySelector('#add-user');
  inviteBtn.addEventListener('click', inviteUser);

  const removeBtn = document.querySelector('#remove-user');
  removeBtn.addEventListener('click', removeUser);

  const addAdminBtn = document.querySelector('#make-admin');
  addAdminBtn.addEventListener('click', addAdmin);

  const sendBtn = document.querySelector("#send");
  sendBtn.addEventListener("click", sendChat);
});

function toggleinvite() {
  document.querySelector('.add').style.display = 'block';
}

function toggleRemove() {
  document.querySelector('#remove').style.display = 'block';
}

function toggleAdmin() {
  document.querySelector('#add-admin').style.display = 'block';
}

async function inviteUser() {
  const data = {
    email: document.querySelector('#add-email').value,
    groupid: JSON.parse(localStorage.getItem('curr_group')).id,
  };
  try {
    const res = await axios.post(
      'http://localhost:3000/api/groups/invite',
      data,
    );
    if (res.status == 200) {
      alert('User added to the group');
      document.querySelector('.add').style.display = 'none';
    }
  } catch (err) {
    alert('Something went wrong');
  }
}

async function removeUser() {
    const data = {
      email: document.querySelector('#remove-email').value,
      groupid: JSON.parse(localStorage.getItem('curr_group')).id,
    };
    try {
      const res = await axios.post(
        'http://localhost:3000/api/groups/remove',
        data,
      );
      if (res.status == 200) {
        alert('User removed from the group');
        document.querySelector('#remove').style.display = 'none';
      }
    } catch (err) {
      alert('Something went wrong');
    }
  }

  async function addAdmin() {
    const data = {
      email: document.querySelector('#admin-email').value,
      groupid: JSON.parse(localStorage.getItem('curr_group')).id,
    };
    try {
      console.log(data);
      const res = await axios.post(
        'http://localhost:3000/api/groups/make-admin',
        data,
      );
      if (res.status == 200) {
        alert('User was made admin');
        document.querySelector('#add-admin').style.display = 'none';
      }
    } catch (err) {
      alert('Something went wrong');
    }
  }

async function sendChat(){
  const currGroup = JSON.parse(localStorage.getItem('curr_group'));
  const data = {
    groupId: currGroup.id,
    message: document.querySelector("#message").value
  }
  try{
    const res = await axios.post("http://localhost:3000/api/groups/addchat", data);
    if(res.status == 200){
      document.querySelector("#message").value = "";
    }
  } catch(err){
    alert("Cannot send chat");
  }
}

async function getChats() {
  const lastChats = JSON.parse(localStorage.getItem('chats'));
  const currGroup = JSON.parse(localStorage.getItem('curr_group'));
  let lastChatId = 0;
  if (lastChats) {
    lastChatId = lastChats[lastChats.length - 1].id;
  }
  try {
    const res = await axios.get(
      `http://localhost:3000/api/chat/get?lastchatid=${lastChatId}&groupid=${currGroup.id}`,
    );
    if (res.status === 200) {
      const chats = res.data.chats;
      if (chats.length > 0) {
          if(lastChats){
            lastChats.push(...chats);
            localStorage.setItem('chats', JSON.stringify(lastChats));
          }
        localStorage.setItem('chats', JSON.stringify(chats));
        renderChats(chats);
      }
    } else {
      alert('Something went wrong');
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        alert('Something went wrong');
      } else if (err.response.status === 500) {
        alert('Cannot get chats');
      }
    } else {
      console.log(err);
    }
  }
}

function renderChats(chats = JSON.parse(localStorage.getItem('chats'))) {
  console.log(chats);
  const chatBox = document.querySelector('.chat-box');
  chats.forEach((chat) => {
    let d = new Date(chat.createdAt);
    let time =
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2) +
      ':' +
      ('0' + d.getSeconds()).slice(-2);
    let tmp = '';
    if (parseInt(chat.id % 2) !== 0) {
      tmp = `
            <div class="message primary">
                ${chat.message}
                <div class="timestamp">${time}</div>
            </div>
            `;
    } else {
      tmp = `
            <div class="message secondary">
                ${chat.message}
                <div class="timestamp">${time}</div>
            </div>
            `;
    }

    chatBox.innerHTML = chatBox.innerHTML + tmp;
  });
}
