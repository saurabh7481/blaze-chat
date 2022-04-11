window.addEventListener('load', () => {
  const currGroup = JSON.parse(localStorage.getItem('curr_group'));
  if (currGroup) {
    document.querySelector('.logo').innerHTML = currGroup.name;
  } else {
    location.href = 'http://localhost:3000';
  }

  const toggleinviteBtn = document.querySelector('.invite');
  toggleinviteBtn.addEventListener('click', toggleinvite);

  const inviteBtn = document.querySelector('#add-user');
  inviteBtn.addEventListener('click', inviteUser);
});

function toggleinvite() {
  document.querySelector('.add').style.display = 'block';
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
