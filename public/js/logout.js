document.getElementById('logout').onclick = function(e) {
    e.preventDefault();
    getAjax("/api/logout", function(data){
        if(data == "ok") {
            window.location.href = "/";
        } else {
            alert("logout filed");
        }
    });
};