$(document).ready(function() {
    const loginButton = $("#loginButton");
    const username = $("#loginUsername");
    const password = $("#loginPassword");

    loginButton.on("click", function() {
        tryLogin();
    });

    username.on("input", function() {
        removeHighlight();
    });

    password.on("input", function() {
        removeHighlight();
    });

    function tryLogin() {
        const UName = username.val();
        const UPassword = password.val();
        console.log(UName, UPassword);

        if (loginDataCorrect()) {
            $.ajax({
                url: '/login',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: UName,
                    password: UPassword
                }),
                success: function(data) {
                    document.cookie = `sessionToken=${data.sessionToken}; path=/`;
                    console.log(document.cookie);
                    window.location.href = '/adminPanel';
                    removeHighlight();
                },
                error: function(response) {
                    highlightInputFields();
                    window.alert(response.responseJSON.message)
                }
            });
        } else {
            highlightInputFields();
        }
    }

    function removeHighlight() {
        username.removeClass("error");
        password.removeClass("error");
    }

    function highlightInputFields() {
        username.toggleClass("error");
        password.toggleClass("error");
    }

    function loginDataCorrect() {
        return username.val().length > 0 && password.val().length > 0;
    }
});