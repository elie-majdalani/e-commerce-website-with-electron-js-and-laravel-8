document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = {
        email: email,
        password: password
    }
    var url = 'http://127.0.0.1:8000/api/auth/login/';
    axios({
        method: 'post',
        url: url,
        data: user
    })
        .then(function (response) {
            alert("Successfully logged in");
            localStorage.setItem("token", response.data.access_token);
            window.location.href = "admin.html";
        })
        .catch(function (error) {
            console.log(error);
            alert("Username or password is incorrect");
        });
})