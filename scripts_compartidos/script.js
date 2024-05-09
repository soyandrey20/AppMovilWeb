

history.pushState(null, "", location.href);
window.addEventListener("popstate", function (e) {
    history.pushState(null, "", location.href);
});

const home = document.getElementById('home');
home.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});