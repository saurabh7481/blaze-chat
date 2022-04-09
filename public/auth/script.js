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
            localStorage.setItem("auth", res.data);
        } else if(res.status === 401){
            alert("Invalid credentials");
        } else if(res.status === 404){
            alert("User not found");
        } else {
            console.log(res);
        }
    } catch(err){
        console.log(err);
    }
}

async function register(){
    const form = document.getElementById("s-form");
     const formData = new FormData(form);
     const data = {
         username: formData.get("username"),
         email: formData.get("email"),
         phnumber: formData.get("phone"),
         password: formData.get("password")
     }

     try {
         const res = await axios.post("http://13.233.197.99:3000/api/signup", data);
         if(res.status === 200){
             alert("You are registered. Head on to login page.");
         } else if(res.status === 400) {
             alert("User already exists, please sign in");
         } else {
             console.log(res);
         }
     } catch(err) {
         alert("Something went wrong!");
     }
}

function toggleForm() {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
}