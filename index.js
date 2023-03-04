import { menuArray } from "./data.js"



const firstContainer = document.getElementById("first-container")

document.addEventListener('click', function (e) {
    if (e.target.dataset.plus) {
        console.log(e.target.dataset.plus)
        handlePlusBtn(e.target.dataset.plus)
    } else if (e.target.dataset.minus) {
        handleMinusBtn(e.target.dataset.minus)
    }
})


function handlePlusBtn(itemId) {
    const targetItemObj = menuArray.filter(function (item) {
        return item.id === itemId;
    });
    console.log(targetItemObj);
    console.log(targetItemObj.name);
}


function render() {

    let wholeFeed = ``

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
                    <button id="plus-btn" data-plus='${item.id}' >+</button>
                    <button id="minus-btn"  data-minus='${item.id}'>-</button>
                </div>
            </div> 
            `
    })
    firstContainer.innerHTML = wholeFeed
}
render()