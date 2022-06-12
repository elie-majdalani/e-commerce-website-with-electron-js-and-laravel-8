document.getElementById("submit-item").addEventListener("click", function(event) {
    event.preventDefault();
    var item = document.getElementById("item").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("description").value;
    var image = document.getElementById("image").value;
    var item = {
        item: item,
        price: price,
        category: category,
        description: description,
        image: image
    }
    var url = 'http://127.0.0.1:8000/api/auth/addItem/';
    axios({
        method: 'get',
        url: url,
        data: item
    })
    .then(function (response) {
        console.log(response);
        alert("Successfully added");
        window.location.href = "admin.html";
    })
    .catch(function (error) {
        console.log(error);
        alert("error");
    });
    
})

document.getElementById("submit-category").addEventListener("click", function(event) {
    event.preventDefault();
    var category = document.getElementById("new-category").value;
    var category = {
        category: category
    }
    var url = 'http://127.0.0.1:8000/api/auth/addCategory/';
    axios({
        method: 'get',
        url: url,
        data: category
    })
    .then(function (response) {
        console.log(response);
        alert("Successfully added");
        window.location.href = "admin.html";
    })
    .catch(function (error) {
        console.log(error);
        alert("error");
    });
    
})