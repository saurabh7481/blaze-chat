window.addEventListener("load", () => {
    const toggle = document.querySelector(".toggle");
    toggle.forEach(btn => {
        btn.addEventListener("click", toggleForm);
    })
})

function toggleForm() {
    console.log("clicked");
    const container = document.querySelector('.container');
    container.classList.toggle('active');
}