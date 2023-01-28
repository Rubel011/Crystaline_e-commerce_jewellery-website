let container = document.querySelector('#item-cont')
let addressInput = document.querySelectorAll('.input-control')
let getData = JSON.parse(localStorage.getItem('cart-products')) || []

function displayCard(data) {
    data.forEach(e => {
        let div = document.createElement('div')
        let image = document.createElement('img')
        image.setAttribute('src', e.image)
        let name = document.createElement('p')
        name.textContent = e.name
        let price = document.createElement('p')
        price.textContent = '₹' + e.price * 71
        let line = document.createElement('hr')

        div.append(image, name, price)
        container.append(div, line)
    })
}
displayCard(getData)
// document.querySelector('#to-pay').textContent = toPay

function toPay() {
    let country = document.querySelector('.country').value
    let name = document.querySelector('.fullName').value
    let address = document.querySelector('.address').value
    let number = document.querySelector('.number').value
    if (country == ''|| name == '' || address == '' || number == '') {
        alert('Please enter you address')
    } else {
        alert('Order Placed Succesfully....redirecting to main page')
        window.location.href = './index.html'
    }
}

