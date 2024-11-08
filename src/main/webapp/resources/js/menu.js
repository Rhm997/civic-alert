/*var name=localStorage.getItem("languageIndexPage");
alert("limba trimisa in menu.js este: "+ name);*/
var lang = '';
app.selected_uat = '';

function logout() {
  window.location.href = app.contextPath;
  Cookies.remove('wstToken');
  Cookies.remove('wstRoles');
  Cookies.remove('wstGroups');
  Cookies.remove('wstEmail');
  Cookies.remove('wstFullName');
  Cookies.remove('wstUsername');
}

function mainpage() {
  var token = Cookies.get('wmtoken');
  language = $('#lang_id').data('lang');

  if (language != null) {
    lang = "&language=" + language;
  }
  var crtUrl = app.contextPath + "/main";
  loading();
  window.location.href = crtUrl;
  setMenuPage('main');
}

function openDash() {
  let args = arguments;
  let caller = openDash.caller.name;
  $.get("firstPage").done(function (response) {
    changeContent(response, args, caller);
  })
}

function changeContent(content, args, caller, page = '') {
  $('#container').html(content);
  makeDataPiker();
  makeDataRangePicker();
  // if (typeof args !== "undefined" && caller !== "loadFromHistory") {
  //   var parameters = [];
  //   for (var i = 0; i < args.length; i++) {
  //     parameters.push(args[i]);
  //   }
  //   history.pushState({
  //     'args': '',//args.callee.name, // deprecated
  //     'parameters': parameters
  //   }, '', '#' + "");//args.callee.name);
  //   $(".tooltip").remove();
  //   // history.pushState({ }, '', '#'+args.callee.name);
  //   // args.callee(args);
  // }
  if (typeof args !== "undefined" && caller !== "loadFromHistory" && page != '') {
    var parameters = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i].currentTarget || '' != '') {
        if (args[i].currentTarget.dataset.page || '' != '') {
          parameters.push(args[i].currentTarget.dataset.page);
        }
      } else {
        parameters.push(args[i]);
      }
    }

    history.pushState({
      'args': page, 'parameters': parameters
    }, '', '#' + page + parameters[0]);//args.callee.name);
    $(".tooltip").remove();
  }
}





function changeCrtContent(content, args, caller, page = '', containerbyid) {
  $("#" + containerbyid).html(content);
  
  
  /*if (typeof args !== "undefined" && caller !== "loadFromHistory" && page != '') {
    var parameters = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i].currentTarget || '' != '') {
        if (args[i].currentTarget.dataset.page || '' != '') {
          parameters.push(args[i].currentTarget.dataset.page);
        }
      } else {
        parameters.push(args[i]);
      }
    }

    history.pushState({
      'args': page, 'parameters': parameters
    }, '', '#' + page + parameters[0]);//args.callee.name);
    $(".tooltip").remove();
  }*/
}



$(document).on('change', '#uatSelect', function () {
  app.selected_uat = $(this).val();
  //TODO de facut apel la functia de filtrare
  $('.btn-filters').trigger('click');
  getUatText();
});

function getUatText() {
  $('#selected_uat_text').text(' - ' + $('#uatSelect option:selected').text());
}

function setFilters(filters, container = '') {
  filters.forEach(function (el) {
    //pentru datarangepicker
    // if ($(container + ` [data-filter="${el.field}"]`).hasClass('daterange')) {
    //   let new_data = moment(el.value, 'YYYY-MM-DD HH:mm').format('DD.MM.YYYY HH:mm');
    //   $(container + ` [data-filter="${el.field}"]`).val(new_data);
    //   $(container + ` [data-filter="${el.field}"]`).data('daterangepicker').setStartDate(new_data);
    //   $(container + ` [data-filter="${el.field}"]`).data('daterangepicker').setEndDate(new_data);
    //   $(container + ` [data-filter="${el.field}"]`).data('value', el.value);
    // }
    if (el.field == 'idUat' || el.field == 'groups') {
      $(`[data-filter="${el.field}"]`).val(el.value);
    } else if ($(container + ` [data-filter="${el.field}"]`).hasClass('daterange')) {
      let new_data = moment(el.value, 'YYYY-MM-DD').format('DD.MM.YYYY');
      let selector = container + ` [data-filter="${el.field}"]`;
      // $(selector).val(new_data);
      $(selector).datepicker("setDate", new_data);
      // $(selector).data('daterangepicker').setStartDate(new_data);
      // $(selector).data('daterangepicker').setEndDate(new_data);
      $(selector).data('value', el.value);
    } else {
      $(container + ` [data-filter="${el.field}"]`).val(el.value);
    }

  });
  getUatText();
}

function getFilters(container = '') {
  let filters = [];
  $(container + ' [data-filter], #uatSelect, #groupSelect').each(function () {
    $this = $(this);
    let filter = $this.data().filter || '';
    if (filter != '') {
      if (filter == 'idUat') {
        $this.val($this.val() || app.selected_uat);
      }
      if (($this.data().value || '') != '') {
        filters.push(buildFilter(filter, $this.data().operator, $this.data().value));
      } else if (($this.val() || '') != '') {
        filters.push(buildFilter(filter, $this.data().operator, $this.val()));
      } else if (filter == 'idUat' || filter == 'groups') {
        let values = $this.find('option').map(function (i, el) {
          if (el.value || '' != '') {
            return el.value;
          }
        }).get()
        filters.push(buildFilter(filter, $this.data().defOperator, '', values));
      }
    }
  });
  return filters;
}

$(window).on('popstate', function loadFromHistory(event) {
  if (history.state != null && history.state.args != null) {
    window[history.state.args].apply(window, history.state.parameters);
  }
});

function viewAllUsers() {
  let args = arguments;
  let caller = viewAllUsers.caller.name;
  let filters = getFilters('#filters_users');
  doGetHtml("users/all", null, {
    filters: JSON.stringify({
      page: "1",
      filters: filters
    })
  }, {dataType: "html"}).done(function (response) {
    changeContent(response, args, caller, 'viewAllUsers');
   /* setMenuPage('list_surveys');*/
    makeDataTable('table_users', 0);
    setFilters(filters, '#filters_users');
  });
}

function viewUser(editabil, id_user = 0, is_logged_user = true) {
  let args = arguments;
  let caller = viewUser.caller.name;
  $.ajax({
    type: "GET", url: "users/" + id_user, data: {}, dataType: "html", cache: false, success: function (response) {
      changeContent(response, args, caller, 'viewUser');
      if (is_logged_user) {
        setMenuPage('contul_meu');
        let groups = JSON.parse(Cookies.get("wstGroups"));
        //$("#grupuri").val(groups.join(' / '));
      }
      if (!editabil) {
        // $("#saveDate").hide();
        // $('.neEdit').prop("disabled", true);
        // $('.neEdit').closest('.input-box').addClass('disabled');
        // $('.deleteDoc').hide();
        // $("#hideInputChoose").hide();
      } else {
        $("#enableDate").hide();
        enableInput(0);
      }

      makeMulti('#user_asoc_survey_zones');
      makeMulti('#user_roles');
    }, complete: function () {
      triggerPop();
      $('.dual-listbox__search').val('')
      //groups_list.searchLists();
      //roles_list.searchLists();
    }

  });
}

function viewAllGroups() {
  let args = arguments;
  let caller = viewAllGroups.caller.name;
  $.ajax({
    type: "GET", url: "groups/all", data: {}, dataType: "html", cache: false, success: function (response) {
      changeContent(response, args, caller, 'viewAllGroups');
      setMenuPage('nom_groups');
      makeDataTable('table_groups', 0);
    }, complete: function () {
      triggerPop();
    }
  });
}

function viewAllUats() {
  let args = arguments;
  let caller = viewAllUats.caller.name;
  $.ajax({
    type: "GET",
    url: "uat/all",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller, 'viewAllUats');
      setMenuPage('nom_uats');
      makeDataTable('table_uats', 0);
    }, complete: function () {
      triggerPop();
    }
  })
}

function viewGroup(editabil, id_group = 0) {
  let args = arguments;
  let caller = viewGroup.caller.name;
  $.get("groups/" + id_group).done(function (response) {
    changeContent(response, args, caller);
    if (!editabil) {
      // $("#saveDate").hide();
      // $('.neEdit').prop("disabled", true);
      // $('.neEdit').closest('.input-box').addClass('disabled');
      // $('.deleteDoc').hide();
      // $("#hideInputChoose").hide();
    } else {
      $("#enableDate").hide();
      enableInput(0);
    }
    makeMulti('#group_uats');
  }).then(function () {
    triggerPop();
    $('.dual-listbox__search').val('')
    //groups_list.searchLists();
    //roles_list.searchLists();
  })
}

function viewUat(idUat) {
  let args = arguments;
  let caller = viewUat.caller.name;
  $.get("uat/" + idUat).done(function (response) {
    changeContent(response, args, caller);
    $("#enableDate").hide();
    enableInput(0);
    /*makeMulti('#group_uats');*/
  }).then(function () {
    triggerPop();
    /*$('.dual-listbox__search').val('')*/
    //groups_list.searchLists();
    //roles_list.searchLists();
  })
}

function addContract(contract_type = 0) {
  var args = arguments;
  var caller = addContract.caller.name;
  $.ajax({
    type: "GET",
    url: "contracts/add",
    data: {contractType: contract_type},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller, contract_type == 0 ? '' : 'addContract');
      setMenuPage('add_contract');
      makeDataPiker();

      // $('#selectDocPdf').trigger('change');
      if (contract_type == 0) {
        $('#nom_ctr_types .ctr_type').first().trigger('change');
      } else {
        initVirtualSelect('.select-judet', '', 'Selectează județul', true);
        $('.select-judet').change(function () {
          getLocalitati(this, 'uatSolicitant', '${contract.idCity }');
        });
      }
      //$("#nrContract").focus();

    },
    complete: function () {
      triggerPop();
    }

  });
}

//function viewContracts() {
//  var args = arguments;
//  var caller = viewContracts.caller.name;

//  doGetHtml("contracts/viewPage").done(function (response) {
//    changeContent(response, args, caller, 'viewContracts');
//    setMenuPage('view_contracte');
//    getContracsTable();
//  });

  // $.ajax({
  //   type: "GET",
  //   url: "contracts/all/filtered",
  //   headers: {
  //     filters: JSON.stringify({
  //       page: "1",
  //       filters: filters
  //     })
  //   },
  //   data: {
  //     onlyTable: only_table
  //   },
  //   dataType: "html",
  //   cache: false,
  //   success: function (response) {
  //     $('#totalContracte_2').hide();
  //     if (only_table == 1) {
  //       $('#tab_contracts').html(response);
  //     } else {
  //       changeContent(response, args, caller);
  //       setMenuPage('view_contracte');
  //     }
  //
  //     table = makeDataTable("table_contracts", 3);
  //     setFilters(filters, "#filters_contract");
  //   },
  //
  //   complete: function () {
  //     triggerPop();
  //     if (table != null) {
  //       table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
  //       var now = new Date();
  //     }
  //
  //   }
  //
  // });

//}

/*function getContracsTable() {
  var table = null;
  let filters = getFilters("#filters_contract");
  doGetHtml("contracts/all/filtered", {}, {
    filters: JSON.stringify({
      page: "1",
      filters: filters
    })
  }).done(function (response) {
    $('#totalContracte_2').hide();
    $('#tab_contracts').html(response);

    table = makeDataTable("table_contracts", 3);
    setFilters(filters, "#filters_contract");
  }).then(function () {
    triggerPop();
    if (table != null) {
      table.rows().nodes().to$().find('[data-bs-toggle="tooltip"]').tooltip();
      var now = new Date();
    }
  });
}*/

/*function openContract(id, skip1) {
  var args = arguments;
  var caller = openContract.caller.name;
  doGetHtml(`contracts/${id}`).done(function (response) {
    changeContent(response, args, caller, 'openContract');
    $('.add-bin').closest('.location-point').find('.test-bins').find('.bins-subtitle').show();
    // $('#selectDocPdf').trigger('change');
    setMenuPage('view_contracte');
    // makeDataTable("table_contracts", -1);
    makeDataPiker();
    // $('.select-judet').each(function () {
    $('.select-judet').trigger('change');
    // });
    $('.neEdit').prop('disabled', true);
    $('.neEdit').closest('.input-box').addClass('disabled');
    // $('.deleteDoc').hide();

    // $('#addContractForm').trackChanges('[data-category="client"]');
  }).then(function () {
    triggerPop();
  });
}*/

/*function viewCollects(customFilters) {
  var args = arguments;
  var caller = viewCollects.caller.name;
  doGetHtml("collect/viewPage").done(function (response) {
    changeContent(response, args, caller, 'viewCollects');
    setMenuPage('colectari');
    getCollectsTable(customFilters);
  });
}*/

/*function addCollects() {
  var args = arguments;
  var caller = addCollects.caller.name;
  doGetHtml("collect/addPage").done(function (response) {
    changeContent(response, args, caller, 'addCollects');
    setMenuPage('addColectari');
  });
}*/


/*function getCollectsTable(customFilters) {
  let filters = customFilters || getFilters('#rapCollects');

  doGetHtml("collect/collects", {}, {
    filters: JSON.stringify({
      page: "1",
      filters: filters
    })
  }).done(function (response) {
    $('#table_collect').html(response);
    makeDataTable("table_collect", 1);

    setFilters(filters, '#rapCollects');
  }).then(function () {
    triggerPop();
  });
}*/

/*function viewProblems() {
  var args = arguments;
  var caller = viewProblems.caller.name;
  doGetHtml("collect/problems/viewPage").done(function (response) {
    changeContent(response, args, caller);
    setMenuPage('probleme');
    viewProblemsTable();
  });
}*/

/*function viewComplaints() {
  let args = arguments;
  let caller = viewComplaints.caller.name;
  doGetHtml("complaints").done(function (response) {
    changeContent(response, args, caller);
    setMenuPage('sesizari');
    getComplaintsTable();

    $('#uatSelect').trigger('change');

  });
}*/

/*function getComplaintsTable() {
  let filters = getFilters('#rapComplaints');

  doGetHtml(
      "complaints/complaints",
      {},
      {filters: JSON.stringify({page: "1", filters: filters})}
  ).done(function (response) {
    $('#table_complaints').html(response);
    makeDataTable("table_complaints", 1);

    setFilters(filters, '#rapComplaints');
  }).then(function () {
    triggerPop();
  });
}*/

function viewContractsForComplaints(id = 0) {
  let filters = getFilters('#rapComplaints');
  doGetJson("api/contracts/filtered", null, {
    filters: JSON.stringify({
      page: "1",
      filters: filters
    })
  }).done(function (response) {
    response.map(function (res) {
      $("#persoana-select").append("<option value=" + res.id + "> " + (res.clientName || '') + " " + (res.FullAddress || '') + "</option>")
    })
  })
}

function viewProblemsTable() {
  let filters = getFilters('#rapProblems');

  doGetHtml(
      "collect/problems",
      {},
      {filters: JSON.stringify({page: "1", filters: filters})}
  ).done(function (response) {
    $('#table_problems').html(response);
    makeDataTable("table_problems", 1);

    setFilters(filters, '#rapProblems');
  }).then(function () {
    triggerPop();
  });
}

// function resetFilters(selector) {
//   $('form [data-filter]').val('');
//   $(selector).trigger('click');
// }

function viewBin() {
  //params id_locatie, id_contract
  //id_locatie daca e 0 atunci o sa vina toate tomberoanele de pe contract
  //daca id_locatie > 0 atunci o sa vina doar tomberoanele de pe locatia selectata
  var contract = $('#contract_colectare').val() || 0;
  var locatie = $('#locatie_c').val() || 0
  if (contract > 0) {
    contract = $("#contract_colectare option[value='" + contract + "']").length > 0 ? contract : 0;
  }

  if (contract > 0) {
    $.ajax({
      type: "POST", url: "winvoice/viewBin", data: {
        //param in controler : valoare din js
        id_locatie: locatie, id_contract: contract
      }, dataType: "json", cache: false, success: function (response) {

        $('#bin_c option:not(:first-child)').remove();

        for (i = 0; i < response.length; i++) {
          opt = response[i];
          var option = '<option value="' + opt.id + '">' + opt.bar_code + '</option>';
          $('#bin_c').append(option);
        }
        //-> $('#select_bin') // adaugare <option> returnat de ajax in <select> cu binuri

      },
    });
  }

}

function viewProbleme(only_table, id_c) {

  var args = arguments;
  var caller = viewProbleme.caller.name;

  // var nr_contract = $('#nr_contract').length > 0 ? $('#nr_contract').val() : '';
  // var data_start = $('#dataStartPr').length > 0 ? $('#dataStartPr').val()
  //     : (only_table == 0 ? app.f_d_month : '');
  // var data_stop = $('#dataEndPr').length > 0 ? $('#dataEndPr').val()
  //     : (only_table == 0 ? app.curr_date : '');
  // var nr_contract = $('#nr_contract').length > 0 ? $('#nr_contract').val() : '';
  //
  var id_contract = id_c > 0 ? id_c : ($('#contract_colectare').val() || 0);
  // if (id_contract > 0) {
  //     id_contract = $(
  //         "#contract_colectare option[value='" + id_contract + "']").length > 0
  //         ? id_contract : 0;
  // }
  let filters = [];
  filters = getFilters('#rapProblems');
  $.ajax({
    type: "GET", url: "collect/problems", headers: {
      filters: JSON.stringify({
        page: "1", filters: filters
      })
    }, dataType: "html", cache: false, success: function (response) {

      if (only_table == 0) {
        changeContent(response, args, caller, 'viewProbleme');
        setMenuPage('probleme');
        $('#contract_colectare').val(id_contract).trigger('change');
        // $('.selectpicker').selectpicker('refresh')
        makeDataTable("table_problems", 7);
      }
      if (only_table == 1 || only_table == 2) {
        $('#colectari_contract').html(id_contract > 0 ? response : '');
        $('#contract_colectare').val(id_contract);
        // $('.selectpicker').selectpicker('refresh');
        makeDataTable("table_problems", 1);
      }
      setFilters(filters, '#rapProblems');
    }, complete: function () {
      triggerPop();
      // $('.selectpicker').selectpicker(
      //     {style: "", styleBase: 'form-control cerere-element', width: '100%'});
      // $('.selectpicker + button').removeClass('btn btn-light').addClass(
      //     'form-control cerere-element');

    }
  });
  // $.ajax({
  //     type: "POST",
  //     url: "wcontract/getContractUM",
  //     data: {id_contract: id_contract},
  //     dataType: "json",
  //     cache: false,
  //     success: function (response) {
  //         $('#u_m').val(response.um);
  //         $('#fractiune').val(response.waste_type);
  //     },
  //     complete: function () {
  //
  //     }
  // });
}

app.filters.sold_restant = {
  data_start: '', data_stop: '', tip_client: '',
};

app.filters.raport_nr_persoane = {
  din_data: '', pana_la_data: '', client_name: '', contract_nr: '', adresa_consum: '', stare_contract: -1
};
app.filters.def.raport_nr_persoane = {
  din_data: '', pana_la_data: '', client_name: '', contract_nr: '', adresa_consum: '', stare_contract: -1
};

function openNomClienti(id_client) {
  var args = arguments;
  var caller = openNomClienti.caller.name;
  $.ajax({
    type: "GET",
    url: "wclient/getClient",
    data: {id_client: id_client},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller, 'openNomClienti');
      setMenuPage('nom_clienti');
      var table = makeDataTable("table_products", 5);
      table.rows().nodes().to$().tooltip();
      $('.neEdit').prop('disabled', true);
      $('.neEdit').closest('.input-box').addClass('disabled');
      $('.select-judet').each(function () {
        $(this).trigger('change');
      });
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker({style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openViewExecutari(contract_exec) {
  var args = arguments;
  var caller = openViewExecutari.caller.name;

  var data = {
    id: 0,
    id_executor: 0,
    likeLinkedSource: '',
    source_id: 0,
    dataStart: '',
    dataEnd: '',
    createdAt: '',
    createdById: 0,
    likeDosarNr: $('#dosar_exec').val() || '',
    statusId: $('#stare_exec').val() || 71,
    contract_nr: $('#nr_contract_exec').val() || contract_exec || '',
    adresa: $('#adr_contract_exec').val() || '',
    client_name: $('#nume_exec').val() || ''
  };
  $.ajax({
    type: "GET",
    url: "executari/getExecutari",
    data: data,
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('veiw_executari');
      var table = makeDataTable("table_executari", 5);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker({style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }
  });
}

function openViewDevices() {
  var args = arguments;
  var caller = openViewDevices.caller.name;
  $.ajax({
    type: "POST",
    url: "wDevice/viewDevices",
    data: {},
    dataType: "html",
    cache: false,
    success: function (response) {
      changeContent(response, args, caller);
      setMenuPage('view_devices');
      var table = makeDataTable("table_executori", 5);
      table.rows().nodes().to$().tooltip();
    },
    complete: function () {
      triggerPop();
      $('.selectpicker').selectpicker({style: "", styleBase: 'form-control cerere-element', width: '100%'});
    }

  });
}

function make_table_serverSide(response, args, caller, data_page, id_table, url, data, type, order, columns_data, function_table) {
  changeContent(response, args, caller, 'make_table_serverSide');
  setMenuPage(data_page);
  var now = new Date();
  var footerCbk = function (row, data, start, end, display) {
    var api = this.api(), data;
    CalculateTableSummary(this);
    return;
  }

  table = $(id_table).DataTable({
    "processing": true, serverSide: true, ajax: {
      url: url, data: data, type: type
    }, "footerCallback": footerCbk, "ordering": true, "order": [order], 'columns': columns_data, "language": {
      "lengthMenu": "Afișează _MENU_ linii",
      "zeroRecords": "Nu s-a găsit nimic",
      "info": "Pagina _PAGE_ din _PAGES_",
      "infoEmpty": "Nu exista înregistrări",
      "infoFiltered": "(filtrate din _MAX_ totale)",
      "sSearch": "Caută:",
      "oPaginate": {
        "sFirst": "First", "sLast": "Last", "sNext": "Urm", "sPrevious": "Prev"
      },
      "oAria": {
        "sSortAscending": ": activate to sort column ascending",
        "sSortDescending": ": activate to sort column descending"
      },

    }
  });

  $(id_table + 'tbody').on('click', 'tr', function (event) {
    if ($(event.target).parents('td').hasClass('dropdownMenu') || $(event.target).hasClass('dropdownMenu')) {
      event.stopPropagation();
      $(this).find('[data-bs-toggle=\'dropdown\']').dropdown('toggle');
    } else {
      var data = table.row(this).data();
      function_table(data['id']);
    }
  });

  var now = new Date();
  return table;
}

$(document).on('click', '.view-nom', function (event) {
  let $this = $(this)
  let nom = $this.data().nom;
  let page = $this.data().page;
  openNom(nom, page);
});

function openNom(nom, page = '') {

  var args = arguments;
  var caller = openNom.caller.name;
  $.ajax({
    type: "GET",
    url: `nom/${nom}`,
    data: {},
    dataType: "html",
    success: function (response) {
      changeContent(response, args, caller);
      if (page != '') {
        setMenuPage(page);
      }

      let table0 = makeDataTable("table_nom_capacity", 0);
      let table1 = makeDataTable("table_nom_fraction", 0);
      let table2 = makeDataTable("table_nom_um", 0);


      //table.rows().nodes().to$().tooltip();
    }
  });
}

// $(document).on('click', '#rap_asoc_bins', function (event) {
//   getRapBins(this, 0, event);
// });

function getRapBins(only_card) {
  var args = arguments;
  var caller = getRapBins.caller.name;
  let filters = getFilters('#rapBins');
  $.ajax({
    type: "GET", url: `dashboard/bins`, data: {only_card: only_card}, headers: {
      filters: JSON.stringify({
        page: "1", filters: filters
      })
    }, dataType: "html", success: function (response) {
      if (only_card == 1) {
        $(ctrl).closest('.fp-card').html(response);
        makeDataPiker();
        makeDataRangePicker();
      } else {
        changeContent(response, args, caller, 'getRapBins');
        setMenuPage('rap_bin');
        makeDataTable("table_asoc_bins", 3);
      }
      //table.rows().nodes().to$().tooltip();
      setFilters(filters, '#rapBins');
    }
  });
}

function getRapContracts(only_card) {
  let args = arguments;
  var caller = getRapContracts.caller.name;
  let filters = getFilters('#rapContracts');
  $.ajax({
    type: "GET", url: `dashboard/contracts`, data: {only_card: only_card}, headers: {
      filters: JSON.stringify({
        page: "1", filters: filters
      })
    }, dataType: "html", success: function (response) {
      if (only_card == 1) {
        $(ctrl).closest('.fp-card').html(response);
        makeDataPiker();
        makeDataRangePicker();
      } else {
        changeContent(response, args, caller, 'getRapContracts');
        setMenuPage('rap_contracts');
        let table = makeDataTable("table_rap_contracts", 0);
      }
      setFilters(filters, '#rapContracts');
    }
  });
}

// $(document).on('click', '#rap_contracts', function (event) {
//   getRapContracts(this, 0, event);
// });

/*function getRapProblems(ctrl, only_card, evt = jQuery.Event("click")) {
  let $this = $(ctrl)
  let args = arguments;
  let caller = evt.target;
  let filters = getFilters('#rapProblems');
  $.ajax({
    type: "GET", url: `dashboard/problems`, data: {only_card: only_card}, headers: {
      filters: JSON.stringify({
        page: "1", filters: filters
      })
    }, dataType: "html", success: function (response) {
      if (only_card == 1) {
        $(ctrl).closest('.fp-card').html(response);
        makeDataPiker();
        makeDataRangePicker();
      } else {
        changeContent(response, args, caller, 'getRapProblems');
        setMenuPage($this.data().page);
        let table = makeDataTable("table_rap_contracts", 3);
      }
      setFilters(filters, '#rapProblems');

    }
  });
}*/

/*function getRapCollects(ctrl, only_card, evt = jQuery.Event("click")) {
  let $this = $(ctrl)
  let args = arguments;
  let caller = evt.target;
  let filters = getFilters('#rapCollects');
  doGetHtml(`dashboard/collects`, {only_card: only_card}, {
    filters: JSON.stringify({
      page: "1",
      filters: filters
    })
  }).done(function (response) {
    if (only_card == 1) {
      $(ctrl).closest('.fp-card').html(response);
      makeDataPiker();
      makeDataRangePicker();
    } else {
      changeContent(response, args, caller, 'getRapCollects');
      setMenuPage($this.data().page);
      let table = makeDataTable("table_rap_contracts", 3);
    }
    setFilters(filters, '#rapCollects');

  });
}*/

function openModalNom(id, type, typeNom) {
  $.ajax({
    type: "GET",
    url: "nom/modal/" + type,
    data: {id: id, typeNom: typeNom},
    success: function (response) {
      let html = $.parseHTML(response)[1];
      switch ($(html).attr('id')) {
        case 'modal_add_capacity':
          $('#modal_capacity').html(response);
          $('#modal_add_capacity').modal('show');
          break;
        case 'modal_add_fraction':
          $('#modal_fraction').html(response);
          $('#modal_add_fraction').modal('show');
          break;
        case 'modal_add_um':
          $('#modal_um').html(response);
          $('#modal_add_um').modal('show');
          break;
      }
    },
    complete: function () {
      triggerPop();
      /*      $('.selectpicker').selectpicker({style: "", styleBase: 'form-control cerere-element', width: '100%'});*/
    }
  });
}

/*function saveOrUpdateCapacities(id, type) {
  let test = $('#capacity').val()
  let umType = $('[data-key="um_id"] option:selected').val()
  let def;
  $('.capacity-check').each(function (i, e) {
    if ($(e).is(':checked')) {
      def = $(e).val();
    }
  })
  if (validateForm('addCapacity')) {
    doPutJson("api/noms/createOrUpdateCapacities", {
      capacity: test,
      um: umType,
      id: id,
      def: def
    }, "", "").done(function (response) {
      toastGeneral("Salvarea a fost realizată cu succes!", 'success');
      $('#modal_add_capacity').modal('hide');
      openNom(type);
    })
  }
}*/

/*function saveOrUpdateFractions(id, type) {
  let test = $('#fraction').val()
  let wasteType = $('[data-key="waste_types_id"] option:selected').val()
  let def;
  $('.fraction-check').each(function (i, e) {
    if ($(e).is(':checked')) {
      def = $(e).val();
    }
  })

  if (validateForm('addFraction')) {
    doPutJson("api/noms/createOrUpdateFractions", {
      description: test,
      wasteType: wasteType,
      id: id,
      def: def
    }, "", "").done(function (response) {
      toastGeneral('Salvare realizată cu succes!', 'success');
      $('#modal_add_fraction').modal('hide');
      openNom(type);
    })
  }
}*/

/*function saveOrUpdateUms(type) {
  let shortcutUm = $('#shortcutUm').val();
  let unity = $('#unity').val();
  let efactura = $('#eFactura').val();
  let def;
  $('.um-check').each(function (i, e) {
    if ($(e).is(':checked')) {
      def = $(e).val();
    }
  })
  if (validateForm("addUM")) {

    doPutJson("api/noms/createOrUpdateUms", {
      description: unity,
      efacturaCode: efactura,
      id: shortcutUm,
      def: def
    }, "", "").done(function (response) {
      toastGeneral('Salvare realizată cu succes!', 'success');
      $('#modal_add_um').modal('hide');
      openNom(type);
    })
  }
}*/

/*function toggleActiveInactive(id, type, active) {
  $.ajax({
    type: 'POST',
    url: `api/noms/${id}/toggle-status?type=${type}&currentActive=${active}`,
    contentType: "application/json; charset=utf-8",
    success: function () {
      openNom(type);
    }
  })
}*/

function toggleActiveInactiveUser(id, active) {
  $.ajax({
    type: 'POST',
    url: `api/users/${id}/toggle?currentActive=${active}`,
    contentType: "application/json; charset=utf-8",
    success: function () {
      viewAllUsers();
    }
  })

}

/*function saveUat(id = 0) {
  var uat = {};

  $('#formUatUpdate [data-uat]').each(function () {
    uat[$(this).data("uat")] = $(this).val();
  })

  if (validateForm('formUatUpdate')) {
    $.ajax({
          type: 'POST',
          url: `api/uats`,
          data: JSON.stringify(uat),
          contentType: "application/json; charset=UTF-8",
          success: function () {
            toastGeneral('Salvarea a fost realizată cu succes!', "success");
            closeModal('#modal_add_uat');
            viewAllUats();
          },
          error: function () {
            toastGeneral('Salvarea nu a putut fi realizată', 'error');
          }
        }
    )
  }
}*/

/*function viewLocationsForContract(idContract = 0, select) {
  $.getJSON(`api/locations/` + idContract).done(function (data) {
    $(select + " option").not(':first').remove();
    data.map(function (res) {
      $(select).append("<option value=" + res.id + "> " + res.contractRole + " " + res.fullLocation + "</option>")
    })
  })
}*/

/*function viewBinsForLocation(idLocation = 0, select) {
  $.getJSON(`api/bins/location/` + idLocation).done(function (data) {
    $(select + " option").not(':first').remove();
    data.map(function (res) {
      $(select).append("<option value=" + res.id + "> " + res.barCode + "</option>")
    })
  });
}*/

/*function saveCollect() {
  var collect = {};
  // let new_data = moment($("#dataInserareCollect").val(), 'YYYY-MM-DD HH:mm:ss SSS').format('DD.MM.YYYY HH:mm');

  $('#collectsForm [data-filter]').each(function () {
    collect[$(this).data("filter")] = $(this).data().value || $(this).val();
  })
  // collect.insertedAt = new_data;

  $.ajax({
    type: "POST",
    url: "api/collect",
    data: JSON.stringify(collect),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      console.log(response)
    }
  })

}*/

 



















