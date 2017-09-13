(function () {
    var user = sessionStorage.getItem("loginName");
    // console.log(user);
    if (!document.referrer && !user) {
        location.href = '../404.html'
    }
})();

