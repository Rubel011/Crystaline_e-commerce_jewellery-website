
let bag = []
fetch('https://63c6ab94d307b769673e3b21.mockapi.io/Earrings')
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
                if (cartData[i].id === e.id){
                    isAlreadyInCart = true;
                    break;
                }
            }
            if(isAlreadyInCart === true){
                button.textContent = "Already in cart"
            }else{
                cartData.push({...e})
                localStorage.setItem("cart-products",JSON.stringify(cartData))
                button.textContent = "Added to cart"
            }
        })

        div.append(image, name, price, discount, button)
        each.append(div)
    })
}
//add to cart function
// function addTocart(){

// }
// Sorting
let sort = document.querySelector(".sort")
sort.addEventListener("change", () => {
    // console.log(sort.value);
    // if(sort.value === "Default"){
    //     displayCard(bag)
    // }
    if (sort.value === "LTH") {
        bag.sort((a, b) => a.price - b.price)
    }
    if (sort.value === "HTL") {
        bag.sort((a, b) => b.price - a.price)
    }
    if (sort.value === "asec") {
        bag.sort((a, b) => a.name < b.name)
        console.log(bag)
    }
    if (sort.value === "desc") {
        bag.sort((a, b) => b.name > a.name)
        console.log(bag)
    }
    displayCard(bag)
})

//rightside filter by price

let checkboxes = document.querySelectorAll("#by-price");
for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
        console.log(checkboxes[i].textContent);
    }
}