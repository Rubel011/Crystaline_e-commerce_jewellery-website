document.addEventListener("DOMContentLoaded", (ev) => {
  document.getElementById("recent-orders--table").appendChild(buildTableBody());

  document
    .getElementsByClassName("recent-updates")
    .item(0)
    .appendChild(buildUpdatesList());

  // Sales Analytics
  const salesAnalytics = document.getElementById("analytics");
  buildSalesAnalytics(salesAnalytics);
});

// Document Builder
const buildTableBody = () => {
  const recentOrderData = RECENT_ORDER_DATA;

  const tbody = document.createElement("tbody");

  let bodyContent = "";
  for (const row of recentOrderData) {
    bodyContent += `
        <tr>
          <td>${row.productName}</td>
          <td>${row.productNumber}</td>
          <td>${row.payment}</td>
          <td class="${row.statusColor}">${row.status}</td>
          <td class="primary">Details</td>
        </tr>
      `;
  }

  tbody.innerHTML = bodyContent;

  return tbody;
};

const buildUpdatesList = () => {
  const updateData = UPDATE_DATA;

  const div = document.createElement("div");
  div.classList.add("updates");

  let updateContent = "";
  for (const update of updateData) {
    updateContent += `
        <div class="update">
          <div class="profile-photo">
            <img src="${update.imgSrc}" />
          </div>
          <div class="message">
            <p><b>${update.profileName}</b> ${update.message}</p>
            <small class="text-muted">${update.updatedTime}</small>
          </div>
        </div>
      `;
  }

  div.innerHTML = updateContent;

  return div;
};

const buildSalesAnalytics = (element) => {
  const salesAnalyticsData = SALES_ANALYTICS_DATA;

  for (const analytic of salesAnalyticsData) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.classList.add(analytic.itemClass);

    const itemHtml = `
        <div class="icon">
          <span class="material-icons-sharp"> ${analytic.icon} </span>
        </div>
        <div class="right">
          <div class="info">
            <h3>${analytic.title}</h3>
            <small class="text-muted"> Last 24 Hours </small>
          </div>
          <h5 class="${analytic.colorClass}">${analytic.percentage}%</h5>
          <h3>${analytic.sales}</h3>
        </div>
      `;

    item.innerHTML = itemHtml;

    element.appendChild(item);
  }
};

// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

const products_btn = document.querySelector("#products_btn")

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

//products
let prod_container = document.getElementById("prod-container");
let earring_container = document.getElementById("earring-container");
let change_dash = document.getElementById("change_dash");
let form = document.getElementById("form-id");
let main_form = document.getElementById("main_form");
let product_id = document.getElementById("product_id");
let product_image = document.getElementById("product_image");
let product_name = document.getElementById("product_name");
let product_price = document.getElementById("product_price");
let add_product = document.getElementById("add_product");
let product_type = document.getElementById("product_type");
let product_type_label = document.getElementById("product_type_label");


form.style.display = "none"
product_type.style.display = "none"
product_type_label.style.display = "none"
let data = JSON.parse(localStorage.getItem("favourites")) || [];

products_btn.addEventListener("click", () => {
  change_dash.innerText = "Products"
  fetchData()

})
function fetchData() {
  fetch('https://63c6ab94d307b769673e3b21.mockapi.io/rings')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayproducts(data);
    })
    .catch(function (error) {
      console.log(error);
    })
  fetch('https://63c6ab94d307b769673e3b21.mockapi.io/Earrings')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayEarrings(data);
    })
    .catch(function (error) {
      console.log(error);
    })
}
function displayproducts(data) {
  prod_container.innerHTML = null;
  data.forEach((element, index) => {

    let cart = document.createElement("div");
    let image = document.createElement("img");
    image.src = element.image;
    let name = document.createElement("h3");
    name.innerText = element.name;
    let price = document.createElement("h4");
    price.innerText = element.price;
    let type = document.createElement("p");
    type.innerText = element.type;
    let del = document.createElement("button");
    del.innerText = "Delete";
    let edit = document.createElement("button");
    edit.innerText = "Edit";


    edit.addEventListener('click', () => {
      form.style.display = "block"
      product_type.style.display = "block"
      product_type_label.style.display = "block"
      product_id.value = element.id
      product_name.value = element.name
      product_price.value = element.price
      product_image.value = element.image
      product_type.value = element.type

    })
    del.addEventListener("click", function () {
      // data.splice(index, 1);
      // localStorage.setItem("favourites", JSON.stringify(data));
      // displayproducts(data);
      deleteProduct(element.type, element.id)
    })



    cart.append(image, name, price, type, del, edit);
    prod_container.append(cart);

  });

}

add_product.addEventListener("click", () => {
  form.style.display = "block"
  product_type.style.display = "block"
  product_type_label.style.display = "block"

})

main_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    id: main_form.product_id.value,
    name: main_form.product_name.value,
    image: main_form.product_image.value,
    price: main_form.product_price.value,
    type: main_form.product_type.value
  }
  if (main_form.priority.value == "add") {
    addProduct(obj)
  } else if (main_form.priority.value == "update") {
    updateProduct(obj)
  }
  // console.log(obj)
})


function addProduct(obj) {
  console.log( JSON.stringify(obj))
  fetch(`https://63c6ab94d307b769673e3b21.mockapi.io/${obj.type}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetchData()
      console.log(data)
    })
    .catch(function (error) {
      console.log(error);
    })
}
function updateProduct(obj) {
  // console.log('update')
  fetch(`https://63c6ab94d307b769673e3b21.mockapi.io/${obj.type}/${obj.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetchData()
      console.log(data)
    })
    .catch(function (error) {
      console.log(error);
    })
}
function deleteProduct(type,id) {
  // console.log('update')
  fetch(`https://63c6ab94d307b769673e3b21.mockapi.io/${type}/${id}`,
    {
      method: 'DELETE'

    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetchData()
      console.log(data)
    })
    .catch(function (error) {
      console.log(error);
    })
}


function displayEarrings(data) {
  earring_container.innerHTML = null;
  data.forEach((element, index) => {

    let cart = document.createElement("div");
    let image = document.createElement("img");
    image.src = element.image;
    let name = document.createElement("h3");
    name.innerText = element.name;
    let price = document.createElement("h4");
    price.innerText = element.price;
    let type = document.createElement("p");
    type.innerText = element.type;
    let del = document.createElement("button");
    del.innerText = "Delete";
    let edit = document.createElement("button");
    edit.innerText = "Edit"

    // edit.addEventListener(() => {
    //   let formel = document.createElement("form");
    //   let imgurl_input = document.createElement("input");
    //   let price_input = document.createElement("input");
    //   let id_input = document.createElement("input");

    //   formel.append(imgurl_input,price_input,id_input)
    //   form.append(formel);
    // })
    del.addEventListener("click", function () {
      data.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(data));
      displayEarrings(data);
    })



    cart.append(image, name, price, type, del, edit);
    earring_container.append(cart);

  });

}
