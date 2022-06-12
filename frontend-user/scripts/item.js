function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

document.getElementsByClassName("btn-search")[0].addEventListener("click", function (event) {
  document.getElementById("search-bar").focus();
})
//check if logged in
token = localStorage.getItem("token");
axios({
  method: 'get',
  url: 'http://127.0.0.1:8000/api/auth/me',
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(function (response) {
    let navbar = document.getElementById("mySidenav")
    navbar.innerHTML += `<a href="index.html">Home</a><a href='favorites.html'>Favorites</a><a href='#' id="logout">Logout</a>`
    document.getElementById("logout").addEventListener("click", function (event) {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    })
  })
  .catch(function (error) {
    let navbar = document.getElementById("mySidenav")
    navbar.innerHTML += "<a href='index.html'>Home</a><a href='login.html'>Login</a><a href='register.html'>Signup</a>"
  });

//get item info
id = localStorage.getItem("itemId")
axios({
  method: 'get',
  url: `http://127.0.0.1:8000/api/auth/getItemById`,
  params: {
    id: id
  }
}).then(function (response) {
  let item = response.data.data;
  let itemDiv = document.getElementById("item-div");
  itemDiv.innerHTML = `
             <div class="item-img-div">
                <img src="${item[0].image}" alt="item2" class="item-img" />
             </div>
            <div class="item-info">
                <h3 class="item-title">${item[0].name}</h3>
                <p class="item-price">$${item[0].price}</p>
                <div class="item-info-btns">
                    <button id="add-to-cart" class="add-to">Add to Cart</button>
                    <button id="add-to-favorites" class="add-to">Add to Favorites</button>
                </div>
                <p class="item-description">
                ${item[0].description}
                </p>
            </div>
    `})