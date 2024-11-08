function pozitionareDivHelp() {
  $("#divHelp").toggle("fast");

  // $("#divHelp").css('right', ($(window).width()-$("#btnHelp").offset().left));
  //$("#divHelp").css('right', $("#btnHelp").width());
}

async function deschideSwalCautaLocuri(edit, editObj) {
  if (!await checkLocuriDisponibile()) {
    return;
  }

  insertLog(-1, '', '', 'Accesare loc parcare', 1106, '');

  $('#divCautaLocuri').modal('show');
  $("#c-mask").addClass('is-active');
  golesteFormular();

  populeazaLocuriParcare();

  //daca apare problema de diacritice trebuie adaugata o prop noua ex. search: val fara diacritice
  // si in option la searchField se adauga prop noua
  let sourceStrazi = [{id: '', text: 'Selectați strada'}].concat(app.listaStraziNom.map(function (x) {
    return {id: x, text: x}
  }));

  makeSelectize('#strada_cautare', sourceStrazi);

  $('#submit_cautare, #view_harta_cautare').unbind('click');

  $('#view_harta_cautare').on('click', function () {
    deschideHartaZona(false, edit);
  });

  if (edit == 1) {
    $('#title_cautare').text('Mutare loc de parcare');

    $('#submit_cautare').on('click', function () {
      sigurMutiCererea(editObj);
    });
  } else {
    $('#strada_cautare').prop('disabled', false);
    $('#numar_cautare').prop('readonly', false);
    $('#bloc_cautare').prop('readonly', false);
    $('#apartament_cautare').prop('readonly', false);
    $('#scara_cautare').prop('readonly', false);
    $('#etaj_cautare').prop('readonly', false);

    $('#title_cautare').text('Căutare loc de parcare');

    $('#submit_cautare').on('click', function () {
      depuneCerereParcare();
    });
  }

  if (app.ids === undefined) {
    app.ids = $("#divCautaLocuri input:not([type='radio']):not([class='faraCheck']:not([class='faraCheck1'])").map(function (i, el) {
      return $(el).attr('id');
    }).toArray();
    app.ids = app.ids.concat($("#divCautaLocuri select").map(function (i, el) {
      return $(el).attr('id');
    }).toArray());
  }

  if (app.idsTip === undefined) {
    app.idsTip = $("#divCautaLocuri input:not([type='radio']):not([class='faraCheck']:not([class='faraCheck1'])").map(function (i, el) {
      return "t";
    }).toArray();
    app.idsTip = app.idsTip.concat($("#divCautaLocuri input:not([type='radio']):not([class='faraCheck']:not([class='faraCheck1'])").map(function (i, el) {
      return "s";
    }).toArray());
  }
  if (app.check === undefined) {
    app.check = app.ids.map(function (x) {
      return 0;
    });
  }

  // $("#divCautaLocuri input:not([type='radio']):not(.faraCheck):not([class='faraCheck1'])").blur(function() {
  //     checkCampuri(this.id);
  // });
  // $("#divCautaLocuri select").blur(function() {
  //     checkCampuri(this.id);
  // });

}

async function deschideSwalModificaDate() {
  if (!await checkLocuriDisponibile()) {
    return;
  }

  $('#divModificareCerere').modal('show');
  golesteFormular();

  $('#title_modif_plata').text("Modificare loc parcare");

  $('#submit_modif_plata').unbind('click').text('Modifică');

  $('#submit_modif_plata').on('click', function () {
    verificaModificaDate();
  });
}

async function deschideSwalPrelungire() {
  $('#divPrelungireCerere').modal('show');
  golesteFormular();

  populeazaLocuriParcare('#prelungire_codZona', '#prelungire_nrLoc', 1);
}

async function deschideSwalMutaCerere() {
  if (!await checkLocuriDisponibile()) {
    return;
  }

  $('#divModificareCerere').modal('show');
  golesteFormular();

  $('#title_modif_plata').text("Mutare cerere parcare");

  $('#submit_modif_plata').unbind('click').text("Mută");

  $('#submit_modif_plata').on('click', function () {
    verificaMutaCerere();
  });
}

function deschideSwalPlataOnline() {
  insertLog(-1, '', '', 'Plata loc parcare', 1106, 'Buton: Plata solicitare.');
  $('#divModificareCerere').modal('show');
  golesteFormular();
  $('#codGresit').hide();
  $('#title_modif_plata').text('Plată loc parcare');

  $('#submit_modif_plata').unbind('click').text('Plătește');

  $('#submit_modif_plata').on('click', function () {
    plataCerere();
  });
}