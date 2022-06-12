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
    navbar.innerHTML += `<a href='favorites.html'>Favorites</a><a href='#' id="logout">Logout</a>`
    document.getElementById("logout").addEventListener("click", function (event) {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    })
  })
  .catch(function (error) {
    let navbar = document.getElementById("mySidenav")
    navbar.innerHTML += "<a href='login.html'>Login</a><a href='register.html'>Signup</a>"
  });
//get all categories
axios({
  method: 'get',
  url: 'http://127.0.0.1:8000/api/auth/getAllCategories',
}).then(function (response) {
  let categories = response.data.data;
  categoriesList = document.getElementById("categories");
  for (i = 0; i < categories.length; i++) {
    categoriesList.innerHTML += `<button class="category-btn" id=${categories[i].id}">${categories[i].name}</button>`
  }
})

//get all products
axios({
  method: 'get',
  url: 'http://127.0.0.1:8000/api/auth/',
}).then(function (response) {
  let products = response.data.data;
  productsList = document.getElementById("products");
  for (i = 0; i < products.length; i++) {
    productsList.innerHTML += `
    <div class="item-div" value="${products[i].id}">
      <p style="display:none">${products[i].category_id}</p>
        <img src="./assets/item-tester.jpg" alt="item2" class="item-img"/>
        <div class="item-info">
          <h3 class="item-title">${products[i].name}</h3>
          <p class="item-price">$${products[i].price}</p>
          <div class="item-info-btns">
              <button id="add-to-cart" class="add-to">Add to Cart</button>
              <button id="add-to-favorites" class="add-to">Favorite</button>
          </div>
        </div>
    </div>`
  }
})