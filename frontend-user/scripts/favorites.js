function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  
  document.getElementsByClassName("btn-search")[0].addEventListener("click", function(event) {
    document.getElementById("search-bar").focus();
  })
  //logout
  document.getElementById("logout").addEventListener("click", function (event) {
    localStorage.removeItem("token");
    window.location.href = "index.html";})

    
  //get all favorite products
  token = localStorage.getItem("token");
axios({
  method: 'get',
  url: 'http://127.0.0.1:8000/api/auth/getAllFavorites',
  headers: {
    "Authorization": `Bearer ${token}`
  }
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
              <button id="add-to-favorites" class="add-to">Remove</button>
          </div>
        </div>
    </div>`
  }
})