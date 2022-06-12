//nav bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
//search
document.getElementsByClassName("btn-search")[0].addEventListener("click", function (event) {
  document.getElementById("search-bar").focus();
})
//login
document.getElementById("submit").addEventListener("click", function(event) {
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
    console.log(response);
    debugger
    localStorage.setItem("token", response.data.access_token);
    alert("Successfully logged in");
    window.location.href = "index.html";
  })
  .catch(function (error) {
    console.log(error);
    alert("Username or password is incorrect");
  });
})