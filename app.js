let addToCartButtons = document.getElementsByClassName('btn-primary');
let cartContainer = document.getElementsByTagName('tbody')[0];
let itemQuantity = document.getElementsByClassName('num');
let delete_buttons = document.getElementsByClassName('uk-button-danger');

// picking up all the Add To Cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}

// This function adds items the cart
function addToCart(e) {

    let itemContainer = document.createElement('tr');
    let btn = e.target;
    let btnGrandParent = btn.parentElement.parentElement;
    let btnParent = btn.parentElement;
    let itemImage = btnGrandParent.children[0].src;
    let itemName = btnParent.children[0].innerText;
    let itemPrice = btnParent.children[1].innerText;


    // check if product already in cart
    cartTitles = cartContainer.getElementsByClassName('item-name');
    for (var i = 0; i < cartTitles.length; i++) {
        if (cartTitles[i].innerText == itemName) {
            alert('Product already added to cart. You can change quantity by clicking the arrow in the basket.');
            return;
        }
    }

    //make container new html 
    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="100%" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`

    cartContainer.append(itemContainer)


    // Accessing individual quantity fields
    for (let i = 0; i < itemQuantity.length; i++) {
        itemQuantity[i].value = 1
        itemQuantity[i].addEventListener('change', totalCost)

    }

    // Accessing individual quantity fields
    for (let i = 0; i < delete_buttons.length; i++) {
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()

}

// This function helps to multiply the quantity and the price
function totalCost(e) {
    let quantity = e.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.innerText.replace('€', '')
    total_field.children[0].innerText = '€' + quantity.value * price_field_content
    grandTotal()
    if (isNaN(quantity.value) || quantity.value <= 0) {
        quantity.value = 1
    }

}

// This function helps to add up the total of the items 
function grandTotal() {
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for (let i = 0; i < all_total_fields.length; i++) {
        all_prices = Number(all_total_fields[i].innerText.replace('€', ''))
        total += all_prices
    }
    if (total > 100) {
        alert('You have a 10% Discount!');
        grand_total.children[0].innerText = total - (total * 0.10) + "€";
        grand_total.children[0].style.fontWeight = 'bold';
    } else {
        grand_total.children[0].innerText = total + "€"
        grand_total.children[0].style.fontWeight = 'bold';
    }
}

function removeItem(e) {
    del_btn = e.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    grandTotal()

}