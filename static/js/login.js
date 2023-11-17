function sign_in() {
    let username = $("#input-username").val();
    let password = $("#input-password").val();

    if (username === "") {
        $("#help-id-login").text("Please input your id.");
        $("#input-username").focus();
        return;
    } else {
        $("#help-id-login").text("");
    }

    if (password === "") {
        $("#help-password").text("Please input your password.");
        $("#input-password").focus();
        return;
    } else {
        $("#help-password-login").text("");
    }

    console.log(username, password);

    $.ajax({
        type: "POST",
        url: "/sign_in",
        data: {
            username_give: username,
            password_give: password,
        },
        success: function (response) {
            if (response["result"] === "success") {
                console.log(response["token"]);
                $.cookie(response.token_key, response["token"], { path: "/" });
                window.location.replace("/");
                alert('You have logged in!');
            } else {
                alert(response["msg"]);
            }
        },
    });
}

function sign_up() {
    const inputPassword = $("#input-password")
    const inputPassword2 = $("#input-password2")
    let username = $("#input-username").val();
    let password = inputPassword.val();
    let password2 = inputPassword2.val();

    const helpId = $("#help-id");
    const helpPassword = $("#help-password");
    const helpPassword2 = $("#help-password2");
    console.log('help id attr=', $("#help-id").attr("class"));

    if (helpId.hasClass("is-danger")) {
        alert("Please check your ID");
        return;
    } else if (!helpId.hasClass('is-success')) {
        alert("Please double check your ID, something is wrong");
        return;
    }

    //password
    if (password === '') {
        helpPassword.text("Please enter your password")
            .removeClass('is-success')
            .addClass('is-danger');
        inputPassword.focus();
        return;
    } else if (!is_password(password)) {
        helpPassword.text('For your password, please enter 8-20 English characters, numbers, or the following special characters (!@#$%^&*)')
            .removeClass('is-success')
            .addClass('is-danger');
        inputPassword.focus();
        return;
    } else {
        helpPassword.text('This password can be used !!!')
            .removeClass('is-danger')
            .addClass('is-success');
    }

    //password2
    if (password2 === '') {
        helpPassword2.text("Please enter your password")
            .removeClass('is-success')
            .addClass('is-danger');
        inputPassword2.focus();
        return;
    } else if (password2 !== password) {
        helpPassword2.text("Your passwords do not match")
            .removeClass("is-safe")
            .addClass("is-danger");
        inputPassword2.focus();
        return;
    } else {
        helpPassword.text('Your password matches')
            .removeClass('is-danger')
            .addClass('is-success');
    }

    $.ajax({
        type: "POST",
        url: "/sign_up/save",
        data: {
            username_give: username,
            password_give: password,
        },
        success: function (response) {
            alert("You are registered Nice!");
            window.location.replace('/login');
        },
    });
}

function toggle_sign_up() {
    $("#sign-up-box").toggleClass("is-hidden")
    $("#div-sign-in-or-up").toggleClass("is-hidden")
    $("#btn-check-dup").toggleClass("is-hidden")
    $("#help-id").toggleClass("is-hidden")
    $("#help-password").toggleClass("is-hidden")
    $("#help-password2").toggleClass("is-hidden")
}

function is_nickname(asValue) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/
    return regExp.test(asValue);
}

function is_password(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/
    return regExp.test(asValue);
}

function check_dup() {
    let inputusername = $('#input-username')
    let helpId = $('#help-id')
    let username = inputusername.val();
    if (username === '') {
        helpId.text('Please enter your id')
            .removeClass('is-success')
            .addClass('is-danger')
        inputusername.focus();
        return;
    }

    if (!is_nickname(username)) {
        helpId.text('For your id, please enter 2-10 English characters, numbers, or the following special characters (._-)')
            .removeClass('is-success')
            .addClass('is-danger')
        inputusername.focus();
        return;
    }

    helpId.addClass('is-loading')

    $.ajax({
        type: 'POST',
        url: '/sign_up/check_dup',
        data: {
            username_give: username,
        },
        success: function (response) {
            console.log('response', response);
            if (response['exists']) {
                helpId.text('This id is already in use')
                    .removeClass('is-success')
                    .addClass('is-danger')
                inputusername.focus();
            } else {
                helpId.text('This id is available for use!')
                    .removeClass('is-danger')
                    .addClass('is-success')
            }
            helpId.removeClass('is-loading')
        }

    })
}

function clearInput() {
    $("#input-username").val("");
    $("#input-password").val("");
    $("#input-password2").val("");
}