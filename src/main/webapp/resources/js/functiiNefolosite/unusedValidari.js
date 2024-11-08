function checkIfMaiExistaNrMasina(nrMas_input, id_cerere) {
  if (($(nrMas_input).val() || '') == '') {
    return;
  }
  var nr_auto_formatat = $(nrMas_input).val().replace(/[^a-zA-Z0-9]/gi, '');//.replace(/\s/g, "").replace(/-/g, "");

  $(nrMas_input).val(nr_auto_formatat);
  var checkkIf = false;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/nomenclatorController/queryNrMasCerere",
    data: {
      "ftoken": Cookies.get('ftoken'),
      "nrMas": nr_auto_formatat
    },
    dataType: "json",
    success: function (response) {
      console.log("checkIfMaiExistaNrMasina =>", response);
      if (response["obj"] != "0" && response["obj"] != id_cerere) {
        checkkIf = true;
        $("#nr_masina").val("");
        swalGeneral("", "Mai există o solicitare cu acest număr de mașină", 'error');
      }
    }
  });
  insertLog(-1, '', '', 'Verificare nr masina', 1111, 'Mai există o solicitare cu acest număr de mașină. Nr masina:' + checkkIf);
  return checkkIf;
}

function checkIfMaiExistaCNP(cnp_input, id_cerere) {
  var checkkIf = false;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/nomenclatorController/queryCNP",
    data: {
      "cnp": $(cnp_input).val()
    },
    dataType: "json",
    success: async function (response) {
      console.log("checkIfMaiExistaCNP =>", response);
      //id_cerere = 0 pentru introducere si != 0 pentru modificare
      if (response.obj != "0" && response.obj != id_cerere) {
        checkkIf = true;
        $(cnp_input).val("");
        swalGeneral("", "Mai există o solicitare cu acest CNP\CUI", 'error');
      } else {
        var sold = await verificaSoldByCNP($(cnp_input).val());
        console.log("sold =>", sold);
        if (Number(sold) > 0) {
          swalGeneral("", "Pentru acest cnp există sold restant! Sold: " + sold, 'warning');
        }

      }
    }, complete: function () {
      insertLog(-1, '', '', 'Verificare cnp', 1111, 'Mai există o solicitare cu acest CNP. CNP:' + checkkIf);
    }
  });
  // return checkkIf;
}

async function verificaPerecheCNPBloc(cnp_input, bloc_input, label_dom_input) {
  if (($(cnp_input).val() || "") != "" && ($(bloc_input).val() || "") != "" && $(label_dom_input).is(':checked')) {
    let respVerificaCNPBloc = await verificaCNPBloc(document.getElementById("cnp").value, document.getElementById("bloc").value);
    if (!respVerificaCNPBloc) {
      swalGeneral("", "Nu există perechea CNP-Bloc", 'error');
      $("#bloc").val("");
    }
    return respVerificaCNPBloc;
  }
}

async function verificaPerecheCNPSasiu(cnp_input, serie_sasiu_input) {
  if (($(cnp_input).val() || "") != "" && ($(serie_sasiu_input).val() || "") != "") {
    await verificaCNPSasiuShowLoading(($(cnp_input).val() || ""), ($(serie_sasiu_input).val() || ""));
  }
}

function checkIfSaveParcare(obj) {
  $.ajax({
    type: "GET",
    url: app.contextPath + "/nomenclatorController/queryTipParcare",
    data: {
      "ftoken": Cookies.get('ftoken'),
      "obj": app.graphicEditare.attributes.OBJECTID
    },
    dataType: "json",
    success: function (response) {
      console.log("checkIfTipParcare =>", response);
      if (response.tip_parcare != 1 && response.tip_parcare != "10" && response.tip_parcare != "11" && response.tip_parcare != "12") {
        swalGeneral("", "Perioada de depunere a cererilor s-a încheiat. NU se mai pot face modificări!", "error");
        inchideDivParcare('divParcareUser');
        inchideDivParcare('', 'divCautaLocuri');
        inchideDivParcare('', 'divModificareCerere');
        inchideDivParcare('', 'divPrelungireCerere');
      } else {
        //campuri={};
        if (app.campuri == undefined) {
          app.campuri = {};
        }
        saveCerereParcare('inactiv', "tabsParcari");
      }
    }
  });
}

async function verificaCererLocDiz(locPrc) {
  var checkkIf = false;
  await $.ajax({
    type: "GET",
    async: false,
    url: app.contextPath + "/nomenclatorController/queryCereDiz",
    data: {
      "ftoken": Cookies.get('ftoken'),
      "locPrc": locPrc
    },
    dataType: "html",
    success: function (response) {
      console.log("checkIfMaiExistaCereDiz =>", response);
      var reaps = JSON.parse(response);
      if (reaps["obj"] != "0") {
        swalGeneral("", "Exista o cerere salvată pentru acest loc!", "error");
        checkkIf = true;
      }
    }
  });
  return checkkIf;
}

async function checkAdresaUnicaPerLoc(str, nr, bl, ap) {
  if (app.campuri == undefined) {
    app.campuri = {};
  }

  if (str != "" && nr != "" && bl != "" && ap != "") {
    var checkk = true;
    await $.ajax({
      type: "GET",
      url: app.contextPath + "/nomenclatorController/checkAdresaUnicaPerLoc",
      data: {
        strada: str,
        numar: nr,
        bloc: bl,
        ap: ap,
        id_cerere: app.campuri["OBJECTID"] || 0
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        console.log(app.campuri);
        //	if (response["info"]!=undefined && !isNaN(response["info"]) && response["info"]!=app.campuri["OBJECTID"]){
        if (response["info"] >= 2) {
          checkk = false;
        } else {
          checkk = true;
        }
      }
    });
  } else {
    checkk = true;
  }
  if (!checkk) {
    swalGeneral("", "Pe această adresă nu se mai pot depune cereri de rezervare!", "error", "da");
    //$("#strada").val("");
    //$("#bloc").val("");$("#apartament").val("");
  }
  return checkk;
}

function locDizabilitatiDisponibil(cod_zona) {
  var checkkIf = false;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/nomenclatorController/queryLocDiz",
    data: {
      "ftoken": Cookies.get('ftoken'),
      "codZona": cod_zona
    },
    dataType: "html",
    success: function (response) {
      console.log("locDizabilitatiDisponibil =>", response);
      var reaps = JSON.parse(response);
      if (reaps["nrLocDiz"] != "0") {
        checkkIf = true;
      }
    }
  });
  console.log("checkkIf::::", checkkIf);
  return checkkIf;
}