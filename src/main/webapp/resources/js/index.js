function login() {
  let user = $('#username').val();
  let pass = $('#password').val();

  if (!user || !pass) {
    return;
  }

  $.ajax({
    url: "api/auth/login",
    method: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: {
      username: user,
      password: pass
    },
    success: function (response) {
      Cookies.set('wstToken', JSON.stringify(response.token), {expires: 1});
      Cookies.set('wstRoles', JSON.stringify(response.roles), {expires: 1});
      Cookies.set('wstGroups', JSON.stringify(response.groups), {expires: 1});
      Cookies.set('wstEmail', JSON.stringify(response.email), {expires: 1});
      Cookies.set('wstFullName', JSON.stringify(response.fullName), {expires: 1});
      Cookies.set('wstUsername', JSON.stringify(response.username), {expires: 1});

      var userType= response.userType;
      //crt path il construiesc in back....
      doGetJson(`api/auth/redirect-client-manager/${userType}`).done(function (response) {
        var crtPath = response.crtPath;
        //crtPath va fi sau client(clientul) sau main(managerul)
        window.location.href = PATH_TO_CONTROLLERS + "/" + crtPath;
        console.warn("TEST!!" + response);
    })
    },
    
    error: function () {
      swalGeneral("Date incorecte", "", "warning")
    }
    
  });
  
}

function r(response) {

}

function getLoggedUser() {
  var user_name = document.getElementById("user_id").value;
  var user_pass = document.getElementById("pass_id").value;
  // alert ("limba vietii este:" + $("#languageSelect option:selected").text());
  $.ajax({
    type: "POST",
    url: PATH_TO_CONTROLLERS + "/login/tryLogin",
    data: {
      userName: user_name,
      userPass: user_pass
    },
    success: function (response) {
      var title = '';
      switch (response.errMsg) {
        case 0:
          Cookies.set('wmtoken', response.token, {
            expires: 7
          });

          var token = Cookies.get('wmtoken');

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
        $("#pass_id").val("");
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

/*function resetNewUserPassword() {
    $.ajax({
        type : "GET",
        url : PATH_TO_CONTROLLERS + "/login/resetPassword",
        dataType : "html",
        success : function(response) {
            document.getElementById("formContent").innerHTML = "";
            document.getElementById("formContent").innerHTML = response;
        }
    });
}*/

function insertRow() {
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  var email = $('#email').val();
  var county = $('#county').val();
  var city = $('#city').val();
  var address = $('#address').val();
  var pass1 = $('#pass1').val();
  var pass2 = $('#pass2').val();

  if (pass1 !== pass2) {
    alert("Cele 2 parole nu coincid!");
    $('#pass1').val("");
    $('#pass2').val("");
  } else {

    $.ajax({
      type: "POST",
      url: PATH_TO_CONTROLLERS + "/user/insertNewUser",
      data: {
        firstName: fname,
        lastName: lname,
        email: email,
        county: county,
        city: city,
        address: address,
        pass: pass1
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
  var email = $('#email').val();
  if (validateEmail('#email')) {
    $.ajax({
      type: "POST",
      url: "api/auth/forgotten-password/" + email,
      data: {},
      success: function (response) {
        swalGeneral('Parolă resetată cu succes!', 'O parolă provizorie a fost trimisă pe e-mail', 'success').then(function () {
          redirectToLogin()
        })
      }, error: function (request, status, error) {
        swalGeneral('A apărut o eroare!', 'Email-ul introdus nu este corect', 'error')
      }

    });
  }

}

function redirectToLogin() {
  window.location.href = PATH_TO_CONTROLLERS + "/";
}

function openSwal(title, message, callback, button, icon) {
  if (button == null) {
    button = ["Renunță", "Confirmă"];
  }
  if (icon == null) {
    icon = "warning";
  }
  var message1 = document.createElement('span');
  message1.innerHTML = message;
  new swal({
    title: title,
    content: message1,
    icon: icon,
    buttons: button
  }).then(function (willDelete) {
    if (callback != null) {
      callback();
    }
  });
}

function getAllLanguages() {
  $.ajax({
    type: "GET",
    url: PATH_TO_CONTROLLERS + "/user/getAllLanguages",
    success: function (responseLanguages) {
      var languageList = document.getElementById("languageSelect");
      languageList.innerHTML = '';
      $.each(responseLanguages, function (k, v) {
        var lng = document.createElement("option");
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

$("#languageSelect").unbind('change');

$('#languageSelect').on('change', function () {
  var optionText = $("#languageSelect option:selected").text();
  selectedLanguage = optionText;
  localStorage.setItem("languageIndexPage", selectedLanguage);
  //sessionStorage.setItem("languageIndexPage", selectedLanguage);
  changeLang(optionText);
});

var lng;

function changeLang(lang) {
  $.ajax({
    type: "GET",
    url: PATH_TO_CONTROLLERS + "/main/getLanguageContent",
    data: {
      language: lang,
      pages: "firstPage"
    },
    success: function (responseLanguage) {// 1000 linii
      lng = responseLanguage;
      selectedLanguage = $("#languageSelect option:selected").text();
      localStorage.setItem("languageIndexPage", selectedLanguage);
      //sessionStorage.setItem("languageIndexPage", selectedLanguage);//
      //alert(lng);
      //alert("before bringing language");
      $('.lang-change').each(function () {
        //console.log(lng);
        switch ($(this).prop('nodeName').toLowerCase()) {
          case 'span':
          case 'div':
          case 'button':
            //$(this).text(responseLanguage[$(this).data('lang-id')]);
            $(this).text(lng[$(this).data('lang-id')]);
            break;
          case 'input':
            var type = $(this).attr('type').toLowerCase();
            if (type == 'button' && type == 'submit' && type == 'reset') {
              //$(this).val(responseLanguage[$(this).data('lang-id')]);
              $(this).val(lng[$(this).data('lang-id')]);
            } else {
              $(this).attr("placeholder", responseLanguage[$(this).data('lang-id')]);
              $(this).attr("placeholder", lng[$(this).data('lang-id')]);
              //	alert("bla bla bla "+ lng[$(this).data('lang-id')]);
            }
            break;
          default:
            //$(this).text(responseLanguage[$(this).data('lang-id')]);
            $(this).text(lng[$(this).data('lang-id')]);
            break;
        }
      });

    }
  });
}

window.onload = function () {
  $('#formContent').css('transform', 'translateX(0px)');
  setTimeout(() => {
    $("input:first").focus();
  }, 800)
}

function resetPassword() {
  $.ajax({
    type: "GET",
    url: PATH_TO_CONTROLLERS + "/users/resetPassword",
    dataType: "html",
    success: function (response) {
      $('#formContent').html(response)

    }
  });
}

$(document).ready(function () {
  const dropdownItems = $('.dropdown-inter').find('.dropdown-item');
  const dropdownToggle = $('.dropdown-inter .dropdown-toggle');
  let url = new URL(window.location.href);
  let selectedLang = url.searchParams.get("lang") || localStorage.getItem('selectedLanguage');

  if (selectedLang) {
    dropdownItems.removeClass('active');
    dropdownItems.find('i.fa-check').remove();


    if (selectedLang === 'en') {
      dropdownToggle.html('<img src="resources/images/lang/icon-en.png" class="img-language"/>')
    } else {
      dropdownToggle.html('<img src="resources/images/lang/icon-ro.png" class="img-language"/>');
      selectedLang = 'ro';
    }
    dropdownItems.each(function () {
      const langCode = $(this).attr('data-lang');
      if (langCode === selectedLang) {
        $(this).addClass('active');
        $(this).append('<i class="fa fa-check text-success ms-2"></i>');
      }
    });
    localStorage.setItem('selectedLanguage', selectedLang);
  }

  dropdownItems.on('click', function (e) {
    e.preventDefault();

    const selectedLang = $(this).attr('data-lang');
    console.log(selectedLang); // Debugging: Log selectedLang to console

    localStorage.setItem('selectedLanguage', selectedLang);

    let url = new URL(window.location.href);
    if (selectedLang === 'ro') {
      url.searchParams.set('lang', 'ro');
      dropdownToggle.html('<img src="resources/images/lang/icon-ro.png" class="img-language"/>')
    } else if (selectedLang === 'en') {
      url.searchParams.set('lang', 'en');
      dropdownToggle.html('<img src="resources/images/lang/icon-en.png" class="img-language"/>')
    } else {
      url.searchParams.delete('lang');
    }

    // setTimeout(() => {
    window.location.href = url.href;
    // }, 200);
  });
});