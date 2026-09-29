/* =====================================================
   ELORIA - LOGIN & REGISTER JAVASCRIPT
===================================================== */


/* =====================================================
   REGISTER
===================================================== */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {


    registerForm.addEventListener(
        "submit",
        function (event) {


            /*
               Stop page refresh.
            */

            event.preventDefault();


            /*
               Get values.
            */

            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;



            /*
               Check password length.
            */

            if (
                password.length < 6
            ) {

                showAuthMessage(
                    "registerMessage",
                    "Password must contain at least 6 characters.",
                    "red"
                );

                return;

            }



            /*
               Check passwords.
            */

            if (
                password !==
                confirmPassword
            ) {

                showAuthMessage(
                    "registerMessage",
                    "Passwords do not match.",
                    "red"
                );

                return;

            }



            /*
               Create user object.
            */

            const user = {

                name: name,

                email: email,

                password: password

            };



            /*
               Save user.

               This is only for your
               college frontend demo.
            */

            localStorage.setItem(

                "eloriaUser",

                JSON.stringify(user)

            );



            /*
               Show success.
            */

            showAuthMessage(
                "registerMessage",
                "Account created successfully!",
                "green"
            );


            /*
               Clear form.
            */

            registerForm.reset();

        }
    );

}



/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {


    loginForm.addEventListener(
        "submit",
        function (event) {


            /*
               Stop page refresh.
            */

            event.preventDefault();


            /*
               Get entered details.
            */

            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;



            /*
               Get registered user.
            */

            const savedUser =
                JSON.parse(
                    localStorage.getItem(
                        "eloriaUser"
                    )
                );


            /*
               If no account exists.
            */

            if (!savedUser) {

                showAuthMessage(
                    "loginMessage",
                    "No account found. Please register first.",
                    "red"
                );

                return;

            }



            /*
               Check login details.
            */

            if (

                email ===
                savedUser.email

                &&

                password ===
                savedUser.password

            ) {


                /*
                   Save logged-in user.
                */

                localStorage.setItem(

                    "eloriaLoggedInUser",

                    JSON.stringify(
                        savedUser
                    )

                );


                /*
                   Show success.
                */

                showAuthMessage(
                    "loginMessage",
                    "Login successful!",
                    "green"
                );


                /*
                   Redirect after short delay.
                */

                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    1000
                );


            }


            else {


                showAuthMessage(
                    "loginMessage",
                    "Incorrect email or password.",
                    "red"
                );

            }

        }
    );

}



/* =====================================================
   MESSAGE FUNCTION
===================================================== */

function showAuthMessage(
    elementId,
    message,
    color
) {


    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.style.color =
        color;

}