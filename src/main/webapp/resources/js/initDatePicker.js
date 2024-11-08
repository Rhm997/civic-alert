
function initYearPicker(selector, idChart, year= null) {

/*  $(selector).each(function () {
    $(this).daterangepicker(cfg_range_picker, function (start, end, label) {
      console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
  });*/

  $(selector).yearpicker({
    year: year,
    onChange: function(value) {
      if(value.$element.attr('id').indexOf("new_date_picker") == 0) {
        app.initialDate[idChart] = {'firstCompDate': value.year};
      }
      if(value.$element.attr('id').indexOf("comp_date_picker") == 0)
        app.compDate[idChart] = {'secondCompDate': value.year};

    }
  });

/*  $(selector).daterangepicker({
    format:   "YYYY",
    viewMode:   "years",
  });*/

}

let cfg_range_picker = {
  "showDropdowns": true,
  "timePicker": true,
  "timePicker24Hour": true,
  "timePickerIncrement": 15,
  "autoApply": true,
  ranges: {
    'Azi': [moment(), moment()],
    'Ieri': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Ultimele 7 zile': [moment().subtract(6, 'days'), moment()],
    'Ultimele 30 zile': [moment().subtract(29, 'days'), moment()],
    'Luna curentă': [moment().startOf('month'), moment().endOf('month')],
    'Luna anterioară': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  "locale": {
    "format": "DD.MM.YYYY HH:mm",
    "separator": " - ",
    "applyLabel": "Aplică",
    "cancelLabel": "Renunță",
    "fromLabel": "De la",
    "toLabel": "Până la",
    "customRangeLabel": "Altă data",
    "weekLabel": "W",
    "daysOfWeek": [
      "Du",
      "Lu",
      "Ma",
      "Mi",
      "Jo",
      "Vi",
      "Sâ"
    ],
    "monthNames": [
      "Ianuarie",
      "Februarie",
      "Martie",
      "Aprilie",
      "Mai",
      "Iunie",
      "Iulie",
      "August",
      "Septembrie",
      "Octombrie",
      "Noviembrie",
      "Decembrie"
    ],
    "firstDay": 1
  },
  "alwaysShowCalendars": true,
  "startDate": moment(),
  "endDate": moment(),
  "drops": "auto",
  "applyButtonClasses": "btn-primary",
  "cancelButtonClasses": "btn-secondary"
};

function initDateRangePicker(selector, idChart, dataStart, dataStop) {
  $(selector).each(function () {
    $(this).daterangepicker({startDate: moment(dataStart), endDate: moment(dataStop)}, function (start, end, label) {
        app.dataStart[idChart] = {"dataStart": moment(dataStart, 'YYYY-MM-DD').format('YYYY-MM-DD') == start.format('YYYY-MM-DD') ? moment(dataStart, 'YYYY-MM-DD') : start.format('YYYY-MM-DD') }
        app.dataStop[idChart] = {"dataStop": moment(dataStop, 'YYYY-MM-DD').format('YYYY-MM-DD') == start.format('YYYY-MM-DD') ? moment(dataStop, 'YYYY-MM-DD') : end.format('YYYY-MM-DD') };
      });
  });

}