let getCartdata = JSON.parse(localStorage.getItem("cart-products")) || []
var total = 0
let quantity = 1
let container = document.querySelector("#cart-container")
let rightSubTotal = document.querySelector("#sub")
let getCartCount = localStorage.getItem('cart-count')
let cartCount = document.querySelector('#cart-count')


function displayCard(data) {
    container.innerHTML = null
    data.forEach((e, index) => {
        total = total + (quantity * (e.price*71))
        rightSubTotal.textContent = '₹' + total
        //rightDisc.textContent = e.discount_percent*71

        let divs = document.createElement('div')
        divs.setAttribute('id', 'cart-prod-cont')

        let image = document.createElement('img')
        image.setAttribute('src', e.image)
        image.setAttribute('id', 'img')

        let name = document.createElement('p')
        name.textContent = e.name

        let price = document.createElement('p')
        price.textContent = "₹" + e.price*71

        let divs2 = document.createElement('div')
        divs2.setAttribute('id', 'quantity-info')

        let qty = document.createElement('p')
        qty.textContent = quantity

        let qtyInc = document.createElement('button')
        qtyInc.textContent = '+'
        qtyInc.addEventListener('click', () => {
            // event.preventDefault()
            if (quantity >= 1) {
                quantity++;
                qty.textContent = quantity
                //rightDisc.textContent = e.discount_percent*71
                sub_total.textContent = '₹' + (quantity * (e.price*71))
                rightSubTotal.textContent = total + (quantity * (e.price*71))
            }
        })

        let qtyDec = document.createElement('button')
        qtyDec.textContent = '-'
        qtyDec.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qty.textContent = quantity
                // rightDisc.textContent = e.discount_percent*71
                sub_total.textContent = '₹' + (quantity * (e.price*71))
                rightSubTotal.textContent = '₹' + total
            }
        })

        let removeBtn = document.createElement('button')
        removeBtn.setAttribute('id', 'remove-from-cart')
        removeBtn.textContent = 'X'
        removeBtn.addEventListener('click', () => {
            getCartCount--;
            localStorage.setItem("cart-count",getCartCount)
            // cartCount.textContent = getCartCount
            getCartdata.splice(index, 1)
            localStorage.setItem('cart-products', JSON.stringify(getCartdata))
            displayCard(getCartdata)
        })
        let sub_total = document.createElement('p')
        sub_total.textContent = '₹' + (quantity * (e.price*71))

        let line = document.createElement('hr')

        divs2.append(qtyDec, qty, qtyInc)
        divs.append(image, name, price, divs2, sub_total, removeBtn)
        container.append(divs, line);
    })
}
displayCard(getCartdata)
document.querySelector("#checkout-button").addEventListener("click",() => {
    window.location.href = "payment.html"
})
