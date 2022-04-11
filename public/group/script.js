window.addEventListener('load', () => {
  const currGroup = JSON.parse(localStorage.getItem('curr_group'));
  if (currGroup) {
    document.querySelector('.logo').innerHTML = currGroup.name;
  } else {
    location.href = 'http://localhost:3000';
  }

  const toggleinviteBtn = document.querySelector('.invite');
  toggleinviteBtn.addEventListener('click', toggleinvite);

  const toggleRemoveBtn = document.querySelector('.remove');
  toggleRemoveBtn.addEventListener('click', toggleRemove);

  const inviteBtn = document.querySelector('#add-user');
  inviteBtn.addEventListener('click', inviteUser);

  const removeBtn = document.querySelector('#remove-user');
  removeBtn.addEventListener('click', removeUser);
});

function toggleinvite() {
  document.querySelector('.add').style.display = 'block';
}

function toggleRemove() {
  document.querySelector('#remove').style.display = 'block';
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
