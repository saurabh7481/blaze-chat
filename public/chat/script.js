window.addEventListener('load', () => {
  localStorage.removeItem('chats');
  setInterval(() => {
    getChats();
  }, 1000);
  // getChats();

  const sendBtn = document.querySelector('#send');
  sendBtn.addEventListener('click', sendMessage);

  const createGroupToggle = document.querySelector('.create');
  createGroupToggle.addEventListener('click', toggleCreateGroup);

  const createGroupBtn = document.querySelector('#create-btn');
  createGroupBtn.addEventListener('click', createGroup);

  const getGroupsBtn = document.querySelector('.groups');
  getGroupsBtn.addEventListener('click', getGroupsToggle);

  const uploadPrompt = document.querySelector('.upload-prompt');
  uploadPrompt.addEventListener('click', toggleuploadPrompt);

  const uploadBtn = document.querySelector('#upload-btn');
  uploadBtn.addEventListener('click', uploadFile);

  //   const logOutBtn = document.querySelector('.logout');
  //   logOutBtn.addEventListener('click', signOut);
});

async function createGroup() {
  const data = {
    name: document.querySelector('#group-name').value,
  };
  try {
    const res = await axios.post(
      'http://localhost:3000/api/groups/create',
      data,
    );
    if (res.status === 200) {
      alert(res.data.message);
    }
  } catch (err) {
    alert('Something went wrong');
  }
}

function toggleuploadPrompt() {
  if (document.querySelector('#file').style.display == 'none') {
    document.querySelector('#file').style.display = 'block';
  } else {
    document.querySelector('#file').style.display = 'none';
  }
}

async function getGroupsToggle() {
  if (document.querySelector('#group').style.display == 'none') {
    try {
      const res = await axios.get('http://localhost:3000/api/groups/get');
      if (res.status === 200) {
        renderGroups(res.data.groups);
        document.querySelector('#group').style.display = 'block';
      }
    } catch (err) {
      alert('Something went wrong');
    }
  } else {
    document.querySelector('#group').style.display = 'none';
  }
}

const scrollSmoothToBottom = () => {
  const element = document.querySelector(".chat-box");
  element.animate(
    {
      scrollTop: element.prop('scrollHeight'),
    },
    500,
  );
};

function goToGroup(e) {
  localStorage.setItem(
    'curr_group',
    JSON.stringify({
      id: e.target.id,
      name: e.target.innerHTML,
    }),
  );
  location.href = 'http://localhost:3000/group';
}

function renderGroups(groups) {
  const container = document.querySelector('#group');
  container.innerHTML = '';
  groups.forEach((group) => {
    const tmp = `
            <h4 id=${group.id} class="gotogroup">${group.name}</h4>
        `;

    container.innerHTML = container.innerHTML + tmp;
  });
  const goToGroupBtn = document.querySelectorAll('.gotogroup');
  for (let i = 0; i < goToGroupBtn.length; i++) {
    goToGroupBtn[i].addEventListener('click', (e) => goToGroup(e));
  }
}

function toggleCreateGroup() {
  if (document.querySelector('#create').style.display == 'none') {
    document.querySelector('#create').style.display = 'block';
  } else {
    document.querySelector('#create').style.display = 'none';
  }
}

async function sendMessage() {
  const data = {
    message: document.querySelector('#message').value,
  };
  try {
    const res = await axios.post('http://localhost:3000/api/chat/send', data);
    if (res.status === 200) {
      document.querySelector('#message').value = '';
    }
  } catch (err) {
    if (err.response.status === 401) {
      alert('Something went wrong');
    } else if (err.response.status === 500) {
      alert('Cannot send the message');
    }
  }
}

async function getChats() {
  const lastChats = JSON.parse(localStorage.getItem('chats'));
  let lastChatId = 0;
  if (lastChats) {
    lastChatId = lastChats[lastChats.length - 1].id;
  }
  try {
    const res = await axios.get(
      `http://localhost:3000/api/chat/get?lastchatid=${lastChatId}`,
    );
    if (res.status === 200) {
      const chats = res.data.chats;
      console.log(chats);
      if (chats.length > 0) {
        if (lastChats) {
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
    scrollSmoothToBottom();
  });
}

async function uploadFile() {
  const file = document.querySelector('#file-upload').files[0];
  let formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  try {
    const res = await axios.post(
      'http://localhost:3000/api/chat/upload',
      formData,
    );
    if (res.status == 200) {
      alert('File sent');
    }
  } catch (err) {
    alert('Something went wrong');
  }
}

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }
