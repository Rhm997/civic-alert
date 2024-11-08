$(document).on('change', '#strada_cautare, #numar_cautare, #bloc_cautare',
    function () {
      let validare_conex = app.configs_app.validare_conex.value == 'true';
      if (validare_conex) {
        populeazaLocuriParcare();
      }
    });

function plataCerere() {
  let identificator = $("#modif_plata_identificator").val() || "";
  //let nrMasina = $("#modif_plata_nr_masina").val().toUpperCase().replace(/[^a-zA-Z0-9]/g, '') || '';
  if (identificator != "") {
    $('#codGresit').hide();
    app.identificatorPlata = identificator;
    app.dacaReincarc = null;
    let mySRC = "";
    showLoading();
    verificaPlata(app.identificatorPlata, 0);
  } else {
    $('#codGresit').show();
  }
  //verificaMutaCerereMobile(willDelete);
}

function verificaPlata(identificator, incercare) {
  let stopLoading = true;
  $.ajax({
    type: "POST",
    url: app.contextPath + "/documenteController/getTicketID_identificator",
    global: false,
    data: {
      "ftoken": Cookies.get('ftoken'),
      "id": identificator,
      "tip": ""
    },
    success: function (response) {
      content_plata = "";
      //daca locul nu a fost platit
      myNumberID = response.orderId;
      app.newRowInTichete = response.orderId;
      app.id_parcare = response.id_parcare;
      let booleanOkVerificaPlata = false;

      if (response.orderId != 0 && response.statusPlata != "confirmed") {

        if (response.orderId != 0 && response.orderId != undefined) {
          stopLoading = false;
          content_plata += "<div style=\"overflow: none;heigh: 100%;\" align=\"center\">"
              +
              "<div style=\"overflow: auto; height:100%;\">" +
              " <div id='mesajPlataNetopia'><label>Procesare ... </label></dv>";
          content_plata += "    </div>" + "  </div>";
          $.ajax({
            type: "GET",
            url: app.contextPath + "/paymentController/initPay",
            global: false,
            data: {
              "ftoken": Cookies.get('ftoken'),
              "orderNumber": myNumberID
            },
            success: function (response) {
              if (response.formurl != null) {
                mySRC = response.formurl;

                mySRC = response.formurl;
                window.open(mySRC, "_self");
                content_plata += "<div style=\"overflow: none;heigh: 100%;\" align=\"center\">"
                    +
                    "<div style=\"overflow: auto; height:100%;\">" +
                    " <div id='mesajPlataNetopia'><label>Urmează să fiți redirectionați către plată </label></dv>";
                content_plata += "    </div>" + "  </div>";
                booleanOkVerificaPlata = true;
              } else {//NU IMI RETURNEAZA BT
                if (response.errMsg
                    == "comanda cu order number specificat este deja procesata"
                    && incercare < 5) {

                  content_plata += "<div style=\"overflow: none;heigh: 100%;\" align=\"center\">"
                      +
                      "<div style=\"overflow: auto; height:100%;\">" +
                      " <div id='mesajPlataNetopia'><label>Procesare ... </label></dv>";
                  content_plata += "    </div>" + "  </div>";
                  verificaPlata(identificator, nrMasina, incercare + 1);
                  return;
                  //app.dacaReincarc = "testReincarcare();";
                } else {
                  content_plata += "<div style=\"overflow: none;height: 100%;\" align=\"center\">"
                      +
                      "<div style=\"overflow: auto; height:100%;\">" +
                      "<label>Eroare de sistem, reincercati mai tarziu.</label>";
                  content_plata += "  </div>" + "  </div>";
                  swalGeneral("", content_plata, "warning");
                }
              }
            },
            complete: function () {
              hideLoading();
            }
          });
        } else { //nu se poate face plata online!!
          content_plata += "<div style=\"overflow: none;height: 100%;\" align=\"center\">"
              +
              "<div style=\"overflow: auto; height:100%;\">" +
              "<label>Pentru acest loc de parcare nu puteti efectua plata.</label>"
              +
              "<label>Așteptați email-ul de atribuire.</label>";
          content_plata += "    </div>" + "  </div>";
          swalGeneral("", content_plata, "warning");
        }

      } else {
        content_plata += "<div style=\"overflow: auto; height:100%;\">" +
            "<label>Acest loc a fost platit.</label>" +
            "<label></label>";
        content_plata += "    </div>" + "  </div>";
        swalGeneral("", content_plata, "warning");
      }

      // document.getElementById("tabs4").innerHTML=content_plata;
      //  $("#btnPtrPr").hide(); $("#titluTab4").removeClass("disabledTab");
      // $("#titluTab1").addClass("disabledTab");$("#titluTab2").addClass("disabledTab");$("#titluTab3").addClass("disabledTab");
      //  activeazaTabActiv($("#titluTab4"),"tabs4","","#tabsParcari");
      // $("#divParcareUser")[0].style.zIndex = "103";
      ////  $("#divParcareUser").show();

      //  $("#c-mask").addClass('is-active');
      if (booleanOkVerificaPlata) {
        //  verificaStatusPlataNetopia(); //nu mai e cazul sa verific order number
      } else {

        //$("#mesajPlataNetopia").html("Tranzacția a fost efectuată cu succes!");
      }
    },
    complete: function () {
      if (stopLoading) {
        hideLoading();
      }
    }
    //end succes 1 ajax
  });
}

function flipCard(ctrl) {
  $(ctrl).closest('.flip-card').toggleClass('active');
}