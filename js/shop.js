/* =====================================================
   ELORIA - SHOP JAVASCRIPT
===================================================== */


/*
   Current category.

   Initially show everything.
*/

let selectedCategory = "All";



/* =====================================================
   WAIT FOR PRODUCTS
===================================================== */


/*
   products.js sends this event
   after XML has loaded.
*/

document.addEventListener(
    "productsLoaded",
    function () {

        loadShopProducts();

        checkURLCategory();

    }
);



/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function loadShopProducts() {


    /*
       Get product container.
    */

    const container =
        document.getElementById(
            "shopProducts"
        );


    if (!container) {

        return;

    }


    /*
       Start with all products.
    */

    let list = products;


    /*
       Apply category filter.
    */

    if (
        selectedCategory !== "All"
    ) {

        list =
            products.filter(
                product =>
                    product.category ===
                    selectedCategory
            );

    }


    /*
       Get search text.
    */

    const searchInput =
        document.getElementById(
            "shopSearch"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
            : "";



    /*
       Apply search filter.
    */

    if (searchText !== "") {


        list =
            list.filter(
                product =>

                    product.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(searchText)

            );

    }



    /*
       Show number of products.
    */

    document.getElementById(
        "productCount"
    ).textContent =
        list.length +
        " products found";



    /*
       Clear old products.
    */

    container.innerHTML = "";



    /*
       No products.
    */

    if (list.length === 0) {


        container.innerHTML = `

            <div class="col-12 text-center py-5">

                <h3>
                    No products found.
                </h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;


        return;

    }



    /*
       Create each product card.
    */

    list.forEach(product => {


        container.innerHTML += `

            <div class="col-md-6 col-lg-3">


                <div class="shop-product-card">


                    <!-- Image -->

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="shop-product-image">



                    <div class="shop-product-content">


                        <!-- Category -->

                        <p class="shop-product-category">

                            ${product.category}

                        </p>


                        <!-- Name -->

                        <h3 class="shop-product-name">

                            ${product.name}

                        </h3>


                        <!-- Price -->

                        <p class="shop-product-price">

                            ₹${product.price}

                        </p>


                        <!-- Button -->

                        <a
                            href="product.html?id=${product.id}"
                            class="btn eloria-btn">

                            View Product

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}



/* =====================================================
   FILTER CATEGORY
===================================================== */


/*
   Called by category buttons.
*/

function filterShop(category) {


    /*
       Save category.
    */

    selectedCategory = category;


    /*
       Update active button.
    */

    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    /*
       Find button with matching text.
    */

    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            if (
                button.textContent
                    .trim() === category
            ) {

                button.classList.add(
                    "active"
                );

            }

        });


    /*
       Refresh products.
    */

    loadShopProducts();

}



/* =====================================================
   SEARCH
===================================================== */

const shopSearch =
    document.getElementById(
        "shopSearch"
    );


if (shopSearch) {


    shopSearch.addEventListener(
        "input",
        function () {

            loadShopProducts();

        }
    );

}



/* =====================================================
   READ CATEGORY FROM URL
===================================================== */


/*
   Example:

   shop.html?category=Makeup
*/

function checkURLCategory() {


    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get("category");


    if (
        category === "Makeup" ||
        category === "Skincare"
    ) {

        filterShop(category);

    }

}