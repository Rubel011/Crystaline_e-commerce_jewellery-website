
let bag = []
fetch('https://63c6ab94d307b769673e3b21.mockapi.io/rings')
    .then((fromResolve) => {
        return fromResolve.json()
    })
    .then((result) => {
        bag = result
        console.log(bag)
        displayCard(bag)
    })

function displayCard(data) {
    let each = document.querySelector("#products-container")
    each.innerHTML = null;
    data.forEach(e => {
        let div = document.createElement("div")
        div.setAttribute("class", "each-card")

        let name = document.createElement("h3")
        name.textContent = e.name
        let image = document.createElement("img")
        image.setAttribute("src", e.image)

        let price = document.createElement("p")
        let mrp = e.price * 71
        price.textContent = "Price - " + "₹" + mrp

        let discount = document.createElement("strike")
        discount.setAttribute("id", "disc")
        discount.textContent = "MRP " + "₹" + Math.ceil((mrp + (mrp / e.discount_percent)))

        let button = document.createElement("button")
        button.textContent = "Add To Cart"
        button.addEventListener("click", () => {
            // preventDefault()
            let cartData = JSON.parse(localStorage.getItem("cart-products")) || []
            isAlreadyInCart = false;
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i].id === e.id) {
                    isAlreadyInCart = true;
                    break;
                }
            }
            if (isAlreadyInCart === true) {
                button.textContent = "Already in cart"
            } else {
                cartData.push({ ...e })
                localStorage.setItem("cart-products", JSON.stringify(cartData))
                button.textContent = "Added to cart"
            }
        })

        div.append(image, name, price, discount, button)
        each.append(div)
    })
}

// Sorting
let sort = document.querySelector(".sort")
sort.addEventListener("change", () => {
    if(sort.value === "default"){
        displayCard(bag)
    }
    if (sort.value === "LTH") {
        bag.sort((a, b) => a.price - b.price)
    }
    if (sort.value === "HTL") {
        bag.sort((a, b) => b.price - a.price)
    }
    if (sort.value === "asec") {
        fetch('https://63c6ab94d307b769673e3b21.mockapi.io/rings?sortBy=name&order=asc')
            .then((fromResolve) => {
                return fromResolve.json()
            })
            .then((asec) => {
               // console.log(asec);
                displayCard(asec)
            })
    }
    if (sort.value === "desc") {
        fetch('https://63c6ab94d307b769673e3b21.mockapi.io/rings?sortBy=name&order=desc')
            .then((fromResolve) => {
                return fromResolve.json()
            })
            .then((desc) => {
               // console.log(desc);
                displayCard(desc)
            })
    }
    displayCard(bag)
})

//rightside filter by price

function b5k() {
    let selected = document.getElementById("price5k")
    if (selected.checked) {
        let below5k = bag.filter(e => {
            return (e.price <= (5000 / 71))
        })
        displayCard(below5k)
    } else {
        displayCard(bag)
    }
}
function b5_10() {
    let selected = document.getElementById("price5-10")
    if (selected.checked) {
        let price5_10k = bag.filter(e => {
            return (e.price >= (5000 / 71) && e.price <= (10000 / 71))
        })
        displayCard(price5_10k)
    } else {
        displayCard(bag)
    }
}
function b10_15() {
    let selected = document.getElementById("price10-15")
    if (selected.checked) {
        let price10_15k = bag.filter(e => {
            return (e.price >= (10000 / 71) && e.price <= (15000 / 71))
        })
        displayCard(price10_15k)
    } else {
        displayCard(bag)
    }
}
function b15_25() {
    let selected = document.getElementById("price15-25")
    if (selected.checked) {
        let price15_25k = bag.filter(e => {
            return (e.price >= (15000 / 71) && e.price <= (25000 / 71))
        })
        displayCard(price15_25k)
    } else {
        displayCard(bag)
    }
}

// search function
function search() {
    //sortbyname()
    event.preventDefault()
    let a = document.querySelector('.inputSearch').value
    // console.log(a)
    let searchData = bag.filter(function (e) {
        return e.name.toLowerCase().includes(a.toLowerCase())
    })
    displayCard(searchData)
}