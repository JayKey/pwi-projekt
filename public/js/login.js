document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;

    if(!login && !password) {
        alert('Wpisz dane do logowania');
    }

    postAjax('http://127.0.0.1:8000/api/login', { login: login, password: password }, function(data) {
        console.log(data);
        if(data == 'success') {
            window.location.href = "/";
        } else {
            alert('login filed');
        }
    });
};