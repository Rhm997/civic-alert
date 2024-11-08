function saveContract(type, editMode) {
  let contract = {};

  let locations = [];

  if (($('#uatSelect').val() || $('[data-key="idUat"]').val()) == '') {
    // swalGeneral('', 'Selectați UAT-ul pentru care doriți adăugarea rolului!', 'warning').then(function () {
    //   $('[data-key="idUat"]').focus()
    // });
    toastGeneral('Selectați UAT-ul pentru care doriți adăugarea rolului!', 'warning');

    return false;
  }
  if (!validateForm('contractPF')) {
    return false;
  }

  buildContract(contract, locations);

  if (editMode == 1) {
    updateContract(contract);
  } else if (editMode == 0) {
    insertContract(contract);
  }
}

function updateContract(contract) {
  $.ajax({
    type: "PUT",
    url: "api/contracts",
    data: JSON.stringify([contract]),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      toastGeneral("Salvarea a fost realizată cu succes!", 'success');
      openContract(contract.id);
    }
  });
}


function insertContract(contract) {
  $.ajax({
    type: "POST",
    url: "api/contracts",
    data: JSON.stringify(contract),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      openContract(response);
    },
    error: function (xhr, ajaxOptions, response) {
      swalGeneral('Atenție',
          xhr.responseJSON.message || 'A apărut o problemă!',
          'warning',)
      focusOnIncorrectField();
    }
  });
}

function buildContract(contract, locations) {
  // contractData = {contract : {}, client: {}, user: {}, }
  //alta sectiune cu alt obiect in contract....- corespondence....- insert, update, load..
  let dataCategory = $('[data-category]');
  dataCategory.each(function () {
    switch ($(this).data('category')) {
        //la nivel de contract ar trebui sa avem si numarul de persoane!!!
      case 'contract': {
        contract[$(this).data('key')] = $(this).data('value') || $(this).val();
        break;
      }
      case 'client': {
        client[$(this).data('key')] = $(this).val();
        break;
      }
      case 'user': {
        user[$(this).data('key')] = $(this).data('value') || $(this).val();
        break;
      }
      case 'location_points': {
        locations.push(buildLocationPoints($(this)));
        break;
      }
        /*case 'location_points_contract':{
            location_points.push(buildLocationsContract($(this)));
            break;
        }*/

      case 'infos': {
        extra_infos[$(this).data('key')] = $(this).data('key').trim()
        == 'loc_corespondenta' ? ($(this).val() != '' ? $(this).val() : 40) : $(
            this).val();
        client[$(this).data('key')] = $(this).data('key').trim()
        == 'loc_corespondenta' ? ($(this).val() != '' ? $(this).val() : 40) : $(
            this).val();
        break;

      }

      case 'invtypes': {
        inv_type[$(this).data('key')] = $(this).val();
        break;
      }

    }

  });

  contract.locations = locations;
  contract.idRegion = $('#judet_id_change').val();
  contract.idCity = $('#uatSolicitant').val();
  contract.idUat = $('#uatSelect').val() || $('[data-key="idUat"]').val();

}

function buildLocationPoints(location_point) {
  let bins = [];
  let location_p = {};
  //location_p["loc_type"]=1;
  location_point.find('[data-sub-category="location_point"]').each(function () {
    switch (this.type) {
      case 'radio':
      case 'checkbox': {
        if ($(this).is(':checked')) {
          location_p[$(this).data('key')] = $(this).val();
        }
        break
      }
      default:
        location_p[$(this).data('key')] = $(this).val();
    }
  });
  location_point.find('[data-sub-category="bin"]').each(function () {
    bins.push(buildBins($(this)));
  });

  location_p.bins = bins;
  location_p.idRegion = location_point.find('.select-judet').val();
  location_p.idCity = location_point.find('.select-localitate').val();

  return location_p;
}

function buildBins(bin) {
  let bin_el = {};
  bin.find('[data-sub-category="bin_element"]').each(function () {
    bin_el[$(this).data('key')] = $(this).val();
  });
  bin_el.active = bin.closest('.location-point').find('[data-key="active"]').is(
      ':checked') ? 1 : 0;
  if (bin_el.rfId || '' == '') {
    bin_el.rfId = bin_el.barCode;
  }

  return bin_el;
}

//@todo idee - pt incarcare/ editare de doc- fac request catre load contract- pe response- de chemat in for addLocationPoint(cu param)
function addLocationPoint() {
  let tip_contract = $('#tip_contract').val();
  $.ajax({
    type: "GET",
    url: "contracts/addLocationPoint",
    data: {tip_contract: tip_contract},
    dataType: "html",
    cache: false,
    success: function (response) {
      $('.location-points').append(response);
      let select_var = $('.location-points').find('.location-point:last-child').find('.select-judet');
      select_var.val(app.defJud).trigger('change');
      initVirtualSelect(select_var[0], '', 'Selectează localitatea', false);
      $(select_var[0]).change(function () {
        getLocalitati(this, 'localitate', '${contract.idCity }');
      });
    }
  });
}

//@todo idee - pt incarcare/ editare de doc- fac request catre load contract- pe response- de chemat in for addLocationPoint si pt fiecare location,
function addBin(button) {
  $.ajax({
    type: "GET",
    url: "contracts/addBin",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      $(button).closest('.location-point').find('.test-bins').find('.bins-subtitle').show();
      $(button).parents('.location-point').find('.bins').append(
          response);
      $('.location-tab').addClass('pb-2');
    }
  });
}

function deleteBin(button) {
  let html = "Sigur doriți să ștergeți această pubelă?";
  swalGeneral("Atenție", html, "warning",
      {
        showConfirmButton: true,
        confirmButtonText: 'Da',
        cancelButtonText: 'Nu',
        dangerMode: true
      }
  ).then((result) => {
    if (result.isConfirmed) {
      if ($(button).closest('.bins').find('.bin').length === 1) {
        $(button).closest('.bins').siblings().hide();
      }
      $(button).parents('.bin').remove();
    }
    $('.location-tab').removeClass('pb-2');
  })
}

$(document).on('mouseover', '.delete-location', function () {
  setTimeout(() => {
    $(this).text('').text('Șterge locație');
  }, 150)
})

$(document).on('mouseleave', '.delete-location', function () {
  setTimeout(() => {
    $(this).html('').html('<i class="fa-solid fa-trash"></i>');
  }, 200)
})

$(document).on('mouseover', '.delete-bin-text', function () {
  setTimeout(() => {
    $(this).text('').text('Șterge pubelă');
  }, 150)
})

$(document).on('mouseleave', '.delete-bin-text', function () {
  setTimeout(() => {
    $(this).html('').html('<i class="fa-solid fa-trash"></i>');
  }, 150)
})

function deleteLocationContractPoint(location_point) {
  let html = "O dată cu ștergerea locației, vor fi șterse și pubelele asociate cu aceasta. <br/><br/>Sigur doriți să ștergeți locația?";
  swalGeneral("Atenție", html, "warning",
      {
        showConfirmButton: true,
        confirmButtonText: 'Da',
        cancelButtonText: 'Nu',
        dangerMode: true
      }
  ).then((result) => {
    if (result.isConfirmed) {
      $(location_point).parents('.location-point').remove();
    }
  })
}

function openBinMap(is_all, bar_code) {
  let url = "";
  // if (is_all) {

  $.ajax({
    type: "GET",
    url: "map/getBinMap/" + (is_all ? "1" : "'" + bar_code + "'"),
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      $("#div_map .for-map").html(response);
      $("#modal_map").modal('show');

      $("#c-mask").addClass('is-active');
    }
  });
  //   url = app.contextPath + `/resources/${app.appFolder}/harta/harta.jsp`;
  // } else {
  //   url = app.contextPath
  //       + `/resources/${app.appFolder}/harta/harta_bin.jsp?cond='${bar_code}'`;
  // }
  // window.open(url);
  // $("#div_map .for-map").html(
  //     `<iframe class="h-100 w-100" id="map-iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${url}"></iframe>`);
  // $("#modal_map").modal('show');
  //
  // $("#c-mask").addClass('is-active');
}

function check_nr_contract(ctrl, nrDoc) {
  //console.warn(nrRolValue);
  if (($('#uatSelect').val() || $('[data-key="idUat"]').val()) == '') {
    swalGeneral("", "Selectați UAT-ul pentru a continua!", 'warning');
    $(ctrl).val("");
    return;
  }
  $.ajax({
    type: "GET",
    url: "api/contracts/nrRol/availability",
    data: {nrRol: $(ctrl).val(), idUat: $('#uatSelect').val() || $('[data-key="idUat"]').val()},
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      if (response === true) {
        swalGeneral('Atenție',
            `Există deja un contract activ cu Nr. identificare: ${nrRolValue}`,
            'warning').then(function () {
          focusOnIncorrectField();
        })
      } else {
        return;
      }
    }
  });

  //console.warn(nrDoc);
}

function check_bar_code(barCode, id, idUat) {
  let nrRol = $("#nrContract").val();
  console.log(idUat + " ID UAT");
  $.ajax({
    type: "GET",
    url: `api/bins/${barCode}/existsInUat`,
    data: {id: id, idUat: idUat},
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      if (response === true) {
        swalGeneral('Atentie',
            `Există deja un contract activ cu Cod pubela: ${barCode}`,
            'warning').then(function () {
          focusOnIncorrectField();
        })
      } else {
        return;
      }
    }
  });

  //console.warn(nrDoc);
}

function focusOnIncorrectField() {
  let nrRol = $('#addContractForm #nrContract');
  $(nrRol).closest('.input-box').addClass("focus active-grey")
  $(nrRol).val('')
      .attr('placeholder', 'Introduceți un nou nr. de identificare')
      .focus();
}

