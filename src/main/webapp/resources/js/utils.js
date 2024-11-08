$(document).on({
  ajaxStart: function () {
    startLoading();
    $.ajaxSetup({
      beforeSend: function (xhr, options) {
        if (Cookies.get("wstToken") || "" != "") {
          xhr.setRequestHeader('Authorization',
              'Bearer ' + JSON.parse(Cookies.get("wstToken") || ""));
        }
        if (options.contentType == "application/json" && typeof options.data
            != "string") {
          options.data = JSON.stringify(options.data);
        }
      }
    });
  },
  ajaxStop: function () {
    stopLoading();
    document.title = getTitle();
    setFocus(false);
  }
});
$.ajaxSetup({
  beforeSend: function (xhr, options) {
    if (Cookies.get("wstToken") || "" != "") {
      xhr.setRequestHeader('Authorization',
          'Bearer ' + JSON.parse(Cookies.get("wstToken") || ""));
    }
  },
  error: function (x, status, error) {

    if (x.status == 401) {
      //alert("token expirat");
      swalGeneral("Sesiunea a expirat!",
          "Vă rugăm să vă autentificați din nou.", "error").then(function () {
        logout();
      });

    }
  }
});
$.ajaxPrefilter("json", function (options, originalOptions) {
  options.data = JSON.stringify(originalOptions.data) || null;
  options.contentType = "application/json; charset=utf-8" // content type of *request*
});

function swalGeneral(title, html, icon, extras) {
  let swal_config = {
    title: title,
    html: html,
    icon: icon,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "Închide",
    buttonsStyling: false,
    reverseButtons: true,
    customClass: {
      actions: 'gap-3',
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary'
      // denyButton: '...',
    },
  };

  Object.assign(swal_config, extras);

  return swal.fire(swal_config);
}

function makeMulti(selector) {
  $(selector).multi({
    non_selected_header: 'Opțiuni disponibile',
    selected_header: 'Opțiuni selectate',
    enable_search: true,
    search_placeholder: 'Caută'
  });

}

function getTitle() {
  return app.appName + ' - ' + $('.page-title').clone().children().remove().end().text().trim()
  // == ''
  //     ? '' : ' - ' + $('.page-title').clone().children().remove().end().text());
}

function loading() {
  $('#idLoading').toggle();
  $("#imgLoading").toggle();
  $("#c-maskUpload").toggleClass('is-active');
}

function startLoading() {
  $('#idLoading').show();
  $("#imgLoading").show();
  $("#c-maskUpload").addClass('is-active');
}

function stopLoading() {
  $('#idLoading').hide();
  $("#imgLoading").hide();
  $("#c-maskUpload").removeClass('is-active');
}

async function getLocalitati(ctrl, select, localitate) {
  localitate = localitate || app.defLoc;
  let select_var = '';
  if (select == '') {
    select_var = $(ctrl).closest('.location-point').find('.select-localitate');
  } else {
    select_var = $('#' + select);
  }
  let region = $(ctrl).val() || 0;
  let tmp = 0;
  await $.ajax({
    type: "GET",
    url: `api/noms/regions/${region}/localities`,
    dataType: "json",
    success: function (response) {
      select_var.find('option:not(:first-child)').remove();
      $(response).each(function () {
        var o = new Option(this.description + ' - ' + this.locality_type,
            this.id);
        /// jquerify the DOM object 'o' so we can use the html method
        $(o).html(this.description + ' - ' + this.localityType);
        select_var.append(o);
        //console.log(this.cod);

      });

      if (localitate != '') {
        select_var.val(localitate);
      }
      if (select_var.val() == null) {
        select_var.val(0);
      }
      tmp = 1
      let optionsData = response.map(function (item) {
        return {
          value: item.id,
          label: `${item.description} - ${item.localityType}`
        };
      });
      if (select_var.is(':visible')) {
        initVirtualSelect(select_var[0], optionsData, 'Selectează localitatea', true);
      }
    }
  });

  return tmp;
}

$(document).on('focus', '.new-input', function () {
  setFocus(true);
});
$(document).on('blur', '.new-input', function () {
  setFocus(false);
});

function setFocus(on) {
  var element = document.activeElement;
  if (on) {
    setTimeout(function () {
      element.parentNode.classList.add("focus");
    });
  } else {
    let box = $(".input-box");
    box.removeClass("focus");
    $(".new-input").each(function () {
      var $input = $(this);
      var $parent = $input.closest(".input-box");
      if ($input.val()) {
        $parent.addClass("focus");
      } else {
        $parent.removeClass("focus");
      }
    });
  }
}

function validateForm(id) {
  var verificare = true;
  var campObligatoriu = "";
  const campOblTxt = 'Câmp obligatoriu';
  const campOblLabel = `<span class="campOblLabel"> - ${campOblTxt}</span>`;
  id = id == null ? '' : '#' + id;
  $(id + ' .campObl:not(div)').removeClass('borderRequire');
  $(id + ' .campObl:not(div)').each(function () {
    var def = $(this).hasClass('select-localitate') ? '0' : '';
    if ($(this).is('select')) {
      if ($(this).siblings().hasClass('label-obl')) {
        $(this).siblings().find('.campOblLabel').remove();
      }
    }
    if (($(this).val() == def) || ($(this).val() == '__/__/____') || ($(
        this).hasClass('integer') && (Math.floor($(this).val()) != $(this).val()
        || $(this).val() < 0))) {
      verificare = false;
      $('input[type="date"]').prop('type', 'text');
      $('[data-id="' + $(this).attr('id') + '"]').addClass("campObl borderRequire");
      if ($(this).is('input')) {
        $(this).attr('placeholder', campOblTxt)
      } else if ($(this).is('select')) {
        $(this).siblings()
            .append(campOblLabel)
            .addClass('label-obl');
      }
      $(this).closest('.input-box').addClass("active-grey")
      if ($(this).hasClass('integer')) {
        $(this).val('');
      }
      if ($(this).data("name") != undefined) {
        campObligatoriu += "<div>-" + $(this).data("name") + "</div>";
      }
    } else {
      $(this).removeClass("borderRequire");
    }
  });
  if (!verificare) {
    var message = `<div>
            <div style="text-align: center">
            Completați câmpurile obligatorii<br /> pentru a continua<br /></div>
            <!--<div class='block' style="padding-left: 30px;">${campObligatoriu}</div>-->
        </div>`;
    // swalGeneral("", message, "warning")
    toastGeneral(message, 'warning')
        .then(function () {
          $('.borderRequire').first().focus();
        });
  }

  return verificare;
}

function validateEmail(el) {
  let mail = $(el).val();
  let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

  if (re.test(mail)) {
    return true;
  } else {
    $(el)
        .attr("placeholder", "Email incorect")
        .val("")
        .parent().addClass('active-grey');

  }

  //   return re.test(mail);
}

function buildFilter(field, operator, value, values = []) {
  let filter = {
    field: field,
    operator: operator,
    value: value,
    values: values
  };
  return filter;
}

function aceeasi_adresa(crtCheck) {
  $(crtCheck).closest('.location-point').find('[data-source]').each(
      function () {
        let $this = $(this);
        if (crtCheck.checked) {
          let source = $this.data('source');
          $this.val($(source).val());
        }
      })
  setFocus(false);
}

$(document).on('change', '#judet_id_change', function () {

  if ($('#judet_id_change').val() != 4) {
    $('.label-crtCheck').hide();
  } else {
    $('.label-crtCheck').show();
  }
})

function aceeasi_adr_wrap() {
  let check = $('#same_addr_2')[0];

  if (check != null) {
    if (check.checked) {
      aceeasi_adresa(check);
    }
  }

}

function showLoggedUser() {
  let loggedUser = $('#loggedUserId');
  loggedUser.show();
}

function hideLoggedUser() {
  let loggedUser = $('#loggedUserId');
  loggedUser.hide();
}

// $("#sidebarCollapse").on("click", function () {
//     if ($(window).width() < 600) {
//         if ($("#sidebar").hasClass("active")) {
//             setTimeout(showLoggedUser, 150);
//             $('.dropdown-info').css('left', '0');
//         } else {
//             setTimeout(hideLoggedUser, 10);
//             $('.dropdown-info').css('left', 'calc(0% - 124px)');
//         }
//     }
// })

function vizualizareImagine(id) {
  window.open(`collect/downloadDoc/${id}`);
}

function doGetHtml(url, data, headers, extras) {
  return doAjax(url, "GET", data, headers, "html", extras);
}

function doGetJson(url, data, headers, extras) {
  return doAjax(url, "GET", data, headers, "json", extras);
}

function doPostHtml(url, data, headers, extras) {
  return doAjax(url, "POST", data, headers, "html", extras);
}

function doPostJson(url, data, headers, extras) {
  return doAjax(url, "POST", data, headers, "json", extras);
}

function doPutHtml(url, data, headers, extras) {
  return doAjax(url, "PUT", data, headers, "html", extras);
}

function doPutJson(url, data, headers, extras) {
  return doAjax(url, "PUT", data, headers, "json", extras);
}

function doAjax(url, method, data, headers, dataType, extras) {
  let ajax_config = {
    type: method,
    url: url,
    data: data,
    headers: headers,
    dataType: dataType
  };

  Object.assign(ajax_config, extras);

  return $.ajax(ajax_config);
}