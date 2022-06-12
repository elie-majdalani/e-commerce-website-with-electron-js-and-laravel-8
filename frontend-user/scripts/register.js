//nav-bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
//search-bar
document.getElementsByClassName("btn-search")[0].addEventListener("click", function(event) {
  document.getElementById("search-bar").focus();
})

//signup
document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("cpassword").value;

  if(password != confirmPassword) {
    alert("Passwords do not match");
  }
  else {
    var user = {
      username: username,
      email: email,
      password: password
    }
    var url = 'http://127.0.0.1:8000/api/auth/register/';
    axios({
      method: 'post',
      url: url,
      data: user
    })
    .then(function (response) {
      console.log(response);
      alert("Successfully registered");
      window.location.href = "login.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("Username already exists");
    });
}})
