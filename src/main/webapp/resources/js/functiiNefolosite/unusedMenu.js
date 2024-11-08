function openAddFactura(id_inv, is_storno) {
  var args = arguments;
  var caller = openAddFactura.caller.name;
  console.log("AAAAAAA" + is_storno);
  $.ajax({
    type: "GET",
    url: app.contextPath + "/winvoice/openAddFactura",
    data: {id_inv: id_inv, is_storno: is_storno},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      $('#selectDocPdf').trigger('change');
      makeDataPiker();
      $('.neEdit').prop('disabled', true);
      $('.neEdit').closest('.input-box').addClass('disabled');
      $('.deleteDoc').hide();
      setMenuPage('add_inv');
      if ($('#is_storno').val() == 1) {
        $('#client_facturare').trigger('change');
        calcAllTotal();
      }

    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }

  });
}

function serialSelect(value) {
  var args = arguments;
  var caller = serialSelect.caller.name;
  $.ajax({
    type: "POST",
    url: app.contextPath + "/winvoice/dataEmitereDate",
    data: {
      serial_value: value
    },
    success: function (response) {
      $("#data_emitere").val('');
      $("#data_emitere").attr({
        "min": response.datebyserial
      });

    }
  })

}

function openIncasare() {
  var callback = function () {
  };
  var args = arguments;
  if (typeof args[0] == 'function') {
    var callback = args[0];
    args[0] = '';
  }
  var caller = openIncasare.caller.name;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/winvoice/openIncasare",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      $('#selectDocPdf').trigger('change');
      makeDataPiker();
      $('.neEdit').prop('disabled', true);
      $('.neEdit').closest('.input-box').addClass('disabled');
      $('.deleteDoc').hide();
      setMenuPage('incasare');
      callback();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }

  });
}

function openViewFractiune(tip_contract) {
  var args = arguments;
  var caller = openViewFractiune.caller.name;
  $.ajax({
    type: "GET",
    url: "bin/openViewFraction",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('add_fractiune');
    },
    complete: function () {
      triggerPop();
    }

  });
}

function openViewCapacitate(tip_contract) {
  var args = arguments;
  var caller = openViewCapacitate.caller.name;
  $.ajax({
    type: "GET",
    url: "bin/openViewCapacity",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('add_capcacitate');

    },
    complete: function () {
      triggerPop();
    }

  });
}

function openViewTomberon() {
  var args = arguments;
  var caller = openViewTomberon.caller.name;
  $.ajax({
    type: "GET",
    url: "bin/openViewBin",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('add_tomberon');

    },
    complete: function () {
      triggerPop();
    }

  });
}

function openHelpDesk() {
  var args = arguments;
  var caller = openHelpDesk.caller.name;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/pages/paginaHelpDesk.jsp",
    data: {
      "ftoken": Cookies.get('ftoken')
    },
    dataType: "html",
    success: function (response) {
      console.log("response" + response);
      changeContent(response, args, caller);
      setMenuPage('help_desk');

    }
  });
}

function openForm(documentId) {
  var args = arguments;
  var caller = openForm.caller.name;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/testController/getFormValues",
    data: {
      "documentId": documentId
    },
    dataType: "html",
    cache: false,
    success: function (response2) {
      changeContent(response2, args, caller);
      setMenuPage('precomanda');
    }
  });
}

function openFaraModal() {
  $('#modalIframe').modal('hide');
  $("#modalIframe").on("hidden.bs.modal", function () {
    openChitante();
  });
}

function viewFacturi(only_table) {
  var args = arguments;
  var caller = viewFacturi.caller.name;

  app.filters.facturi.data_start = $('#dataStartI').length > 0 ? $(
      '#dataStartI').val() : app.filters.facturi.data_start; // app.f_d_month;
  app.filters.facturi.data_end = $('#dataEndI').length > 0 ? $(
      '#dataEndI').val() : app.filters.facturi.data_end; //app.curr_date;
  app.filters.facturi.tip_factura = $('#tip_factura').length > 0 ? $(
      '#tip_factura').val() : app.filters.facturi.tip_factura;
  app.filters.facturi.tip_client = $('#tip_client').length > 0 ? $(
      '#tip_client').val() : app.filters.facturi.tip_client;
  app.filters.facturi.tip_corespondenta = $('#tip_corespondenta').length > 0
      ? $('#tip_corespondenta').val() : app.filters.facturi.tip_corespondenta;
  var id_client = $('#id_client').length > 0 ? $('#id_client').val() : -1;
  var id_contract = $('#contract_colectare').length > 0 ? $(
      '#contract_colectare').val() : -2;
  app.filters.facturi.invoice_no = $('#invoice_no').length > 0 ? $(
      '#invoice_no').val() : app.filters.facturi.invoice_no;
  app.filters.facturi.serie = $('#serie_inv_f').length > 0 ? $(
      '#serie_inv_f').val() : app.filters.facturi.serie;
  app.filters.facturi.stare = $('#stare_f').length > 0 ? $('#stare_f').val()
      : app.filters.facturi.stare;

  //la view all invoices tre sa disablesc alea in curs de trimitere....
  $.ajax({
    type: "GET",
    url: "winvoice/viewAllInvoices",
    data: {
      data_start: only_table != 0 ? app.filters.def.facturi.data_start
          : app.filters.facturi.data_start,
      data_end: only_table != 0 ? app.filters.def.facturi.data_end
          : app.filters.facturi.data_end,
      tip_factura: only_table != 0 ? app.filters.def.facturi.tip_factura
          : app.filters.facturi.tip_factura,
      tip_client: only_table != 0 ? app.filters.def.facturi.tip_client
          : app.filters.facturi.tip_client,
      tip_corespondenta: only_table != 0
          ? app.filters.def.facturi.tip_corespondenta
          : app.filters.facturi.tip_corespondenta,
      id_client: id_client,
      id_contract: id_contract,
      id_payment: 0,
      only_table: only_table,
      invoice_no: only_table != 0 ? app.filters.def.facturi.invoice_no
          : app.filters.facturi.invoice_no,
      stare: only_table != 0 ? app.filters.def.facturi.stare
          : app.filters.facturi.stare,
      serie: only_table != 0 ? app.filters.def.facturi.serie
          : app.filters.facturi.serie,
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      if (only_table == 0) {
        changeContent(response, args, caller);
        setMenuPage('view_inv');
      }
      if (only_table == 1 || only_table == 3) {
        $('#facturiC_contract').html(
            id_contract > 0 || id_client > 0 ? response : '');
      }
      table = makeDataTable("table_facturi", 1);
      table1 = makeDataTable("table_incasari", 1);
      $('#dataStartI').val(app.filters.facturi.data_start);
      $('#dataEndI').val(app.filters.facturi.data_end);
      $('#tip_factura').val(app.filters.facturi.tip_factura);
      $('#tip_client').val(app.filters.facturi.tip_client);
      $('#tip_corespondenta').val(app.filters.facturi.tip_corespondenta);
      $('#invoice_no').val(app.filters.facturi.invoice_no);
      $('#stare_f').val(app.filters.facturi.stare);
      $('#serie_inv_f').val(app.filters.facturi.serie);
    },
    complete: function () {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
      }
      if (table1 != null) {
        table1.rows().nodes().to$().find(
            '[data-bs-toggle="tooltip"]').tooltip();
      }

      $('.dropdownMenu').on('show.bs.dropdown', function () {
        event.stopPropagation();
      })
    }
  });
}

function viewAllFacturi(only_table) {
  var args = arguments;
  var caller = viewAllFacturi.caller.name;
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());

  var i_data_start = $('#dataStartI').length > 0 ? $('#dataStartI').val()
      : app.f_d_month; // app.f_d_month;
  var i_data_end = $('#dataEndI').length > 0 ? $('#dataEndI').val()
      : app.curr_date; //app.curr_date;
  var tip_factura = $('#tip_factura').length > 0 ? $('#tip_factura').val() : -1;
  var tip_client = $('#tip_client').length > 0 ? $('#tip_client').val() : -1;
  var tip_corespondenta = $('#tip_corespondenta').length > 0 ? $(
      '#tip_corespondenta').val() : -1;
  var id_client = $('#id_client').length > 0 ? $('#id_client').val() : -1;
  var id_contract = $('#contract_colectare').length > 0 ? $(
      '#contract_colectare').val() : -2;
  var invoice_no = $('#invoice_no').length > 0 ? $('#invoice_no').val() : '';
  var serie = $('#serie_inv_f').length > 0 ? $('#serie_inv_f').val() : '';
  var stare = $('#stare_f').length > 0 ? $('#stare_f').val() : -1;

  $.ajax({
    type: "GET",
    url: "winvoice/viewAllInvoices",
    data: {
      data_start: i_data_start,
      data_end: i_data_end,
      tip_factura: tip_factura,
      tip_client: tip_client,
      tip_corespondenta: tip_corespondenta,
      id_client: id_client,
      id_contract: id_contract,
      id_payment: 0,
      only_table: only_table,
      invoice_no: invoice_no,
      stare: stare,
      serie: serie
    },
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'view_inv',
          '#table_facturi',
          "winvoice/getAllNrInvoices",
          {
            data_start: i_data_start,
            data_end: i_data_end,
            tip_factura: tip_factura,
            tip_client: tip_client,
            tip_corespondenta: tip_corespondenta,
            id_client: id_client,
            id_contract: id_contract,
            only_table: only_table,
            invoice_no: invoice_no,
            stare: stare,
            serie: serie
          },
          "GET",
          [2, "desc"],
          [{'data': 'serial'},
            {'data': 'inv_date'},
            {'data': 'total_amount_with_vat'},
            {'data': 'rest_plata'},
            {'data': 'client_name'},
            {'data': 'contract'},
            {'data': 'adresa'},
            {'data': 'description'},
            {
              "data": null,
              className: "dropdownMenu",
              render: function (data, type, row) {
                return '<a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#"> <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i> </a><ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"> <li  onclick="vizualizare_document('
                    + data["invoice_header_id"]
                    + ', 0) "><a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->" title="Editare"> Editare </a></li></ul></td>'
              },
              "targets": -1
            }
          ],
          vizualizare_document)

    },
    complete: function () {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
      }
      $('#dataStartI').val(i_data_start);
      $('#dataEndI').val(i_data_end);
      $('#tip_factura').val(tip_factura);
      $('#tip_client').val(tip_client);
      $('#tip_corespondenta').val(tip_corespondenta);
      $('#invoice_no').val(invoice_no);
      $('#stare_f').val(stare);
      $('#serie_inv_f').val(serie);

    }

  });
}

function viewChitante(only_table) {
  var args = arguments;
  var caller = viewChitante.caller.name;
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());

  var data_start = $('#dataStart').val() || app.curr_date;
  var data_stop = $('#dataEnd').val() || app.curr_date;
  var tip_factura = $('#tip_factura_c').val() || -1;
  var tip_incasare = $('#tip_incasare').val() || -1;
  var operator = $('#operator').val() || -1;
  var status = $('#status').val() || -1;
  var id_contract = $('#contract_colectare').val() || -1;
  var id_client = $('#id_client').val() || -1;
  var id_payment = $('#id_payment').val() || -1;

  $.ajax({
    type: "GET",
    url: "winvoice/getAllChitante",
    data: {
      data_start: data_start,
      data_stop: data_stop,
      tip_factura: tip_factura,
      tip_incasare: tip_incasare,
      operator: operator,
      status: status,
      id_contract: id_contract,
      id_client: id_client,
      id_payment: id_payment,
      only_table: only_table
    },
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'chitante',
          '#table_incasari',
          "winvoice/getAllNrChitante",
          {
            data_start: data_start,
            data_stop: data_stop,
            tip_factura: tip_factura,
            tip_incasare: tip_incasare,
            operator: operator,
            status: status,
            id_contract: id_contract,
            id_client: id_client,
            id_payment: id_payment,
            only_table: only_table
          },
          "GET",
          [2, "desc"],
          [{'data': 'referinta'},
            {'data': 'data_emitere'},
            {'data': 'amount'},
            {'data': 'client_name'},
            {'data': 'contract'},
            {'data': 'stare'},
            {'data': 'description1'},
            {
              "data": null,
              className: "dropdownMenu",
              render: function (data, type, row) {
                return '<a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#"> <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i> </a><ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"> <li  onclick="vizualizare_document('
                    + data["id"]
                    + ', 1) "><a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->" title="Editare"> Editare </a></li></ul></td>'
              },
              "targets": -1
            }
          ],
          vizualizare_document)

    },
    complete: function () {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
      }

    }

  });
}

function viewLocatii() {

  var id_contract = $('#contract_colectare').val() || 0;
  if (id_contract > 0) {
    id_contract = $(
        "#contract_colectare option[value='" + id_contract + "']").length > 0
        ? id_contract : 0;
  }

  if (id_contract > 0) {
    $.ajax({
      type: "POST",
      url: "winvoice/viewLocatii",
      data: {id_contract: id_contract},
      dataType: "json",
      cache: false,
      success: function (response) {
        // mai trebuie facut ceva inainte de for dar te las pe tine sa iti dai seama ce
        //alert(response);
        $('#locatie_c option:not(:first-child)').remove();
        //$('#locatie_c option').each(function(){
        //  if($(this).val()!= 0) $(this).remove();
        //});
        for (i = 0; i < response.length; i++) {
          opt = response[i];
          var option = '<option value="' + opt.id + '">' + opt.street
              + '</option>';
          $('#locatie_c').append(option);
        }
        // -> $('#select_locatie') // adaugare <option> returnat de ajax in <select> cu locatii

      },
      complete: function () {
        viewBin();
      }
    });
  }
}

function addColectare(contract) {
  var args = arguments;
  var caller = addColectare.caller.name;
  $.ajax({
    type: "GET",
    url: app.contextPath + "/winvoice/addColectare",
    data: {id_colectare: 0},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      if (typeof contract != "undefined" && contract != null) {
        $('#contract_colectare').val(contract).trigger('change');
      }
      makeDataPiker();
      setMenuPage('colectare');

    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }

  });
}

function openRapFactura() {
  var args = arguments;
  var caller = openRapFactura.caller.name;

  var data_start = $('#dataStartf').length > 0 ? $('#dataStartf').val()
      : app.f_d_month;
  var data_stop = $('#dataEndf').length > 0 ? $('#dataEndf').val()
      : app.curr_date;
  var tip_client = $('#tip_client_r').length > 0 ? $('#tip_client_r').val()
      : '';
  var tip_contract_id = $("#tip_contract_r").val() || -1;

  $.ajax({
    type: "POST",
    url: "reports/total_facturat",
    data: {
      data_start: data_start,
      data_stop: data_stop,
      tip_client: tip_client,
      tip_contract: tip_contract_id
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('total_facturat');
      makeDataTable("total_facturat", 1);
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openSoldRestant() {
  var args = arguments;
  var caller = openSoldRestant.caller.name;

  app.filters.sold_restant.data_start = $('#dataStartf').length > 0 ? $(
      '#dataStartf').val() : app.filters.sold_restant.data_start;
  app.filters.sold_restant.data_stop = $('#dataEndf').length > 0 ? $(
      '#dataEndf').val() : app.filters.sold_restant.data_stop;
  app.filters.sold_restant.tip_client = $('#tip_client_r').length > 0 ? $(
      '#tip_client_r').val() : app.filters.sold_restant.tip_client;

  $.ajax({
    type: "POST",
    url: "reports/sold_restant",
    data: {
      data_start: app.filters.sold_restant.data_start,
      data_stop: app.filters.sold_restant.data_stop,
      tip_client: app.filters.sold_restant.tip_client
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('sold_restant');
      makeDataTable('sold_restant', 1);
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openCantFacturata() {
  var args = arguments;
  var caller = openCantFacturata.caller.name;

  var data_start = $('#dataStartCantFact').length > 0 ? $(
      '#dataStartCantFact').val() : app.f_d_month;
  var data_stop = $('#dataEndCantFact').length > 0 ? $('#dataEndCantFact').val()
      : app.curr_date;
  var tip_client = $('#tip_client_CantFact').length > 0 ? $(
      '#tip_client_CantFact').val() : 0;
  var tip_contract_id = $("#coduri_client_contract").length > 0 ? $(
      '#coduri_client_contract').val() : 0;

  $.ajax({
    type: "POST",
    url: "reports/cantitate_facturata",
    data: {
      data_start: data_start,
      data_stop: data_stop,
      tip_client: tip_client,
      tip_contract_id: tip_contract_id
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('total_CantFact');
      makeDataTable("total_CantFact", 1);
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function getAllContracts(only_table) {
  var args = arguments;
  var caller = getAllContracts.caller.name;
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());

  var i_nume_solicitant = '';
  var i_cnp_solicitant = '';
  var k = 0;

  only_table = only_table || 0;

  var i_nume_solicitant = $('#nume_search_id').val() || '';
  var i_cnp_solicitant = $('#cnp_search_id').val() || '';
  var nr_contract = $('#nr_contract').val() || '';
  var adr_contract = $('#adr_contract').val() || '';
  var all_cts = $('#all_cts').length > 0 ? ($('#all_cts').is(':checked') ? 1
      : 0) : 0;
  var tip_contract_id = $("#coduri_client_contract").val() || 0;
  var stare_contract = $('#stare_contract').val() || '-1';
  var id_client = $('#id_client').val() || -1;
  var data_start_contract = $('#data_start_contract').val() || '';
  var data_end_contract = $('#data_end_contract').val() || '';

  $.ajax({
    type: "GET",
    url: "wcontract/listAllContracts",
    data: {
      nume_solicitant: i_nume_solicitant,
      cnp_solicitant: i_cnp_solicitant,
      nr_contract: nr_contract,
      all_cts: all_cts,
      adr_contract: adr_contract,
      tip_contract: tip_contract_id,
      stare_contract: stare_contract,
      id_client: id_client,
      only_table: only_table,
      data_start_contract: data_start_contract,
      data_end_contract: data_end_contract
    },
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'view_contracte',
          '#table_contracts',
          "wcontract/getAllContracts",
          {
            nume_solicitant: i_nume_solicitant,
            cnp_solicitant: i_cnp_solicitant,
            nr_contract: nr_contract,
            all_cts: all_cts,
            adr_contract: adr_contract,
            tip_contract: tip_contract_id,
            stare_contract: stare_contract,
            id_client: id_client,
            only_table: only_table,
            data_start_contract: data_start_contract,
            data_end_contract: data_end_contract
          },
          "GET",
          [2, "desc"],
          [{'data': 'solicitant'},
            {'data': 'tip'},
            {'data': 'contract_nr'},
            {'data': 'contract_date'},
            {'data': 'adr_contract'},
            {'data': 'stare'},
            {'data': 'operator'},
            {'data': 'id', visible: false},
            {'data': 'id', visible: false},
            {'data': 'id', visible: false},
            {'data': 'id', visible: false},
            {'data': 'id', visible: false},
            {
              "data": null,
              className: "dropdownMenu",
              render: function (data, type, row) {
                return '<a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#"> <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i> </a><ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"> <li  onclick="openContract('
                    + data["id"]
                    + ') "><a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->" title="Editare"> Vizualizare </a></li></ul></td>'
              },
              "targets": -1
            }
          ],
          openContract)
      if (stare_contract == 0 || stare_contract == 5) {
        $("#table_contracts").find('tbody').css("color", "#ff4c4c");
      }
      if (stare_contract == 2) {
        $("#table_contracts").find('tbody').css("opacity", "0.5");
      }

    },
    complete: function () {
      triggerPop();

      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
      }
      var table = $('#table_contracts').DataTable();
      $('#table_contracts tbody').on('click', 'tr', function () {
        console.log(table.row().data());
        var data = table.row(this).data();
        //response.stopPropagation();
        openContract(data["id"]);
      });

    }

  });
}

function openRapIntarziere() {
  var args = arguments;
  var caller = openRapIntarziere.caller.name;

  var data = $('#dataIntarziere').length > 0 ? $('#dataIntarziere').val()
      : app.curr_date;
  var startIntarziere = $('#startIntarziere').val() || '';
  var finalIntarziere = $('#finalIntarziere').val() || '';

  var tip_client = $('#tip_client').length > 0 ? $('#tip_client').val() : '';

  var stare_intarziere = $('#stare_intarziere').length > 0 ? $(
      '#stare_intarziere').val() : '-1';
  var activitate = $('#activitate_intarziere').length > 0 ? $(
      '#activitate_intarziere').val() : '-1';
  var tip_contract = $('#coduri_client_contract').length > 0 ? $(
      '#coduri_client_contract').val() : '-1';

  $.ajax({
    type: "POST",
    url: "reports/inatrzieri_plata",
    data: {
      data: data,
      startIntarziere: startIntarziere,
      finalIntarziere: finalIntarziere,
      tip_client: tip_client,
      stare_intarziere: stare_intarziere,
      activitate: activitate,
      tip_contract: tip_contract
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('inatrzieri_plata');
      var table = makeDataTable("inatrzieri_plata", 6);
      makeDataTable("inatrzieri_plata_detaliat", 3);

      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function getRapIntarziere() {
  var args = arguments;
  var caller = getRapIntarziere.caller.name;
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());

  var data = $('#dataIntarziere').length > 0 ? $('#dataIntarziere').val()
      : app.curr_date;
  var startIntarziere = $('#startIntarziere').val() || '';
  var finalIntarziere = $('#finalIntarziere').val() || '';

  var tip_client = $('#tip_client').length > 0 ? $('#tip_client').val() : '';

  var stare_intarziere = $('#stare_intarziere').length > 0 ? $(
      '#stare_intarziere').val() : '-1';
  var activitate = $('#activitate_intarziere').length > 0 ? $(
      '#activitate_intarziere').val() : '-1';

  $.ajax({
    type: "POST",
    url: "reports/inatrzieri_plata",
    data: {
      data: data,
      startIntarziere: startIntarziere,
      finalIntarziere: finalIntarziere,
      tip_client: tip_client,
      stare_intarziere: stare_intarziere,
      activitate: activitate
    },
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'inatrzieri_plata',
          '#inatrzieri_plata',
          "reports/getIntarzieriPlata",
          {
            data: data,
            startIntarziere: startIntarziere,
            finalIntarziere: finalIntarziere,
            tip_client: tip_client,
            stare_intarziere: stare_intarziere,
            activitate: activitate
          },
          "GET",
          [2, "desc"],
          [{'data': 'contract_nr'},
            {'data': 'client_name'},
            {'data': 'stare'},
            {'data': 'activitate'},
            {'data': 'id_type'},
            {'data': 'telefon'},
            {'data': 'zile_intarziere_plata'},
            {'data': 'adresa_f'},
            {'data': 'total_plata'},
            {'data': 'penalitati'},
            {
              "data": null,
              className: "dropdownMenu",
              render: function (data, type, row) {
                return '<a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#"> <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i> </a><ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"> <li  onclick="openViewExecutari('
                    + data["contract_nr"]
                    + ', 1) "><a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->" title="Editare"> Vizualizare executare </a></li></ul></td>'
              },
              "targets": -1
            }],
          openViewExecutari)

    },
    complete: function () {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
      }

    }

  });
}

function openRapIntarziereDetaliat(id_contract, ctrl, tip) {
  var args = arguments;
  var caller = openRapIntarziereDetaliat.caller.name;

  var data = $('#dataIntarziere').length > 0 ? $('#dataIntarziere').val()
      : app.curr_date;

  $.ajax({
    type: "POST",
    url: "reports/inatrzieri_plata_detaliat",
    data: {
      data: data, id_contract: id_contract,
      contract: $(ctrl).data('contract'),
      client: $(ctrl).data('client'),
      telefon: $(ctrl).data('tel'),
      tip: tip
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      if (tip == 1) {
        $('#modalAddExecutare .modal-body').html(response);
        $('#modalAddExecutare').modal('show');
        makeDataTable("modalAddExecutare #inatrzieri_plata_detaliat", 1);
      } else {
        $('#inatrzieri_plata').DataTable().rows().nodes().to$().removeClass(
            'active');
        $(ctrl).addClass('active');
        $('#intarzieriPlataDetaliat').html(response);
        makeDataTable("inatrzieri_plata_detaliat", 1);
      }
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

app.filters.contract_colectare = {
  data_start: '',
  data_end: ''

};

function openRapContractColectare() {
  var args = arguments;
  var caller = openRapContractColectare.caller.name;

  app.filters.contract_colectare.data_start = $('#dataStartcc').length > 0 ? $(
      '#dataStartcc').val() : app.filters.contract_colectare.data_start;
  app.filters.contract_colectare.data_end = $('#dataEndcc').length > 0 ? $(
      '#dataEndcc').val() : app.filters.contract_colectare.data_end;

  $.ajax({
    type: "POST",
    url: "reports/contracte_colectare",
    data: {
      data_start: app.filters.contract_colectare.data_start,
      data_end: app.filters.contract_colectare.data_end
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('contract_colectare');
      var table = makeDataTable("table_contract_colectare", 4);

      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openRapIncasari() {
  var args = arguments;
  var caller = openRapIncasari.caller.name;

  var data_start = $('#dataStarti').length > 0 ? $('#dataStarti').val()
      : app.f_d_month;
  var data_end = $('#dataEndi').length > 0 ? $('#dataEndi').val()
      : app.curr_date;

  $.ajax({
    type: "POST",
    url: "reports/raport_incasari",
    data: {data_start: data_start, data_end: data_end},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('raport_incasari');
      var table = makeDataTable("total_incasari", 3);

      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openRapNrPersoane() {
  var args = arguments;
  var caller = openRapNrPersoane.caller.name;

  app.filters.raport_nr_persoane.din_data = $('#dataStart_np').length > 0 ? $(
      '#dataStart_np').val() : app.filters.raport_nr_persoane.din_data;
  app.filters.raport_nr_persoane.pana_la_data = $('#dataEnd_np').length > 0 ? $(
      '#dataEnd_np').val() : app.filters.raport_nr_persoane.pana_la_data;
  app.filters.raport_nr_persoane.client_name = $('#nume_np').length > 0 ? $(
      '#nume_np').val() : app.filters.raport_nr_persoane.client_name;
  app.filters.raport_nr_persoane.contract_nr = $('#nr_contract_np').length > 0
      ? $('#nr_contract_np').val() : app.filters.raport_nr_persoane.contract_nr;
  app.filters.raport_nr_persoane.adresa_consum = $('#adresa_np').length > 0 ? $(
      '#adresa_np').val() : app.filters.raport_nr_persoane.adresa_consum;
  app.filters.raport_nr_persoane.stare_contract = $('#stare_contract_np').length
  > 0 ? $('#stare_contract_np').val()
      : app.filters.raport_nr_persoane.stare_contract;
  console.log("Test11" + app.filters.raport_nr_persoane.stare_contract);

  $.ajax({
    type: "POST",
    url: "reports/raport_nr_persoane",
    data: {
      numep: app.filters.raport_nr_persoane.client_name,
      nr_contractp: app.filters.raport_nr_persoane.contract_nr,
      adresap: app.filters.raport_nr_persoane.adresa_consum,
      stare_contract: app.filters.raport_nr_persoane.stare_contract,
      data_start: app.filters.raport_nr_persoane.din_data,
      data_stop: app.filters.raport_nr_persoane.pana_la_data

    },
    /*  dataType: "html",*/
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('raport_nr_persoane');
      var table = makeDataTable("total_nr_persoane", 3);
      /*makeDataTable("table_incasari", 1);*/
      $('#dataStart_np').data('value', app.filters.raport_nr_persoane.din_data);
      $('#dataEnd_np').data('value',
          app.filters.raport_nr_persoane.pana_la_data);
      $('#nume_np').val(app.filters.raport_nr_persoane.client_name);
      $('#nr_contract_np').val(app.filters.raport_nr_persoane.contract_nr);
      $('#adresa_np').val(app.filters.raport_nr_persoane.adresa_consum);
      $('#stare_contract_np').val(
          app.filters.raport_nr_persoane.stare_contract);

      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function viewRapNrPersoane() {
  var args = arguments;
  var caller = viewRapNrPersoane.caller.name;
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());

  var client_name = $('#nume_np').length > 0 ? $('#nume_np').val() : '';
  var contract_nr = $('#nr_contract_np').length > 0 ? $('#nr_contract_np').val()
      : '';
  var adresa_consum = $('#adresa_np').length > 0 ? $('#adresa_np').val() : '';
  var stare_contract = $('#stare_contract_np').val() || 1;
  var din_data = $('#dataStart_np').length > 0 ? $('#dataStart_np').val() : '';
  var pana_la_data = $('#dataEnd_np').length > 0 ? $('#dataEnd_np').val() : '';
  console.log("data stop = ", pana_la_data);
  console.log("data start = ", din_data);

  $.ajax({
    type: "GET",
    url: "reports/raport_nr_persoane",
    data: {
      numep: client_name,
      nr_contractp: contract_nr,
      adresap: adresa_consum,
      stare_contract: stare_contract,
      data_start: din_data,
      data_stop: pana_la_data
    },
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'raport_nr_persoane',
          '#total_nr_persoane',
          "reports/getAllRapNrPersoane",
          {
            numep: client_name,
            nr_contractp: contract_nr,
            adresap: adresa_consum,
            stare_contract: stare_contract,
            data_start: din_data,
            data_stop: pana_la_data
          },
          "GET",
          [2, "desc"],
          [{'data': 'contract_nr'},
            {'data': 'contract_date'},
            {'data': 'data_start'},
            {'data': 'stare'},
            {'data': 'client_name'},
            {'data': 'nr_pers_contract'},
            {'data': 'adresa_consum'},],
          viewPers)

    },
    complete: function () {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
      }

    }

  });
}

function openRapTaxaExpediere() {
  var args = arguments;
  var caller = openRapTaxaExpediere.caller.name;

  var client_name = $('#numet').length > 0 ? $('#numet').val() : '';
  var contract_nr = $('#nr_contractt').length > 0 ? $('#nr_contractt').val()
      : '';
  var adresa_consum = $('#adresat').length > 0 ? $('#adresat').val() : '';

  $.ajax({
    type: "POST",
    url: "reports/raport_taxa_exp",
    data: {
      numet: client_name,
      nr_contractt: contract_nr,
      adresat: adresa_consum
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('raport_taxa_exp');
      var table = makeDataTable("total_taxa_exp", 3);

      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

/*
function viewAllContracts() {
    var args = arguments;
    var caller = viewAllContracts.caller.name;
    var i_nume_solicitant = '';
    var i_cnp_solicitant = '';
    var k=0;

    var i_nume_solicitant = $('#nume_search_id').length > 0 ? $('#nume_search_id').val() : '';
    var i_cnp_solicitant = $('#cnp_search_id').length > 0 ? $('#cnp_search_id').val() : '';
    var nr_contract = $('#nr_contract').length > 0 ? $('#nr_contract').val() : '';
    var adr_contract = $('#adr_contract').length > 0 ? $('#adr_contract').val() : '';
    var all_cts = $('#all_cts').length > 0 ? ($('#all_cts').is(':checked') ? 1 : 0) : 0;
    var table = null;
    $.ajax({
        type : "GET",
        url : app.contextPath + "/wcontract/listAllContracts",
        data : {nume_solicitant: i_nume_solicitant, cnp_solicitant: i_cnp_solicitant, nr_contract:nr_contract, all_cts:all_cts, adr_contract: adr_contract},
        dataType : "html",
        cache : false,
        success : function(response) {
             var now = new Date();
             console.log("t0-all contracts:" + now.toUTCString());

             $('#totalContracte_2').hide();
             changeContent(response, args, caller);
             setMenuPage('view_contracte');

             var now = new Date();
             console.log("t01-all contracts:" + now.toUTCString());

             table = makeDataTable("table_contracts", 3);

             var now = new Date();
             console.log("t1-all contracts:" + now.toUTCString());

        },

        complete : function() {
            triggerPop();
            if(table != null){
                table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
                var now = new Date();
                console.log("t11-all contracts:" + now.toUTCString());
            }

        }

    });
}

*/
// org.blaj-salubritate.ro/products/getAllProd
// localhost:8080/wManagement/products/getAllProd
function openNomProduse() {
  var args = arguments;
  var caller = openNomProduse.caller.name;
  var stare = $("#stare_produs").val() || 1;
  $.ajax({
    type: "GET",
    url: "products/getAllProd",
    data: {stare: stare},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('nom_produse');
      var table = makeDataTable("table_products", 5);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openNomPersoane() {
  var args = arguments;
  var caller = openNomPersoane.caller.name;
  $.ajax({
    type: "GET",
    url: "products/getAllPers",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('nom_persoane');
      var table = makeDataTable("table_products", 5);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function viewAllPersoane() {
  var args = arguments;
  var caller = viewAllPersoane.caller.name;
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());
  $.ajax({
    type: "GET",
    url: app.contextPath + "/products/getAllPers",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'nom_persoane',
          '#table_persoane',
          app.contextPath + "/products/getAllPersList",
          {},
          "GET",
          [2, "desc"],
          [
            {'data': 'nume'},
            {'data': 'prenume'},
            {'data': 'adresa'},
            {'data': 'email'},
            {'data': 'nr_telefon'},
            {'data': 'STATUS'},
            {
              "data": null,
              className: "dropdownMenu",
              render: function (data, type, row) {
                return '<a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#"> <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i> </a><ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"> <li  onclick="openNomClienti(false,'
                    + data["id"]
                    + ') "><a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->" title="Editare"> Editare </a></li></ul></td>'
              },
              "targets": -1
            }
          ],
          viewPers)

    },
    complete: function () {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
      }

    }

  });
}

function viewAllClients() {
  var args = arguments;
  var caller = viewAllClients.caller.name;
  var numeClient = $('#numeSolicitantCE').val() || '';
  var id = "";
  var cnpClient = $('#cnpCE').val() || '';
  var adresaClient = $('#adrCE').val() || '';
  var adresaCorespondentaClient = $('#adrCoCE').val() || '';
  console.log("numeClient = ", numeClient);
  var table = null;
  var now = new Date();
  console.log("t0-all contracts:" + now.toUTCString());
  $.ajax({
    type: "GET",
    url: app.contextPath + "/wclient/getAllClients",
    data: {
      numeClient: numeClient,
      cnpClient: cnpClient,
      adresaClient: adresaClient,
      adresaCorespondentaClient: adresaCorespondentaClient,
      has_contracts: -1
    },
    dataType: "html",
    cache: false,
    success: function (response) {

      make_table_serverSide(response,
          args,
          caller,
          'nom_clienti',
          '#table_clients',
          app.contextPath + "/wclient/getAllClientsList",
          {
            numeClient: numeClient,
            cnpClient: cnpClient,
            adresaClient: adresaClient,
            adresaCorespondentaClient: adresaCorespondentaClient,
            has_contracts: -1
          },
          "GET",
          [2, "desc"],
          [
            {'data': 'client_name'},
            {'data': 'cnp_cui'},
            {'data': 'adresa'},
            {'data': 'adresa_corespondenta'},
            {'data': 'contracte'},
            {
              "data": null,
              className: "dropdownMenu",
              render: function (data, type, row) {
                console.log("data = ", data);
                console.log("type = ", type);
                console.log("arguments = ", arguments);

                $('.dropdownMenu').click(function (event) {
                  event.stopPropagation();
                  event.preventDefault();
                  $(this).find('[data-bs-toggle=\'dropdown\']').dropdown(
                      'toggle');
                });
                return '<a class="fs-6 dropdown-toggle-split"  data-bs-toggle="dropdown" href="#"> <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i> </a><ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"> <li id="btn_dropdown"  onclick="event.stopPropagation(); javascript:void(0); openNomClienti('
                    + data["id"]
                    + ', true);  "><a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->" title="Editare"> Editare </a></li></ul>';

              },
              "targets": -1
            }
          ],
          openNomClienti)

    },
    complete: function (response) {
      triggerPop();
      if (table != null) {
        table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
        var now = new Date();
        console.log("t11-all contracts:" + now.toUTCString());
        console.log("table: ", table.rows());

      }
      var table = $('#table_clients').DataTable();

      $('#totalClienti tbody').on('click', 'tr', function () {

        //console.log(table.row().data());
        var data = table.row(this).data();
        //response.stopPropagation();
        openNomClienti(data["id"]);

      });

    }

  });
}

function openNomPJ() {
  var args = arguments;
  var caller = openNomPJ.caller.name;
  $.ajax({
    type: "GET",
    url: "wclient/getAllClients",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('nom_pj');
      var table = makeDataTable("table_products", 5);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openNomExecutori() {
  var args = arguments;
  var caller = openNomExecutori.caller.name;
  $.ajax({
    type: "POST",
    url: "wclient/getClientsExecutor",
    data: {
      client: '',
      cnp: ''
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('nom_executori');
      var table = makeDataTable("table_executori", 5);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openDash(id_user) {
  var args = arguments;
  var caller = openDash.caller.name;
  console.log(caller);
  console.log("in viewPers");
  $.ajax({
    type: "POST",
    url: app.contextPath + "/user/getPersi",
    data: {
      "id_user": id_user
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('main');
      testD();
      var count = $("#gridDashboard > div").length;
      $("#count").append(
          "<span> " + "<span class=" + "header-text-dash" + ">" + count
          + "</span>" + " / " + "10 " + "Cadrane </span>");
    },
    complete: function () {
      triggerPop();
    }

  });
}

function openRegistruCasa() {
  var args = arguments;
  var caller = openRegistruCasa.caller.name;
  $.ajax({
    type: "POST",
    url: "reports/openRegistruCasa",
    data: {
      data: $('#data_registru').val() || app.curr_date
      //tip_act : $('#tip_act_registru').val() || '',
      //nr_anexa : $('#nr_anexa_registru').val() || ''
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('view_devices');
      var table = makeDataTable("tabel_registru_casa", 1);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }

  });
}

function genereazaRegistruCasa() {
  $.ajax({
    type: "POST",
    url: "reports/genereazaRegistruCasa",
    data: {
      data: $('#data_registru').val() || app.curr_date
      //tip_act : $('#tip_act_registru').val() || '',
      //nr_anexa : $('#nr_anexa_registru').val() || ''
    },
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('view_devices');
      var table = makeDataTable("tabel_registru_casa", 1);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }

  });
}

function openRapPlatiInAvans() {
  var args = arguments;
  var caller = openRapPlatiInAvans.caller.name;

  var data_start = $('#dataStarti').length > 0 ? $('#dataStarti').val()
      : app.f_d_month;
  var data_end = $('#dataEndi').length > 0 ? $('#dataEndi').val()
      : app.curr_date;

  $.ajax({
    type: "GET",
    url: "reports/raport_plati_in_avans",
    data: {data_start: data_start, data_end: data_end},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('raport_plati_in_avans');
      var table = makeDataTable("total_incasari", 3);

      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker(
          {style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}