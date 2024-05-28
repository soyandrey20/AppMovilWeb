

history.pushState(null, "", location.href);
window.addEventListener("popstate", function (e) {
    history.pushState(null, "", location.href);
});

 