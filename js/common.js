/* =====================================================
   ELORIA - COMMON JAVASCRIPT

   This file contains things that are used
   throughout the website.

   Examples:
   - Navbar
   - Footer
   - Cart count
===================================================== */


/* =====================================================
   1. CREATE NAVBAR
===================================================== */


/*
   Wait until HTML has loaded.
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createNavbar();

        createFooter();

        updateNavbarCart();

    }
);



/*
   This function creates the navbar.
*/

function createNavbar() {


    /*
       Find the navbar container.
    */

    const navbar =
        document.getElementById("navbar");


    /*
       If this page doesn't have a navbar,
       stop.
    */

    if (!navbar) {

        return;

    }



    /*
       Insert navbar HTML.
    */

    navbar.innerHTML = `

        <nav
            class="navbar navbar-expand-lg
                   navbar-light bg-white
                   sticky-top shadow-sm">

            <div class="container">


                <!-- LOGO -->

                <a
                    class="navbar-brand logo"
                    href="index.html">

                    Eloria

                </a>



                <!-- MOBILE MENU -->

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar">

                    <span
                        class="navbar-toggler-icon">
                    </span>

                </button>



                <!-- NAVIGATION -->

                <div
                    class="collapse navbar-collapse"
                    id="mainNavbar">


                    <ul class="navbar-nav mx-auto">


                        <li class="nav-item">

                            <a
                                class="nav-link"
                                href="index.html">

                                Home

                            </a>

                        </li>


                        <li class="nav-item">

                            <a
                                class="nav-link"
                                href="shop.html">

                                Shop

                            </a>

                        </li>


                        <li class="nav-item">

                            <a
                                class="nav-link"
                                href="orders.html">

                                Orders

                            </a>

                        </li>


                        <li class="nav-item">

                            <a
                                class="nav-link"
                                href="login.html">

                                Login

                            </a>

                        </li>

                    </ul>



                    <!-- CART -->

                    <a
                        href="cart.html"
                        class="btn nav-cart">

                        <i class="bi bi-bag">
                        </i>

                        Cart

                        <span
                            id="navbarCartCount"
                            class="badge bg-dark">

                            0

                        </span>

                    </a>

                </div>

            </div>

        </nav>

    `;

}



/* =====================================================
   2. CREATE FOOTER
===================================================== */


/*
   Creates the same footer on every page.
*/

function createFooter() {


    const footer =
        document.getElementById("footer");


    if (!footer) {

        return;

    }


    footer.innerHTML = `

        <footer class="site-footer">

            <div class="container text-center">


                <h3>
                    Eloria
                </h3>


                <p>
                    Makeup & Skincare
                </p>


                <div class="mb-3">

                    <a href="index.html">
                        Home
                    </a>

                    &nbsp; | &nbsp;

                    <a href="shop.html">
                        Shop
                    </a>

                    &nbsp; | &nbsp;

                    <a href="cart.html">
                        Cart
                    </a>

                </div>


                <p class="mb-0">

                    © 2026 Eloria.
                    All rights reserved.

                </p>

            </div>

        </footer>

    `;

}



/* =====================================================
   3. UPDATE CART NUMBER
===================================================== */


/*
   Reads cart from localStorage
   and shows total quantity.
*/

function updateNavbarCart() {


    /*
       Get saved cart.
    */

    const savedCart =
        localStorage.getItem(
            "eloriaCart"
        );


    /*
       Convert saved string into array.

       If no cart exists, use [].
    */

    const cart =
        savedCart
            ? JSON.parse(savedCart)
            : [];


    /*
       Calculate total quantity.
    */

    const count =
        cart.reduce(

            (total, item) =>
                total + item.quantity,

            0

        );


    /*
       Find navbar cart number.
    */

    const cartCount =
        document.getElementById(
            "navbarCartCount"
        );


    /*
       Update it.
    */

    if (cartCount) {

        cartCount.textContent = count;

    }

}