/* =====================================================
   ELORIA - PRODUCT DATA
===================================================== */


/*
   Main product array.
*/

let products = [];



/* =====================================================
   LOAD PRODUCTS
===================================================== */

async function loadProducts() {


    try {


        /* Load XML */

        const response =
            await fetch(
                "data/products.xml"
            );


        /* Convert XML to text */

        const xmlText =
            await response.text();


        /* Create XML parser */

        const parser =
            new DOMParser();


        /* Convert text to XML */

        const xml =
            parser.parseFromString(
                xmlText,
                "text/xml"
            );


        /* Find products */

        const productElements =
            xml.getElementsByTagName(
                "product"
            );


        /* Convert XML products */

        products =
            Array.from(
                productElements
            ).map(product => {


                return {

                    id:
                        product
                            .getElementsByTagName("id")[0]
                            .textContent
                            .trim(),

                    name:
                        product
                            .getElementsByTagName("name")[0]
                            .textContent
                            .trim(),

                    category:
                        product
                            .getElementsByTagName("category")[0]
                            .textContent
                            .trim(),

                    price:
                        Number(
                            product
                                .getElementsByTagName("price")[0]
                                .textContent
                                .trim()
                        ),

                    description:
                        product
                            .getElementsByTagName("description")[0]
                            .textContent
                            .trim(),

                    image:
                        product
                            .getElementsByTagName("image")[0]
                            .textContent
                            .trim()

                };

            });



        /*
           Get products added by admin.
        */

        const customProducts =
            JSON.parse(
                localStorage.getItem(
                    "eloriaCustomProducts"
                )
            ) || [];


        /*
           Add custom products
           to main product array.
        */

        products = [

            ...products,

            ...customProducts

        ];


        /*
           Tell other JS files that
           products are ready.
        */

        document.dispatchEvent(
            new Event("productsLoaded")
        );


    }


    catch (error) {


        console.error(
            "Product loading error:",
            error
        );

    }

}


/* =====================================================
   START
===================================================== */

loadProducts();