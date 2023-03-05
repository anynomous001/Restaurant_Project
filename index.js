import { menuArray } from "./data.js"



const firstContainer = document.getElementById("first-container")
const totalDiv = document.getElementById("total-div")
const orderContainer = document.getElementById("order-container")
let totalPrice = document.getElementById('price')
const removeBtn = document.getElementsByClassName('remove-btn')
const paymentForm = document.getElementById('payment-form')
const payBtn = document.getElementById("pat-btn")
const completeBtnDiv = document.getElementById("complete-btn-div")
const messageDiv = document.getElementById('message-div')

document.addEventListener('click', function (e) {
    if (e.target.dataset.plus) {
        handlePlusBtn(e.target.dataset.plus)
    } else if (e.target.dataset.minus) {
        handleMinusBtn(e.target.dataset.minus)
    } else if (e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    } else if (e.target.dataset.click) {
        console.log(e.target.dataset.click)
        handleCompleteBtn()
    }

})

function handleCompleteBtn() {
    paymentForm.classList.remove('hidden')
}

/*function handlePlusBtn(itemId) {
    console.log(itemId);
  const targetItemObj = menuArray.filter(item => parseInt(item.id) === parseInt(itemId));
  console.log(targetItemObj);
}*/
paymentForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const consumerData = new FormData(paymentForm)
    const consumerName = consumerData.get('name')

    totalDiv.classList.add('hidden')
    totalDiv.classList.remove('active')

    messageDiv.classList.add('active')
    messageDiv.classList.remove('hidden')

    completeBtnDiv.style.display = 'none'
    paymentForm.style.display = 'none'

    messageDiv.innerHTML = `<p><span>${consumerName}</span>, Thank you For Choosing us ! <br> Your Order is On the way</p>`

})

const orderedMenuArray = [];
let price = 0

function handlePlusBtn(itemId) {
    const targetItemObj = menuArray.filter(function (item) {
        return item.id === itemId;
    })[0]
    console.log(targetItemObj);

    if (orderedMenuArray.length < 3) {
        orderedMenuArray.push(targetItemObj)
        price += targetItemObj.price;

    }
    completeBtnDiv.classList.remove('hidden')
    //completeBtnDiv.classList.add('active')

    totalPrice.innerHTML = `$${price}`;
    totalDiv.classList.add('active')
    totalDiv.classList.remove('hidden')

    render()
}
function handleMinusBtn(itemId) {
    const targetItemObj = menuArray.filter(function (item) {
        return item.id === itemId;
    })[0]
    price -= targetItemObj.price;
    totalPrice.innerHTML = `$${price}`;
    console.log(targetItemObj)


    if (orderedMenuArray.length == 1) {
        totalDiv.classList.add('hidden')
        totalDiv.classList.remove('active')
    }
    orderedMenuArray.pop();
    render()
}
function handleRemoveBtn(itemId) {
    const targetItemObj = menuArray.filter(function (item) {
        return item.id === itemId;
    })[0]

    price -= targetItemObj.price;
    totalPrice.innerHTML = `$${price}`;

    if (orderedMenuArray.length == 1) {
        totalDiv.classList.add('hidden')
        totalDiv.classList.remove('active')
    }
    orderedMenuArray.pop();
    render()



}

function render() {
    let wholeFeed = ''
    let orderDetails = ''



    orderedMenuArray.forEach(function (item) {
        orderDetails += `
             <div id="order-details">
                        <div>
                            <h1 id="ordered-item">${item.name}</h1>
                        </div>
                        <div id="remove-btn-div">
                            <button class="remove-btn" data-remove=${item.id}>Remove</button>
                        </div>
                         <div id="price-div">
                        <h3 id="price-tag">${item.price}</h3>
                        </div>
            </div>   
                    
             `});


    menuArray.forEach(function (item) {
        wholeFeed += `
      <div id="item">
        <div id="menu-inner-div">
          <div id="menu-items">${item.emoji}</div>
          <div>
            <h1 id="food-name">${item.name}</h1>
            <p id="food-ingredients">${item.ingredients}</p>
            <h3 id="food-price">$${item.price}</h3>
          </div>
        </div>
        <div id="btn-container">
          <button id="plus-btn" data-plus=${item.id}>+</button>
          <button id="minus-btn" data-minus=${item.id}>-</button>
        </div>
      </div>
       </div>
    `;
    });

    firstContainer.innerHTML = wholeFeed;
    orderContainer.innerHTML = orderDetails;
}

render()