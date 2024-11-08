function getLoggedUser() {
  let user_name = $("#user_id").val();
  let user_pass = $("#pass_id").val();
  // alert ("limba vietii este:" + $("#languageSelect option:selected").text());
  $.ajax({
    type: "POST",
    url: PATH_TO_CONTROLLERS + "/login/tryLogin",
    data: {
      userName: user_name,
      userPass: user_pass
    },
    success: function (response) {
      console.log(response);
      var title = '';
      switch (response.errMsg) {
        case 0:
          Cookies.set('wmtoken', response.token, {
            expires: 7
          });

          let token = Cookies.get('wmtoken');

          window.location.href = PATH_TO_CONTROLLERS + "/main?wmtoken=" + token;
          break;
        case 1:
          title = "Date incorecte";
          break;
        case 2:
          title = "Completați toate câmpurile";
          break;
      }
      if (response.errMsg != 0) {
        user_pass.val("");
        openSwal(title, "", null, "Închide");
      }
    }
  });
}

function newExternalUser() {
  $.ajax({
    type: "GET",
    url: PATH_TO_CONTROLLERS + "/login/viewExternalUserPage",
    dataType: "html",
    success: function (response) {
      document.getElementById("formContent").innerHTML = "";
      document.getElementById("formContent").innerHTML = response;
    }
  });
}

function insertRow() {
  let fName = $('#fname').val();
  let lName = $('#lname').val();
  let email = $('#email').val();
  let county = $('#county').val();
  let city = $('#city').val();
  let address = $('#address').val();
  let newPass = $('#pass1').val();
  let confirmNewPass = $('#pass2').val();

  if (newPass !== confirmNewPass) {
    alert("Cele 2 parole nu coincid!");
    newPass.val("");
    confirmNewPass.val("");
  } else {

    $.ajax({
      type: "POST",
      url: PATH_TO_CONTROLLERS + "/user/insertNewUser",
      data: {
        firstName: fName,
        lastName: lName,
        email: email,
        county: county,
        city: city,
        address: address,
        pass: newPass
      },
      success: function (response) {
        if (response.err_code == 0) {
          redirectToLogin();
        } else {
          openSwal("Eroare la salvarea noului utilizator! #" + response['err_code'] + ": " + response['msg'], '', null, 'Renunță');
        }
      }
    });
  }
}

function resetUserPassword() {
  let email = $('#email').val();
  if (validateEmail(email)) {
    $.ajax({
      type: "POST",
      url: PATH_TO_CONTROLLERS + "/user/resetUserPassword",
      data: {
        email: email,
        newPass: "",
        oldPass: ""
      },
      success: function (response) {
        if (response.err_code == 0) {
          openSwal("Parola temporara a fost trimisă pe adresa de mail: '" + email, '', redirectToLogin, "Confirmă");
          redirectToLogin();
        } else {
          openSwal("A apărut o eroare!", response.msg);
        }

      }

    });
  }

}

function getAllLanguages() {
  $.ajax({
    type: "GET",
    url: PATH_TO_CONTROLLERS + "/user/getAllLanguages",
    success: function (responseLanguages) {
      let languageList = document.getElementById("languageSelect");
      languageList.innerHTML = '';
      $.each(responseLanguages, function (k, v) {
        let lng = document.createElement("option");
        lng.text = k.toString();
        languageList.add(lng);
      });

      var optionText = $("#languageSelect option:selected").text();
      selectedLanguage = optionText;
      localStorage.setItem("languageIndexPage", selectedLanguage);
      //   	sessionStorage.setItem("languageIndexPage", selectedLanguage);
      changeLang(optionText);
    }
  });
}