window.addEventListener("load", () => {
    const toggle = document.querySelectorAll(".toggle");
    for(let i=0; i<toggle.length; i++){
        const btn = toggle[i];
        btn.addEventListener("click", toggleForm);
    }

    const loginBtn = document.querySelector(".login");
    loginBtn.addEventListener("click", login);

    const signupBtn = document.querySelector(".register");
    signupBtn.addEventListener("click", register);
})

async function login(){
    const form = document.getElementById("l-form");
    const formData = new FormData(form);
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    try{
        const res = await axios.post("http://localhost:3000/api/auth/login", data);
        if(res.status === 200){
            alert("Logged in!");
        }
    } catch(err){
        if(err.response.status === 401){
            alert("Invalid credentials");
        } else if(err.response.status === 404) {
            alert("User not found");
        } else {
            alert("Server error");
        }
    }
}

async function register(){
    const form = document.getElementById("s-form");
     const formData = new FormData(form);
     const data = {
         name: formData.get("username"),
         email: formData.get("email"),
         phnumber: formData.get("phnumber"),
         password: formData.get("password")
     }
     try {
         const res = await axios.post("http://localhost:3000/api/auth/signup", data);
         console.log(res);
         if(res.status === 200){
             alert("You are registered");
         }
     } catch(err) {
         if(err.response.status === 400){
            alert("User already exists, please sign in");
         } else {
             alert("Server Error");
         }
     }
}

function toggleForm() {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
}