function floordec(value, decimals) {

  return Number(Math.floor(value + 'e' + decimals) + 'e-' + decimals);

}

function validareCNPLive(id) {
  var cnp = document.getElementById(id).value;
  if (cnp.length == 13) {
    if (!validareCNP(id)) {
      swal({
        title: "",
        text: "CNP-ul nu este valid",
        icon: "warning",
        button: "Închide",
        dangerMode: true
      }).then(function () {
        $('#cnp').focus();
      });
      return;
    }
  }
}

function getTableColumns(id) {
  var colCount = 0;
  $('#' + id + ' tr:nth-child(1) th').each(function () {
    if ($(this).attr('colspan')) {
      colCount += +$(this).attr('colspan');
    } else {
      colCount++;
    }
  });
  return colCount;
}

function trimiteCodSemnare(tipDoc) {
  var codeSMS = $("#codeSMS").val();
  $.ajax({
    type: "POST",
    url: app.contextPath + "/testController/sendCodeSMS",
    data: {
      "ftoken": Cookies.get('ftoken'),
      "codeSMS": codeSMS,
      "idCerereCrt": app.idCerereCrt,
      "tipDoc": tipDoc
    },
    /* contentType: "application/json; charset=UTF-8", */
    success: function (response) {
      console.log("response", response);
      // $("#raspunsCertSIGN").html(str);
      $("#btnSemneaza").hide();
      // var str="<div align=\"center\">Ati semnat cu succes
      // documentul.<br/>";
      var str = "<a style=\"color:#188a15;\"  href='" + app.contextPath
          + "/testController/pdf" + "'>Descarcă document semnat</a></div>";
      var message = document.createElement('span');
      message.innerHTML = str;
      swal({
        title: "Ai semnat cu succes documentul!",
        content: message,
        icon: "info",
        button: "Vezi lista cereri",
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      }).then(function (willDelete) {
        if (willDelete) {
          openTotalCereri(app.live_cod_client_def)
        }
      });

    },
    error: function (textStatus, errorThrown) {
      console.log('Err', textStatus, errorThrown);
      console.log('textStatus', textStatus, errorThrown);
    }
  });
}

function incepeSemn() {
  $.ajax({
    type: "Get",
    url: app.contextPath + "/testController/initSignDoc",
    data: {
      "ftoken": Cookies.get('ftoken'),
      "id_user": app.liveUserId,
      "calePDF": app.calePdfDemontare
    },
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      $("#raspunsCertSIGN").css("visibility", "visible");
      $("#raspunsCertSIGN #codeSMS").focus();
    },
    error: function (textStatus, errorThrown) {
      console.log('Err2222', textStatus);
      console.log('Err2222', errorThrown);
    }
  });
  $("#raspunsCertSIGN").css("visibility", "visible");
  $("#raspunsCertSIGN #codeSMS").focus();

}

function valideazaObligatoriu(id) {
  var verificare = true;
  var campObligatoriu = "";
  id = id == null ? '' : '#' + id;
  $(id + ' .campObl:not(div)').removeClass('borderRequire');
  $(id + ' .campObl:not(div)').each(function () {
    var def = $(this).hasClass('select-localitate') ? '0' : '';

    if (($(this).val() == def) || ($(this).val() == '__/__/____') || ($(
        this).hasClass('integer') && (Math.floor($(this).val()) != $(this).val()
        || $(this).val() < 0))) {
      verificare = false;
      $(this).addClass("borderRequire");
      $('[data-id="' + $(this).attr('id') + '"]').addClass(
          "campObl borderRequire");
      $(this).attr('placeholder', 'Câmp obligatoriu');
      if ($(this).hasClass('integer')) {
        $(this).val('');
      }
      if ($(this).data("name") != undefined) {
        campObligatoriu += "-" + $(this).data("name") + "<br/>";
      }
    } else {
      $(this).removeClass("borderRequire");
    }
  });
  if (!verificare) {
    var mesaj = "<div>" +
        "<div align=\"center\">" +
        "Completați urmatoarele câmpuri pentru a continua:<br/></div>" +
        "<div align=\"left\" style=\"padding-left: 30px;\">" + campObligatoriu
        + "</div>" +
        "</div>";
    var message = document.createElement('span');
    message.innerHTML = mesaj;
    swal({
      title: "",
      content: message,
      icon: "warning",
      button: "Închide",
    }).then(function () {
      $('.borderRequire').first().focus();
    });
  }
  return verificare;
}

function mergePDF(type, data_azi) {
  if (type > 0) {
    var data = {
      wmtoken: Cookies.get('wmtoken'),
      data_start: data_azi,
      data_stop: data_azi,
      tip_client: type,
      conta_posta: 1
    };

    var url_params = $.param(data);
    window.open('reports/mergePDF?' + url_params, '_blank');
  }
}

function addDevice() {

  $.ajax({
    type: "GET",
    url: "wDevice/addDevice",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      $('#modal_div').html(response);
      $('#modal_add_edit_prod').modal('show');
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function formatDateAfisare(date, join) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [day, month, year].join(join);
}