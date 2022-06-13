document.getElementById("submit-item").addEventListener("click", function (event) {
    event.preventDefault();
    var item = document.getElementById("item").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("description").value;
    var image = document.getElementById("image");
    debugger
    var item = {
        name: item,
        description: description,
        price: price,
        category_id: category,
        image: image.files[0]
    }
    token = localStorage.getItem("token");
    var url = 'http://127.0.0.1:8000/api/auth/addItem/';
    
    axios({
        method: 'get',
        url: url,
        params: item,
        headers: {
            "Authorization": `Bearer ${token}`
        }
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

document.getElementById("submit-category").addEventListener("click", function (event) {
    event.preventDefault();
    var category = document.getElementById("new-category").value;
    var category = {
        name: category
    }
    var url = 'http://127.0.0.1:8000/api/auth/addCategory/';
    token = localStorage.getItem("token");
    axios({
        method: 'get',
        url: url,
        params: category,
        headers: {
            "Authorization": `Bearer ${token}`
        }
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