/* =====================================================
   ELORIA - ORDERS JAVASCRIPT
===================================================== */


/*
   Load orders when page opens.
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayOrders();

    }
);



/* =====================================================
   DISPLAY ORDERS
===================================================== */

function displayOrders() {


    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (!container) {

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
       Login required.
    */

    if (!user) {


        container.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Please login
                </h3>

                <p>
                    Login to view your orders.
                </p>

                <a
                    href="login.html"
                    class="btn eloria-btn">

                    Login

                </a>

            </div>

        `;


        return;

    }



    /*
       Get all orders.
    */

    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "eloriaOrders"
            )
        ) || [];


    /*
       Only show this user's orders.
    */

    const orders =
        allOrders.filter(
            order =>
                order.customer ===
                user.email
        );



    /*
       No orders.
    */

    if (orders.length === 0) {


        container.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-box-seam"></i>

                <h3>
                    No orders yet
                </h3>

                <p>
                    Your placed orders will appear here.
                </p>

                <a
                    href="shop.html"
                    class="btn eloria-btn">

                    Start Shopping

                </a>

            </div>

        `;


        return;

    }



    /*
       Clear container.
    */

    container.innerHTML = "";



    /*
       Display every order.
    */

    orders.reverse().forEach(order => {


        let productsHTML = "";


        /*
           Display products inside order.
        */

        order.products.forEach(item => {


            productsHTML += `

                <div class="order-product">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <p class="mb-0">

                            ₹${item.price}
                            ×
                            ${item.quantity}

                        </p>

                    </div>

                </div>

            `;

        });



        /*
           Create order card.
        */

        container.innerHTML += `

            <div class="order-card">


                <div class="order-header">


                    <div>

                        <div class="order-id">

                            Order ID:
                            ${order.id}

                        </div>

                        <small>
                            ${order.date}
                        </small>

                    </div>


                    <span class="order-status">

                        ${order.status}

                    </span>

                </div>


                ${productsHTML}


                <div class="text-end mt-3">

                    <strong>

                        Total:
                        ₹${order.total}

                    </strong>

                </div>

            </div>

        `;

    });

}