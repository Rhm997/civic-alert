app.initialDate = {};
app.compDate = {};
app.colectari = {};
app.colectari = {}
app.dataStart = {}
app.dataStop = {}
app.idUat = {}
app.idUm = {}

function checkNodesArray(arr) {
  var raps = [];
  var luni = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];

  for (i = 0; i < luni.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (luni[i] !== arr[j]) {
        arr.push(luni[i]);
      }
    }
  }
  return arr;
}


function getRandomMixed(arr1, arr2, n) {
  var result = new Array(2 * n),
      rgbDark = getRandom(app.vectCuloriAppRandomNouDark, n);
  rgbLight = getRandom(app.vectCuloriAppRandomNouLight, n);
  result = $.map(rgbDark, function (v, i) {
    return [v, rgbLight[i]];
  });

  return result;
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

//app.vectCuloriAppRandomNouDark=["#416319", "#e3e5ce", "#8fbb73", "#0e1506", "#8fbb73", "#619724", "#3e7fac", "#818f42", "#1b2c0c", "#a95111", "#37566c"];
app.vectCuloriAppRandomNouDark = ["#664520", "#995200", "#fae0c0", "#875f4a", "#591814", "#5c3103", "#452929"];

//app.vectCuloriAppRandomNouLight=["#416319ff", "#e3e5ceff", "#8fbb73ff", "#0e1506ff", "#8fbb73ff", "#619724ff", "#3e7facff", "#818f42ff", "#1b2c0cff", "#a95111ff", "#37566cff"];
app.vectCuloriAppRandomNouLight = ["#e1f0b9", "#a1d9ed", "#7ceba3", "#a9d692", "#9ae3cd", "#6fc973", "#34ebcf"];

//app.vectCuloriAppRandomNou=["#416319", "#e3e5ce", "#8fbb73", "#0e1506", "#8fbb73", "#619724", "#3e7fac", "#818f42", "#1b2c0c", "#a95111", "#37566c"];
app.vectCuloriAppRandomNou = $.map(app.vectCuloriAppRandomNouDark, function (v, i) {
  return [v, app.vectCuloriAppRandomNouLight[i]];
});

var charturi = {};

function groupBy(arr, property) {
  return arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

function groupByArr(arr, property) {
  var memo = [];
  return arr.reduce(function (a, x) {
    memo.push(x[property]);
    return memo;
  }, []);
}

function deleteChartFromGridAndAsoc($item) {
  let item = grid.getItems().filter(function (el) {
    return el.getElement().getAttribute('id') == $item.attr('id')
  });
  grid.show(grid.remove(item, {removeElements: true}), {
    onFinish: function (items) {
    }
  });
  doAjax('api/dashboard/deleteChart/' + $item.data().idAsoc, 'DELETE', null, null, null, null).done(function (response) {
  });
}

$.contextMenu({
  selector: '.fa-gear',
  trigger: 'left',
  autoHide: false, //close contextmenu when mouse out
  className: 'context-menu-list',
  callback: function (key, options) {
    var $item = options.$trigger.closest('.trigger-functions');
    switch (key) {
      case 'config':
        $('.context-menu-element').hide();
        openConfigDash($item);
        break;
      case 'duplicate':
        $('.context-menu-element').hide();
        countDashboards();
        checkNrOfDashboardsOnAdd($item);
        break;
      case 'delete':
        $('.context-menu-element').hide();
        let id_fullscreen_chart = $($item).data().trigger;
        let id = $item.attr('id') == 'modalFullScreen' ? $(id_fullscreen_chart) : $item;
        $('#modalFullScreen').modal('hide');
        deleteChartFromGridAndAsoc(id);
        countDashboards();
        break;
    }
  },
  items: {
    "config": {name: "Configurează", icon: "fa-solid fa-pen-to-square"},
    "duplicate": {name: "Duplicare ", icon: "fa-solid fa-clone"},
    "delete": {name: "Șterge", icon: "fa-solid fa-trash"}
  }
});

function openConfigDash($item) {
  let id_asoc = $item.data().idAsoc;
  let id_chart = $item.data().idChart;
  let date = typeof $item.data().filters == "object" ? $item.data().filters : JSON.parse($item.data().filters);

  let template = $item.find('.config-container').prop('outerHTML');
  $('#modalConfigDash .modal-body').append(template);
  $('#modalConfigDash .modal-body .config-container #select_uat_' + id_asoc).attr('id', 'select_uat_modal_' + id_asoc);
  $('#modalConfigDash .modal-body .config-container #select_uat_modal_' + id_asoc).attr("data-id-asoc", id_asoc)
  $('#modalConfigDash .modal-body .config-container #select_um_' + id_asoc).attr('id', 'select_um_modal_' + id_asoc);
  $('#modalConfigDash .modal-body .config-container #select_um_modal_' + id_asoc).attr("data-id-asoc", id_asoc)
  $('#modalConfigDash .modal-footer .btn-saveUpdate').attr('data-id-asoc', id_asoc);
  $('#modalConfigDash .modal-footer .btn-saveUpdate').attr('data-id-chart', id_chart);

  if (id_chart == 7 || id_chart == 8 || id_chart == 9 || id_chart == 10) {
    /*initDateRangePicker("#modalConfigDash .modal-body #new_date_picker_" + id_asoc, id_asoc);*/
    /*app.idUat[id_asoc] = {"idUat": $("#select_uat_modal_" + id_asoc).val()}*/
    if (id_chart == 9) {
      app.idUm[id_asoc] = {"idUm": $("#select_um_modal_" + id_asoc).val()}
      let idUmSelect = 0;
      if ((date[3] ? date[3].idUm : 0) != 0) {
        idUmSelect = date[3].idUm;
      }
      app.idUm[id_asoc] = {"idUm": idUmSelect}
    }
    initDateRangePicker("#modalConfigDash .modal-body #new_date_picker_" + id_asoc, id_asoc, date[0].dataStart, date[1].dataStop);

    let idUatSelect = 0;
    if ((date[2] ? date[2].idUat : 0) != 0) {
      idUatSelect = date[2].idUat;
    }
    app.idUat[id_asoc] = {"idUat": idUatSelect}
  } else {
    console.log(date);
    initYearPicker("#modalConfigDash .modal-body #comp_date_picker_" + id_asoc, id_asoc, date[1].secondCompDate);
    initYearPicker("#modalConfigDash .modal-body #new_date_picker_" + id_asoc, id_asoc, date[0].firstCompDate);
    let idUatSelect = 0;
    if ((date[2] ? date[2].idUat : 0) != 0) {
      idUatSelect = date[2].idUat;
    }
    app.idUat[id_asoc] = {"idUat": idUatSelect}
  }
  if ($("#select_um_" + id_asoc).length < 2 && id_chart == 9) {
    doGetJson('api/noms/ums').done(function (response) {
      $("#select_um_modal_" + id_asoc).empty();
      $("#select_um_modal_" + id_asoc).append("<option value=0 > Selectați toate um-urile </option>");
      response.forEach(function (uats) {
        $("#select_um_modal_" + id_asoc).append("<option value=" + uats.id + " > " + uats.description + "</option>");
      })
      $("#select_um_modal_" + id_asoc).val(app.idUm[id_asoc].idUm || 0);
    });
  }
  if ($("#select_uat_" + id_asoc).length < 2) {
    doGetJson('api/uats/user').done(function (response) {
      $("#select_uat_modal_" + id_asoc).empty();
      $("#select_uat_modal_" + id_asoc).append("<option value=0 > Selectați toate uat-urile </option>");
      response.forEach(function (uats) {
        $("#select_uat_modal_" + id_asoc).append("<option value=" + uats.id + " > " + uats.name + "</option>");
      });
      $("#select_uat_modal_" + id_asoc).val(app.idUat[id_asoc].idUat || 0);
    });
  }
  $('#modalConfigDash .modal-body').find('.config-container').prop('hidden', false);
  $('#modalConfigDash').modal('show');

  $('#modalFullScreen').modal('hide');
}

$('#modalConfigDash').on('hidden.bs.modal', function () {
  $("#modalConfigDash .modal-body").empty();
})

function createChart(chartId, chartType, data, options) {
  if (Chart.getChart(chartId) !== undefined) {
    Chart.getChart(chartId).destroy();
  }
  let ctx = document.getElementById(chartId)
  return new Chart(ctx, {
    type: chartType,
    data: data,
    options: options
  })
}

const dataCtxBins = {
  labels: getMonths(),
  datasets: [{
    label: 'test',
    data: [25, 39, 40, 51, 76, 85, 90, 100, 32, 56, 11, 12],
    backgroundColor: [
      getRandomColors()
    ],
    borderWidth: 1,
    borderRadius: 2
  },
  ]
};

const configChartCtxBins = {
  type: 'bar',
  data: dataCtxBins,
  options: {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        suggestedMin: 10,
        suggestedMax: 40
      },
    },
    xAxes: [{stacked: false}]
  },
}

const dataCtxContracts = {
  labels: getMonths(),
  datasets: [{
    label: 'test',
    data: [25, 39, 40, 51, 76, 85, 90, 100, 32, 56, 11, 12],
    backgroundColor: [
      getRandomColors()
    ],
    borderWidth: 1,
    borderRadius: 2

  },
    {
      label: 'test1',
      data: [45, 49, 10, 71, 56, 45, 30, 90, 32, 56, 11, 12],
      backgroundColor: [
        getRandomColors()
      ],
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: 'test1',
      data: [45, 49, 10, 71, 56, 45, 30, 90, 32, 56, 11, 12],
      backgroundColor: [
        getRandomColors()
      ],
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: 'test1',
      data: [45, 49, 10, 71, 56, 45, 30, 90, 32, 56, 11, 12],
      backgroundColor: [
        getRandomColors()
      ],
      borderWidth: 1,
      borderRadius: 2
    }]
};

const configChartCtxContracts = {
  type: 'bar',
  data: dataCtxContracts,
  options: {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        suggestedMin: 10,
        suggestedMax: 40
      },
    }
  },
}

const dataCtxCollects = {
  labels: getMonths(),
  datasets: [{
    label: 'test',
    data: [23, 35, 60, 21, 36, 65, 30, 20, 42, 56, 61, 32],
    backgroundColor: [
      getRandomColors()
    ],
    borderWidth: 1,
    borderRadius: 2
  },
  ]
};

const configChartCtxCollects = {
  type: 'bar',
  data: dataCtxCollects,
  options: {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Colectări'
      }
    },
    scales: {
      y: {
        suggestedMin: 10,
        suggestedMax: 40
      },
    }
  },
}

const dataCtxProblems = {
  labels: getMonths(),
  datasets: [{
    label: 'test',
    data: [23, 49, 10, 71, 86, 95, 100, 100, 32, 26, 81, 32],
    backgroundColor: [
      getRandomColors()
    ],

    borderWidth: 1,
    borderRadius: 2

  },
    {
      label: 'test1',
      data: [25, 39, 40, 51, 76, 85, 90, 100, 32, 56, 11, 12],
      backgroundColor: [
        getRandomColors()
      ],
      borderWidth: 1,
      borderRadius: 2
    }]
};

const configChartCtxProblems = {
  type: 'bar',
  data: dataCtxProblems,
  options: {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Probleme semnalate'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        beginAtZero: true
      }
    }
  },
}

function getMonths() {
  let MONTHS = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep',
    'Oct', 'Noi', 'Dec'];
  return MONTHS;
};

// CULORI PRESELECTATE

function getRandomColors() {
  let colorArr = ["#33646E", "#558E7C", "#A09DFF", "#787395", "#FFA17A",
    "#002A1D", "#00A6B8", "#A9AD9B", "#9DCF8A", "#E66994", "#0042B0", "#5B1400",
    "#C4515F", "#1783f0", "#01908a"];
  let selectedColor = colorArr[Math.floor(Math.random() * 15)];
  return selectedColor;
}

$(document).on('click', '.min-max-trigger', function () {
  setTimeout(() => {
    $('#modalFullScreen #expandBinsChart').toggleClass('fa-expand fa-compress');
  }, 100);
  $(this).closest('#dashboardGrid .item').prop('outerHTML');
  $('#modalFullScreen .modal-body').html(
      $(this).closest('#dashboardGrid .item').html());
  let $canvas = $(this).closest('.item')
  let id_grid = $canvas.data().idAsoc;
  let id_chart = $canvas.data().idChart;
  let $chart_type = $(this).closest('#dashboardGrid .item').find(
      '.dashboard-type-select');
  let new_id = id_grid + "_max";
  $('#modalFullScreen').attr('data-id-asoc', id_grid);
  $('#modalFullScreen').attr('data-trigger', '#chart_' + id_grid);
  $('#modalFullScreen').attr('data-id-chart', id_chart);
  $('#modalFullScreen').addClass('trigger-functions');
  $('#modalFullScreen .modal-body canvas').prop('id', new_id);
  let checkToggle = true;
  doGetJson('api/dashboard/userCharts', null, null, null).done(function (response) {
    for (let i in response) {
      let chart = response[i];
      if (chart.id == id_grid) {
        getChartDataAndCreate(id_chart, new_id, chart.filters, 'bar', checkToggle);
      }
    }
  });
  $('#modalFullScreen').modal('show');
});

async function getChartsList() {
  let charts = [];
  await doGetJson('api/dashboard/userGroups', null, null, null).done(async function (response) {
    charts = response;
  });
  return charts;
}

async function showChartsList() {
  let charts = await getChartsList();
  $('#modalAddElements .elements-container').html('');
  charts.forEach(function (chart) {
    let template = `<div class=" card-to-add" data-id-chart="${chart.id}">
        <div class="card-to-add-header">
            <span>${chart.chartName}</span>
        </div>
        <div class="card-to-add-body">
            <div class="card-to-add-body-body">${chart.description}</div>
            <div class="card-to-add-body-body"><img src="${chart.urlImg}"></div>
        </div>
    </div>`;
    $('#modalAddElements .elements-container').append(template);
    $('#modalAddElements').modal('show');
  });
}

function checkNrOfDashboardsOnAdd($item) {
  if ($('#dashboardGrid').children().length < 10) {
    if ($item) {
      selectChart($item);
    } else {
      showChartsList();
    }
  } else {
    swalGeneral('Atenție', 'Ai atins limita de 10 cadrane', 'warning');
  }
}

function selectChart(ctrlChart) {
  let id_chart = $(ctrlChart).data().idChart;
  $.getJSON('api/dashboard/getHtmlById/' + id_chart).done(
      async function (response) {
        let chart = response;
        chart.idChart = response.id;
        saveChartByUser(chart);
      });
  $('#modalAddElements').modal('hide');
}

function saveChartByUser(chart, idAsoc) {
  let filters = []

  filters = getChartFilters(idAsoc, chart.idChart);
  $.post('api/dashboard/saveChartByUser', {
        idChart: chart.idChart,
        id: idAsoc,
        filters: JSON.stringify(filters)
      }, null,
      'json').done(async function (responseAsoc) {
    chart.id = responseAsoc.id;
    addChartToGrid(chart, idAsoc, responseAsoc);
  });
}

function addChartToGrid(asocChart, idAsoc, filters) {
  if (grid) {
    let $chartHtml = $(asocChart.html.replaceAll("DeInlocuit", asocChart.id));
    if (idAsoc == undefined) {
      let item = generateHTMLChart($chartHtml, asocChart);
      let chartsLength = grid.getItems().length;
      grid.show(grid.add(item, {index: chartsLength}), {
        onFinish: function (items) {
          getChartDataAndCreate(asocChart.idChart, asocChart.id, filters ? filters.filters : asocChart.filters, 'bar');
        }
      });
    } else {
      getChartDataAndCreate(asocChart.idChart, asocChart.id, filters.filters, 'bar');
    }
  }
  countDashboards();
};

$(document).on('click', '.card-to-add', function () {
  selectChart(this);
});

function layoutEnd(item, event) {
  let asocs = grid.getItems().map(function (item, index) {
    return {id: item.getElement().getAttribute('data-id-asoc'), sequence: index};
  });
  ;
 /* doPostJson('api/dashboard/updateChartsOrderByUser', asocs,).done(function (test) {
  });*/
}

function generateHTMLChart(contentHTML, asocChart) {
  let ret = [];

  let $item_content = $('<div></div>')
      .addClass('item-content')
      .html(contentHTML);

  $item_content.find('.info-container li').html(asocChart.description)

  let $item = $('<div></div>')
      .addClass('item').addClass('col').addClass('trigger-functions').addClass(asocChart.width).addClass(asocChart.height)
      .attr('data-id-chart', asocChart.idChart)
      .attr('data-id-asoc', asocChart.id)
      .attr('data-filters', asocChart.filters)
      .attr('id', 'chart_' + asocChart.id)
      .append($item_content);

  $("#dashboardGrid").append($item);
  ret.push($item[0]);
  return ret;
}

function getChartDataAndCreate(idChart, idCanvas, filters, chartType, checkToggle) {
  functiiChart[idChart](idChart, idCanvas, chartType, filters, checkToggle);

}

let functiiChart = {
  '5': function (idCanvas, chartType) {
    createChart(idCanvas, chartType, dataCtxBins, configChartCtxBins);
  },
  '1': function (idCanvas, chartType) {
    createChart(idCanvas, chartType, dataCtxContracts, configChartCtxContracts)
  },
  '2': function (idChart, idCanvas, chartType, filters, checkToggle) {
    chartTotalCollects(idChart, idCanvas, chartType, filters, checkToggle);
  },
  '3': function (idCanvas, chartType) {
    createChart(idCanvas, chartType, dataCtxProblems, configChartCtxProblems)
  },
  '7': function (idChart, idCanvas, chartType, filters, checkToggle) {
    chartNumarColectari(idChart, idCanvas, chartType, filters, checkToggle)
  },
  '8': function (idChart, idCanvas, chartType, filters, checkToggle) {
    chartBinsAllocated(idChart, idCanvas, chartType, filters, checkToggle)
  },
  '9': function (idChart, idCanvas, chartType, filters, checkToggle) {
    chartCollectsAndLandfills(idChart, idCanvas, chartType, filters, checkToggle)
  },
  '10': function (idChart, idCanvas, chartType, filters, checkToggle) {
    chartComplaints(idChart, idCanvas, chartType, filters, checkToggle)
  }
};

function getChartsByUserAsoc() {
  doGetJson('api/dashboard/userCharts', null, null, null).done(function (response) {
    for (let i in response) {
      let chart = response[i];
      addChartToGrid(chart);
    }
    ;
    countDashboards();
    //setTimeout(function () {
    //  grid.refreshItems().layout();
    //}, 500);
    $("#idLoading").hide();
    $("#imgLoading").hide();
  });
}

$(function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function (start, end, label) {
  });
});

function countDashboards() {
  $('#counter').text('');
  let counterDash = $('#dashboardGrid').children().length;
  $('#counter').append(counterDash);
}

function resizeCharts() {
  $('#dashboardGrid .item canvas').each(function () {
    Chart.getChart(this.id).resize();
  })
}

function syncArraysContr(ctr, arr) {
  for (i in arr) {
    for (l in ctr) {
      if (!arr[i].some(function (e) {
        return e.date === ctr[l].date
      })) {
        arr[i].splice(l, 0, ctr[l]);
      }
    }
  }
}

var ctrArrContr = [
  {qty: 0, um: "", date: "Jan", luna_end: ""},
  {qty: 0, um: "", date: "Feb", luna_end: ""},
  {qty: 0, um: "", date: "Mar", luna_end: ""},
  {qty: 0, um: "", date: "Apr", luna_end: ""},
  {qty: 0, um: "", date: "May", luna_end: ""},
  {qty: 0, um: "", date: "Jun", luna_end: ""},
  {qty: 0, um: "", date: "Jul", luna_end: ""},
  {qty: 0, um: "", date: "Aug", luna_end: ""},
  {qty: 0, um: "", date: "Sep", luna_end: ""},
  {qty: 0, um: "", date: "Oct", luna_end: ""},
  {qty: 0, um: "", date: "Nov", luna_end: ""},
  {qty: 0, um: "", date: "Dec", luna_end: ""}
];

function getContracteColect(an, idUat) {
  var rap = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "api/dashboard/collects",
    data: {year: an, idUat: idUat.idUat == undefined ? idUat : idUat.idUat},
    success: function (response) {
      rap = response;
    }
  });

  return rap;
}

function chartTotalCollects(idChart, idCanvas, chartType, filters, checkToggle) {
  let date = $.parseJSON(filters)
  if (idCanvas.toString().indexOf("max") < 0) {
    $(".item[data-id-asoc = '" + idCanvas + "']").data().filters = filters;
  } else {
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().filters = filters;
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idAsoc = idCanvas.replace("_max", "");
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idChart = idChart;

  }
  let compDate = date.length > 1 ? date[1].secondCompDate : null

  $/*('#chart_'+idCanvas).data().filters = filters;*/
  // date[2] = date[2] || {"idUat" : 0};
  let idUat = date.length > 1 ? date[2] ? date[2].idUat : date[2] = {"idUat": 0} : date[2] = {"idUat": 0}
  // let idUat = (date[2] ? date[2].idUat : 0 );
  var rap = getContracteColect(date.length > 1 ? date[0].firstCompDate : moment().year(), idUat);
  $("#" + idCanvas + "_text_uat").text(date.length > 1 ? date[2].idUat == 0 ? "Toate UAT-urile" : date[2].name : "")
  $("#" + idCanvas + "_text_interval").text(date.length > 1 ? date[0].firstCompDate : moment().year())

  $("#" + idCanvas + "_text_interval_comp").text(compDate ? " - " + compDate : "")
  rap = groupBy(rap.length > 0 ? rap : [{
    qty: 0,
    um: "L" + date[0].firstCompDate,
    date: "Ian",
    lunaEnd: date[0].firstCompDate + "-01-01"
  }], 'um')
  syncArraysContr(ctrArrContr, rap);
  if (compDate) {
    var rapAnt = getContracteColect(date[1].secondCompDate, idUat);
    var raspAnt = groupBy(rapAnt.length > 0 ? rapAnt : [{
      qty: 0,
      um: "L" + compDate,
      date: "Ian",
      lunaEnd: compDate + "-01-01"
    }], 'um')
    syncArraysContr(ctrArrContr, raspAnt);

  }

  //app.vectCuloriAppRandomNou=["#504d44", "#504d44", "#504d44", "#504d44", "#504d44", "#504d44"];

  var vectQty = [];
  var vectDate = [];
  var vectLuni = {};
  // ["#effc00", "#e8c979", "1ecbe1"]
  var datasets = [];
  var rasp = rap;
  syncArraysContr(ctrArrContr, rasp);
  for (const key in rasp) {
    if (key !== "") {
      rgb = getRandomMixed(app.vectCuloriAppRandomNouDark, app.vectCuloriAppRandomNouLight, 2)
      datasets.push(
          {
            label: key,
            borderWidth: 2,
            borderColor: rgb[0],
            backgroundColor: rgb[2],
            pointRadius: 2,
            pointBackgroundColor: rgb[0],
            pointBorderColor: rgb[0],
            pointHoverBackgroundColor: rgb[2],
            tension: 0.3,
            pointHoverRadius: 5,
            data: groupByArr(rasp[key], 'qty')
          }
      );
    }
  }
  for (const key in raspAnt) {
    if (compDate) {
      if (key !== "") {
        datasets.push(
            {
              label: key,
              borderWidth: 2,
              borderDash: [10, 5],
              borderColor: rgb[1],
              backgroundColor: rgb[3],
              pointRadius: 2,
              pointBackgroundColor: rgb[1],
              pointBorderColor: rgb[0],
              tension: 0.3,
              pointHoverRadius: 5,
              data: groupByArr(raspAnt[key], 'qty'),
              yAxisID: 'y',
            }
        );
      }
    }
  }
  var a = groupByArr(Object.values(rap)[0], 'date');
  vectDate = a.filter(function (item, pos) {
    return a.indexOf(item) == pos;
  });

  var a = groupByArr(Object.values(rap)[0], 'lunaEnd');
  vectLuni = a.filter(function (item, pos) {
    return a[pos] == item;
  });

  if (compDate) {
    antDate = groupByArr(Object.values(raspAnt)[0], 'date');
    vectDateAnt = antDate.filter(function (item, pos) {
      return antDate.indexOf(item) == pos;
    });

    antLuni = groupByArr(Object.values(raspAnt)[0], 'lunaEnd');
    vectLuniAnt = antLuni.filter(function (item, pos) {
      return antLuni.indexOf(item) == pos;
    });
  }

  if (vectQty.length != 0) {
    if (charturi[idCanvas] != null) {
      charturi[idCanvas].destroy();
    }
  }
  // for(var i=0; i< raport.length; i++){
  //     vectQty.push(raport[i].qty);
  //     vectDate.push(raport[i].date);
  //     vectLuni[raport[i].date] = raport[i].lunaEnd;
  // }


  if (datasets.length != 0) {
    if (charturi[idCanvas] != null) {
      charturi[idCanvas].destroy();
    }
  }

  let newId;
  if (checkToggle) {
    newId = idCanvas;
  }
  let ctx = document.getElementById(newId ? newId : idCanvas + "_chart_colectare");
  if (checkToggle) {
    $("#" + idCanvas + "_chart_colectare").attr('id', newId + "_max_chart_colectare")
  }


  /**/
  let chart = new Chart(ctx, {
    data: {
      labels: vectDate,
      datasets: datasets/*[{
                        index: 0,
                        data: vectQty,
                        backgroundColor: "green",
                        label: "Cantitate colectata"
                    }]*/,
    },
    type: "line",
    options: {
      showAllTooltips: true,
      responsive: true,

      plugins: {
        legend: {
          display: true,
          // this toggles on / off the confidence intervals
          labels: {
            // filter: function(item, chart) {
            //   console.log("TESTTTTTT !!!!!!!!!!");
            //   return item.text.includes(app.compCadranDate[idCanvas].getItem('firstCompDate'));
            // }
          },
          onClick: function (e, legendItem) { // need to hide index -1 and index +1
            var index = legendItem.datasetIndex;
            var ci = chart;
            var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
            var firstItm = ci.getDatasetMeta(index);
            var secondItm = undefined;
            for (let iterator = 0; iterator <= 5; iterator++) {
              if (ci.getDatasetMeta(iterator).label !== firstItm.label && ci.getDatasetMeta(iterator).label.includes(firstItm.label.charAt(0))) {
                secondItm = ci.getDatasetMeta(iterator);
              }
            }
            if (!alreadyHidden) {
              firstItm.hidden = true;
              secondItm == undefined ? '' : secondItm.hidden = true;
            } else {
              firstItm.hidden = null;
              secondItm == undefined ? '' : secondItm.hidden = null;
              ;
            }

            ci.update();
          },
          position: "top",
        },
        tooltips: {
          mode: 'label',
        },
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
      },
      maintainAspectRatio: true,
    }
  });
  charturi[idCanvas] = chart;
  chart.render(true);
  chart.update();

  ctx.onclick = function (evt) {
    var activePoints = chart.getElementsAtEventForMode(evt, 'nearest', {intersect: false}, true);
    if (activePoints[0]) {
      activePoints.forEach((line) => {
        const dataset = line.datasetIndex;
        const datapoint = line.index;
        var fp = activePoints[0];
        var chartData = chart.data;
        var stare = chartData.labels[fp.index];
        if ((vectLuni[datapoint] || '') == '') {
          return;
        }
        var data_start = dataset <= 2 ? vectLuni[datapoint].substring(0, 7) + '-01 00:00' : antLuni[datapoint].substring(0, 7) + '-01 00:00';
        var data_end = dataset <= 2 ? vectLuni[datapoint] + " 00:00" : antLuni[datapoint] + " 00:00";
        let customFilters = [];
        customFilters.push(buildFilter("insertedAtStart", "GREATER_THAN_OR_EQUAL_TO", data_start));
        customFilters.push(buildFilter("insertedAtEnd", "LESS_THAN_OR_EQUAL_TO", data_end));
        if (idUat.idUat == undefined) {
          customFilters.push(buildFilter("idUat", "EQUALS", idUat));
        }

        const view = document.querySelectorAll('[href="#pageColectari"]');
        $(view).next().addClass('show');
        viewCollects(customFilters);
        // getCollectsTable();

      });
    }
  };
}

function chartNumarColectari(idChart, idCanvas, chartType, filters, checkToggle) {
  let filter = $.parseJSON(filters)

  if (idCanvas.toString().indexOf("max") < 0) {
    $(".item[data-id-asoc = '" + idCanvas + "']").data().filters = filters;
  } else {
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().filters = filters;
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idAsoc = idCanvas.replace("_max", "");
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idChart = idChart;
  }

  let dataStart = filter.length > 1 ? filter[0].dataStart.substring(0, 10) : moment();
  let dataStop = filter.length > 1 ? filter[1].dataStop.substring(0, 10) : moment();
  let idUat = filter.length > 1 ? filter[2] ? filter[2].idUat : 0 : 0

  var rap = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "api/dashboard/collects/count",
    data: {dataStart: dataStart, dataStop: dataStop, idUat: idUat},
    success: async function (response) {
      rap = response;
      $("#" + idCanvas + "_text_uat").text(rap.length > 2 ? "Toate UAT-urile" : rap.length < 1 ? await getUatName(idUat) : rap[0].name)
      $("#" + idCanvas + "_text_interval").text(moment(dataStart, 'YYYY-MM-DD').format('DD.MM.YYYY') + " - " + moment(dataStop, 'YYYY-MM-DD').format('DD.MM.YYYY'));
      $("#" + idCanvas + "_total_colectari").text(rap.length > 1 ? rap[0].total : "0")
    }

  });


  /*$.ajax({type: "GET",
    async : true,
    url: app.contextPath +"/dashboard/getFacturiEmise",
    data: {"wmtoken": Cookies.get('wmtoken'),
      data_start : app.startTransf[idcad],
      data_end : app.endTransf[idcad]
    },
    success: function (response) {
      console.log("facturi emise",response);
      var vectValori=[];
      var vectLabel=[];
      var rgb=[];
      //app.vectCuloriAppRandomNou=["#416319,#e3e5ce,rgb(14, 21, 6),rgb(143, 187, 115),rgb(97, 151, 36),rgb(62, 127, 172),rgb(129, 143, 66),rgb(27, 44, 12),rgb(169, 81, 17),rgb(55, 86, 108)"];
      facturi = response[0];
      console.log("facturi emise Crisss",response);

      suma = 0;
      sumaPj=0;
      sumaPf=0;
      facturi = response[0];
      for (m in facturi ){
        if (facturi[m] !=undefined){
          suma +=facturi[m].count;
          aa=facturi[m].description.toLowerCase();
          aa=aa.slice(0, 2);
          console.log("criss test>>> ", aa);
        }if(aa == 'pj'){
          sumaPj += facturi[m].count;
        }if(aa == 'pf'){
          sumaPf += facturi[m].count
        }
        else{
          document.getElementById(idcad+"_"+aa).innerHTML = 0;
        }
      }
      document.getElementById(idcad+"_"+"pj").innerHTML = sumaPj;
      document.getElementById(idcad+"_"+"pf").innerHTML = sumaPf;
      document.getElementById(idcad+"_toate").innerHTML = suma;

      document.getElementById(idcad + "_" + "pf").addEventListener("click",function(){
        app.filters.facturi.data_start = app.startTransf[idcad];
        app.filters.facturi.data_end = app.endTransf[idcad];
        app.filters.facturi.tip_client = 16
        const view = document.querySelectorAll('[href="#pageFacturi"]');
        $(view).next().addClass('show');
        viewFacturi(0);
      })

      document.getElementById(idcad + "_" + "pj").addEventListener("click",function(){
        app.filters.facturi.data_start = app.startTransf[idcad];
        app.filters.facturi.data_end = app.endTransf[idcad];
        app.filters.facturi.tip_client = 17
        const view = document.querySelectorAll('[href="#pageFacturi"]');
        $(view).next().addClass('show');
        viewFacturi(0);
      })

      document.getElementById(idcad + "_toate").addEventListener("click",function(){
        app.filters.facturi.data_start = app.startTransf[idcad];
        app.filters.facturi.data_end = app.endTransf[idcad];
        const view = document.querySelectorAll('[href="#pageFacturi"]');
        $(view).next().addClass('show');
        viewFacturi(0);
      })



      try{document.getElementById(idcad+"_textPrecomplInterval").innerHTML=app.intervalDashNou[idcad];}catch(er){}




      /!* $('#'+ idcad + "_colectare").on('click', function(){
           app.filters.contract_colectare.data_start = app.startTransf[idcad];
           app.filters.contract_colectare.data_end = app.endTransf[idcad];

       });*!/

    }


  });
*/
};

function chartBinsAllocated(idChart, idCanvas, chartType, filters, checkToggle) {
  let filter = $.parseJSON(filters)

  if (idCanvas.toString().indexOf("max") < 0) {
    $(".item[data-id-asoc = '" + idCanvas + "']").data().filters = filters;
  } else {
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().filters = filters;
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idAsoc = idCanvas.replace("_max", "");
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idChart = idChart;
  }

  let dataStart = filter.length > 1 ? filter[0].dataStart.substring(0, 10) : moment();
  let dataStop = filter.length > 1 ? filter[1].dataStop.substring(0, 10) : moment();
  let idUat = filter.length > 1 ? filter[2] ? filter[2].idUat : 0 : 0

  var rap = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "api/dashboard/bins/allocated",
    data: {dataStart: dataStart, dataStop: dataStop, idUat: idUat},
    success: async function (response) {
      rap = response;
      $("#" + idCanvas + "_text_uat").text(rap.length > 2 ? "Toate UAT-urile" : rap.length < 1 ? await getUatName(idUat) : rap[0].name)
      $("#" + idCanvas + "_text_interval").text(moment(dataStart, 'YYYY-MM-DD').format('DD.MM.YYYY') + " - " + moment(dataStop, 'YYYY-MM-DD').format('DD.MM.YYYY'));
      $("#" + idCanvas + "_total_pubele_alocate").text(rap.length > 1 ? rap[0].total : "0")
    }

  });
}

function saveUpdateChart(idAsoc, idChart) {
  $.getJSON('api/dashboard/getHtmlById/' + idChart).done(
      async function (response) {
        let chart = response;
        chart.idChart = response.id;
        saveChartByUser(chart, idAsoc);
      });
}

function chartCollectsAndLandfills(idChart, idCanvas, chartType, filters, checkToggle) {
  let filter = $.parseJSON(filters)

  if (idCanvas.toString().indexOf("max") < 0) {
    $(".item[data-id-asoc = '" + idCanvas + "']").data().filters = filters;
  } else {
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().filters = filters;
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idAsoc = idCanvas.replace("_max", "");
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idChart = idChart;
  }

  let dataStart = filter.length > 1 ? filter[0].dataStart.substring(0, 10) : moment();
  let dataStop = filter.length > 1 ? filter[1].dataStop.substring(0, 10) : moment();
  let idUat = filter.length > 1 ? filter[2] ? filter[2].idUat : 0 : 0
  let idUm = filter.length > 1 ? filter[3] ? filter[3].idUm : "L" : "L";
  let firstEl = ''
  let checkDifUm = false;
  let checkSameUat = false;
  var rap = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "api/dashboard/collects/landfills",
    data: {dataStart: dataStart, dataStop: dataStop, idUat: idUat, um: idUm},
    success: async function (response) {
      let collect_qty = 0;
      let pv_qty = 0;
      let collect_um = '';
      let pv_um = '';
      response.forEach(function (res) {
        if (response.length > 2) {
          firstEl = response[0].uat
          if (firstEl !== res.uat) {
            checkSameUat = true;
          }
        }
        if ((res.collect_um || '') != '') collect_um = res.collect_um;
        if ((res.pv_um || '') != '') pv_um = res.pv_um;
        collect_qty += res.collect_qty;
        pv_qty += res.pv_qty;
      })
      rap = response;
      $("#" + idCanvas + "_text_uat").text(rap.length > 0 ? checkSameUat ? "Toate UAT-urile" : rap.length < 1 ? await getUatName(idUat) : rap[0].uat : await getUatName(idUat))
      $("#" + idCanvas + "_text_interval").text(moment(dataStart, 'YYYY-MM-DD').format('DD.MM.YYYY') + " - " + moment(dataStop, 'YYYY-MM-DD').format('DD.MM.YYYY'))
      $("#" + idCanvas + "_tomberoane").text(collect_qty + ' ' + collect_um);
      $("#" + idCanvas + "_groapa").text(pv_qty + ' ' + pv_um);
    }

  });
}

function chartComplaints(idChart, idCanvas, chartType, filters, checkToggle) {
  let filter = $.parseJSON(filters)

  if (idCanvas.toString().indexOf("max") < 0) {
    $(".item[data-id-asoc = '" + idCanvas + "']").data().filters = filters;
  } else {
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().filters = filters;
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idAsoc = idCanvas.replace("_max", "");
    $("#modalFullScreen[data-id-asoc = '" + idCanvas.replace("_max", "") + "']").data().idChart = idChart;
  }

  let dataStart = filter.length > 1 ? filter[0].dataStart.substring(0, 10) : moment();
  let dataStop = filter.length > 1 ? filter[1].dataStop.substring(0, 10) : moment();
  let idUat = filter.length > 1 ? filter[2] ? filter[2].idUat : 0 : 0

  var rap = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "api/dashboard/complaints",
    data: {dataStart: dataStart, dataStop: dataStop, idUat: idUat},
    success: async function (response) {
      rap = response;
      $("#" + idCanvas + "_text_uat").text(rap.length > 2 ? "Toate UAT-urile" : rap.length < 1 ? await getUatName(idUat) : rap[0].name)
      $("#" + idCanvas + "_text_interval").text(moment(dataStart, 'YYYY-MM-DD').format('DD.MM.YYYY') + " - " + moment(dataStop, 'YYYY-MM-DD').format('DD.MM.YYYY'));
      $("#" + idCanvas + "_total_complaints").text(rap.length > 1 ? rap[0].count : "0")
    }

  });
}

/*$(document).on('click', '.cfe-menuOptions.max', function(){se
  toggleMinMaxChart(this.id);
});

function toggleMinMaxChart(id){
  $("#c-maskUpload-dashboard").toggleClass('is-active');
  const index = "chart_" + id.split("_")[0];
  if(!$("#"+index).hasClass('muuri-resize-cadran') && !$("#"+index).hasClass('muuri-resize-cadran-max')){
    $("#"+id).toggleClass('fa-expand').toggleClass('fa-compress');
  }else{
    $("#"+id).toggleClass('fa-compress').toggleClass('fa-expand');
  }
  if($("#"+index).hasClass('muuri-resize-cadran')){
    $("#"+index).removeClass('muuri-resize-cadran')
    if($("#"+id).hasClass('fa-expand')){
      return
    }else{
      $("#"+id).removeClass('fa-compress')
      $("#"+id).addClass('fa-expand')
    }
  }else{
    $("#"+index).toggleClass('muuri-resize-cadran-max')
  }
  grid.getItems().forEach(item => {
    //daca il face mare
    if($("#"+index).hasClass('muuri-resize-cadran-max')){
      if(!item._drag) return;
      item._drag.destroy();
      item._drag = null;
    }
    //daca il face mic
    if(!$("#"+index).hasClass('muuri-resize-cadran-max')){
      if(item._drag) return;
      item._drag = new Muuri.ItemDrag(item);
    }
  });
}*/

function getChartFilters(idAsoc, idChart) {
  let filters = []

  if (idChart == 7 || idChart == 8 || idChart == 9 || idChart == 10) {
    filters.push(app.dataStart[idAsoc] == undefined ? {'dataStart': moment()} : app.dataStart[idAsoc])
    filters.push(app.dataStop[idAsoc] == undefined ? {'dataStop': moment()} : app.dataStop[idAsoc])
    filters.push(app.idUat[idAsoc] == undefined ? {'idUat': 0} : app.idUat[idAsoc].idUat == undefined ? app.idUat[idAsoc].idUat = 0 : app.idUat[idAsoc])
    if (idChart == 9) {
      filters.push(app.idUm[idAsoc] == undefined ? {'idUm': 'L'} : app.idUm[idAsoc])
    }
  } else {
    filters.push(app.initialDate[idAsoc] == undefined ? {'firstCompDate': moment().year()} : app.initialDate[idAsoc].firstCompDate ? app.initialDate[idAsoc] : {'firstCompDate': moment().year()})
    filters.push(app.compDate[idAsoc] == undefined ? {'secondCompDate': null} : app.compDate[idAsoc])
    filters.push(app.idUat[idAsoc] == undefined ? {'idUat': 0} : app.idUat[idAsoc].idUat == undefined ? app.idUat[idAsoc].idUat = 0 : app.idUat[idAsoc])
  }

  return filters;
}

function selectUat(id) {
  let idAsoc = $("#" + id).data().idAsoc;
  let idUat = $("#" + id).val();
  let nameUat = $("#" + id + " option:selected").text();

  app.idUat[idAsoc] = {"idUat": idUat, "name": nameUat};
}

function selectUm(id) {
  let idAsoc = $("#" + id).data().idAsoc;
  let idUm = $("#" + id).val();
  let nameUm = $("#" + id + " option:selected").text();

  app.idUm[idAsoc] = {"idUm": idUm, "name": nameUm};
}

async function getUatName(idUat) {
  let uatName = "Toate UAT-urile"
  await doGetJson('api/uats/user').done(async function (response) {
    response.forEach(function (uats) {
      if (uats.id == idUat) {
        uatName = uats.name;
      }
    })
  });

  return uatName;


}

async function getUmName(idUm) {
  let um = ""
  await doGetJson('api/noms/ums').done(async function (response) {
    response.forEach(function (ums) {
      if (ums.id == idUm) {
        um = ums.id;
      }
    })
  });

  return um;

}