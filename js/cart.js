/* =====================================================
   ELORIA - CART JAVASCRIPT
===================================================== */


/*
   Cart array.
*/

let cartItems = [];



/* =====================================================
   LOAD CART
===================================================== */

function loadCartPage() {


    /*
       Read cart from localStorage.
    */

    cartItems =
        JSON.parse(
            localStorage.getItem(
                "eloriaCart"
            )
        ) || [];


    /*
       Display cart.
    */

    displayCartItems();

}



/* =====================================================
   DISPLAY CART
===================================================== */

function displayCartItems() {


    const container =
        document.getElementById(
            "cartProducts"
        );


    if (!container) {

        return;

    }


    /*
       Empty cart.
    */

    if (cartItems.length === 0) {


        container.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-bag-x"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something beautiful to your cart.
                </p>

                <a
                    href="shop.html"
                    class="btn eloria-btn">

                    Start Shopping

                </a>

            </div>

        `;


        updateCartSummary();

        return;

    }



    /*
       Clear container.
    */

    container.innerHTML = "";



    /*
       Create every cart item.
    */

    cartItems.forEach(item => {


        const itemTotal =
            item.price *
            item.quantity;


        container.innerHTML += `

            <div class="cart-item">


                <!-- Product image -->

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image">



                <!-- Product information -->

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

                </div>



                <!-- Quantity -->

                <div class="quantity-controls">


                    <button
                        class="quantity-button"
                        onclick="changeCartQuantity(
                            '${item.id}',
                            -1
                        )">

                        -

                    </button>


                    <strong>
                        ${item.quantity}
                    </strong>


                    <button
                        class="quantity-button"
                        onclick="changeCartQuantity(
                            '${item.id}',
                            1
                        )">

                        +

                    </button>

                </div>



                <!-- Total -->

                <strong>

                    ₹${itemTotal}

                </strong>



                <!-- Remove -->

                <button
                    class="remove-button"
                    onclick="removeFromCart(
                        '${item.id}'
                    )">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;

    });



    /*
       Update summary.
    */

    updateCartSummary();

}



/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeCartQuantity(
    id,
    change
) {


    /*
       Find item.
    */

    const item =
        cartItems.find(
            product =>
                product.id == id
        );


    if (!item) {

        return;

    }


    /*
       Change quantity.
    */

    item.quantity += change;


    /*
       Remove if quantity reaches zero.
    */

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    /*
       Save cart.
    */

    saveCart();


    /*
       Refresh page.
    */

    displayCartItems();

}



/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeFromCart(id) {


    /*
       Remove matching item.
    */

    cartItems =
        cartItems.filter(
            item =>
                item.id != id
        );


    /*
       Save.
    */

    saveCart();


    /*
       Refresh.
    */

    displayCartItems();

}



/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {


    localStorage.setItem(

        "eloriaCart",

        JSON.stringify(cartItems)

    );


    /*
       Update navbar cart number.
    */

    if (
        typeof updateNavbarCart ===
        "function"
    ) {

        updateNavbarCart();

    }

}



/* =====================================================
   CART SUMMARY
===================================================== */

function updateCartSummary() {


    /*
       Calculate subtotal.
    */

    let subtotal = 0;


    cartItems.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    /*
       Delivery rule:

       Free above ₹999.
       Otherwise ₹50.
    */

    const delivery =
        subtotal === 0
            ? 0
            : subtotal >= 999
                ? 0
                : 50;


    /*
       Final total.
    */

    const total =
        subtotal +
        delivery;



    /*
       Display values.
    */

    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "deliveryCharge"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + subtotal;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
                ? "FREE"
                : "₹" + delivery;

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + total;

    }

}



/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {


    /*
       Don't allow empty cart.
    */

    if (cartItems.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    /*
       Get logged-in user.
    */

    const user =
        JSON.parse(
            localStorage.getItem(
                "eloriaLoggedInUser"
            )
        );


    /*
       User must login.
    */

    if (!user) {

        alert(
            "Please login before placing an order."
        );


        window.location.href =
            "login.html";

        return;

    }


    /*
       Calculate total.
    */

    let subtotal = 0;


    cartItems.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    const delivery =
        subtotal >= 999
            ? 0
            : 50;


    const total =
        subtotal +
        delivery;



    /*
       Create order.
    */

    const order = {

        id:
            "EL" + Date.now(),

        customer:
            user.email,

        date:
            new Date()
                .toLocaleString(),

        products:
            cartItems,

        subtotal:
            subtotal,

        delivery:
            delivery,

        total:
            total,

        status:
            "Order Placed"

    };


    /*
       Get old orders.
    */

    let orders =
        JSON.parse(
            localStorage.getItem(
                "eloriaOrders"
            )
        ) || [];


    /*
       Add order.
    */

    orders.push(order);


    /*
       Save orders.
    */

    localStorage.setItem(

        "eloriaOrders",

        JSON.stringify(orders)

    );


    /*
       Empty cart.
    */

    cartItems = [];


    saveCart();


    /*
       Show success.
    */

    alert(
        "Order placed successfully!\n\n" +
        "Order ID: " +
        order.id
    );


    /*
       Go to orders page.
    */

    window.location.href =
        "orders.html";

}



/* =====================================================
   START CART
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCartPage();

    }
);