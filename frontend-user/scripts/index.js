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
  //add event listener to each category button
  let categoryBtns = document.getElementsByClassName("category-btn");
  for (i = 0; i < categoryBtns.length; i++) {
    categoryBtns[i].addEventListener("click", function (event) {
      let categoryId = event.target.id;
      getProducts(categoryId);

})}})

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
              <button id="add-to-favorites" class="add-to add-to-favorites">Favorite</button>
          </div>
        </div>
    </div>`
  }
  //add event listener to each favorite button
  let favoriteBtns = document.getElementsByClassName("add-to-favorites");
  for (i = 0; i < favoriteBtns.length; i++) {
    favoriteBtns[i].addEventListener("click", function (event) {
      let productId = event.currentTarget.parentElement.parentElement.parentElement.attributes.value.value;
      addToFavorites(productId);
    }
    )}
})

//search
document.getElementById("search-bar").addEventListener("keyup", function (event) {
  let search = document.getElementById("search-bar").value;
  let products = document.getElementById("products");
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/auth/search',
    params: {
      search: search
    }
  }).then(function (response) {
    let itemsFound = response.data.data;
    for (i = 0; i < productsList.childElementCount; i++) {
        for (j = 0; j < itemsFound.length; j++) {
          if (productsList.children[i].attributes.value.value == itemsFound[j].id) {
            productsList.children[i].style.removeProperty("display");
            break
          }
          else{
            productsList.children[i].style.setProperty("display", "none");
          }
    }
  }})})

  //get all products by category
  function getProducts(categoryId) {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/auth/getItemsByCategory',
      params: {
        id: categoryId
      }}).then(function (response) {
        let itemsFound = response.data.data;
        for (i = 0; i < productsList.childElementCount; i++) {
          for (j = 0; j < itemsFound.length; j++) {
            if (productsList.children[i].firstElementChild.textContent == itemsFound[j].category_id) {
              productsList.children[i].style.removeProperty("display");
              break
            }
            else{
              productsList.children[i].style.setProperty("display", "none");
            }
      }
    }})}

  //add to favorites
  function addToFavorites(productId) {
    token = localStorage.getItem("token");
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/auth/addToFavorite',
      data: {
        id: productId
      },
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(function (response) {
      alert("Added to favorites!");
    })}
