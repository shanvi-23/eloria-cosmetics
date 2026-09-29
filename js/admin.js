/* =====================================================
   ELORIA - ADMIN JAVASCRIPT
===================================================== */


/*
   Wait for products to load.
*/

document.addEventListener(
    "productsLoaded",
    function () {

        displayAdminProducts();

        displayAdminOrders();

    }
);



/* =====================================================
   ADD PRODUCT
===================================================== */

const adminForm =
    document.getElementById(
        "adminProductForm"
    );


if (adminForm) {


    adminForm.addEventListener(
        "submit",
        function (event) {


            /*
               Stop page refresh.
            */

            event.preventDefault();


            /*
               Get entered information.
            */

            const name =
                document.getElementById(
                    "adminName"
                ).value.trim();


            const category =
                document.getElementById(
                    "adminCategory"
                ).value;


            const price =
                Number(
                    document.getElementById(
                        "adminPrice"
                    ).value
                );


            const image =
                document.getElementById(
                    "adminImage"
                ).value.trim();


            const description =
                document.getElementById(
                    "adminDescription"
                ).value.trim();



            /*
               Create new product.
            */

            const newProduct = {

                id:
                    "custom-" +
                    Date.now(),

                name:
                    name,

                category:
                    category,

                price:
                    price,

                image:
                    image,

                description:
                    description

            };



            /*
               Get existing custom products.
            */

            let customProducts =
                JSON.parse(
                    localStorage.getItem(
                        "eloriaCustomProducts"
                    )
                ) || [];


            /*
               Add new product.
            */

            customProducts.push(
                newProduct
            );


            /*
               Save.
            */

            localStorage.setItem(

                "eloriaCustomProducts",

                JSON.stringify(
                    customProducts
                )

            );


            /*
               Show success.
            */

            document.getElementById(
                "adminMessage"
            ).textContent =
                "Product added successfully!";


            /*
               Clear form.
            */

            adminForm.reset();


            /*
               Refresh admin products.
            */

            displayAdminProducts();

        }
    );

}



/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayAdminProducts() {


    const container =
        document.getElementById(
            "adminProducts"
        );


    if (!container) {

        return;

    }


    /*
       Get custom products.
    */

    const customProducts =
        JSON.parse(
            localStorage.getItem(
                "eloriaCustomProducts"
            )
        ) || [];


    /*
       Combine XML and custom products.
    */

    const allProducts =
        [
            ...products,
            ...customProducts
        ];



    /*
       Create table.
    */

    let html = `

        <table class="admin-table">

            <thead>

                <tr>

                    <th>
                        Product
                    </th>

                    <th>
                        Category
                    </th>

                    <th>
                        Price
                    </th>

                    <th>
                        Action
                    </th>

                </tr>

            </thead>

            <tbody>

    `;



    /*
       Add each product.
    */

    allProducts.forEach(product => {


        html += `

            <tr>

                <td>
                    ${product.name}
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ₹${product.price}
                </td>

                <td>

                    ${
                        product.id.startsWith(
                            "custom-"
                        )

                        ?

                        `

                        <button
                            class="delete-product-btn"
                            onclick="deleteCustomProduct(
                                '${product.id}'
                            )">

                            Delete

                        </button>

                        `

                        :

                        `<span>
                            Default
                        </span>`

                    }

                </td>

            </tr>

        `;

    });



    html += `

            </tbody>

        </table>

    `;


    container.innerHTML =
        html;

}



/* =====================================================
   DELETE CUSTOM PRODUCT
===================================================== */

function deleteCustomProduct(id) {


    /*
       Get custom products.
    */

    let customProducts =
        JSON.parse(
            localStorage.getItem(
                "eloriaCustomProducts"
            )
        ) || [];


    /*
       Remove product.
    */

    customProducts =
        customProducts.filter(
            product =>
                product.id !== id
        );


    /*
       Save.
    */

    localStorage.setItem(

        "eloriaCustomProducts",

        JSON.stringify(
            customProducts
        )

    );


    /*
       Refresh.
    */

    displayAdminProducts();

}



/* =====================================================
   DISPLAY ORDERS
===================================================== */

function displayAdminOrders() {


    const container =
        document.getElementById(
            "adminOrders"
        );


    if (!container) {

        return;

    }


    /*
       Get orders.
    */

    const orders =
        JSON.parse(
            localStorage.getItem(
                "eloriaOrders"
            )
        ) || [];


    /*
       No orders.
    */

    if (orders.length === 0) {


        container.innerHTML = `

            <p>
                No customer orders yet.
            </p>

        `;


        return;

    }



    /*
       Create order list.
    */

    let html = "";



    orders.forEach(order => {


        html += `

            <div class="order-card">

                <strong>

                    ${order.id}

                </strong>


                <p>

                    Customer:
                    ${order.customer}

                </p>


                <p>

                    Date:
                    ${order.date}

                </p>


                <p>

                    Status:
                    ${order.status}

                </p>


                <strong>

                    Total:
                    ₹${order.total}

                </strong>

            </div>

        `;

    });


    container.innerHTML =
        html;

}