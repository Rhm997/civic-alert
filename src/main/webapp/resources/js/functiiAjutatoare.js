app.templatePop = '<div class="popover" role="tooltip" style="max-width:unset; border-color:white"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body tooltip-inner" style="text-align: left; max-width: unset;"></div></div>';

dualListCfg = {
    availableTitle: "Opțiuni disponibile",
    selectedTitle: "Opțiuni selectate",
    addButtonText: ">",
    removeButtonText: "<",
    addAllButtonText: ">>",
    removeAllButtonText: "<<",

    sortable: true,
    upButtonText: "ᐱ",
    downButtonText: "ᐯ"
};

$(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
});

//$('a[href="#"]').click(function(e){e.preventDefault();});

function setMenuPage(page) {
    if (typeof page != 'undefined') {
        $("#sidebar ul a").attr("selectat", false);
        $('#sidebar ul a[data-page="' + page + '"]').attr("selectat", true);
        ;
    }
}

function triggerPop() {
    $('[data-bs-toggle="popover"]').popover({
        trigger: 'click hover',
        html: true,
        template: app.templatePop
    })
}

function rround(valoare, nrZecimale) {
    let zecimale = 2;
    if (nrZecimale != null) {
        if (!isNaN(nrZecimale)) {
            zecimale = nrZecimale;
        }
    }

    let rndValue = round(parseFloat(valoare), zecimale);
    return rndValue;
}

function round(value, decimals) {

    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

}

function fmt(value, decimals) {
    return value.toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
        ",")
}

function unfmt(value) {
    return value.replace(/,/g, "")
}

// function makeDataRangePicker() {
//   let format = 'DD.MM.YYYY'; //  HH:mm
//   let config = {
//     // "autoUpdateInput": false,
//     "singleDatePicker": true,
//     "timePicker": false,
//     "timePicker24Hour": false,
//     "locale": {
//       "format": format,
//       "separator": " - ",
//       "applyLabel": "Aplică",
//       "cancelLabel": "Renunță",
//       "fromLabel": "De la",
//       "toLabel": "Până la",
//       "customRangeLabel": "Custom",
//       "weekLabel": "W",
//       "daysOfWeek": ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa'],
//       "monthNames": ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai',
//         'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie',
//         'Decembrie'],
//       "firstDay": 1
//     },
//     "linkedCalendars": false,
//     "alwaysShowCalendars": true,
//     "drops": "auto",
//     "startDate": moment().format(format),
//     "timePickerIncrement": 1,
//     autoClose: true
//   }
//   $(".daterange").each(function () {
//     config.autoUpdateInput = true;
//     if ($(this).hasClass('no-auto-update') && ($(this).data('value') || $(this).val()) == '') {
//       config.autoUpdateInput = false;
//     } else {
//       $(this).data('value', $(this).data('value') || moment().format('YYYY-MM-DD HH:mm:00'));
//     }
//
//     $(this).daterangepicker(config, function (start, end, label) {
//       // console.log(
//       //     'New date range selected: ' + start.format('YYYY-MM-DD') + ' to '
//       //     + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
//     });
//
//     if ($(this).data('value') != '') {
//       $(this).data('daterangepicker').setStartDate(new Date($(this).data('value')));
//     }
//     // $(this).on('change', function (ev) {
//     //   $(this).Close();
//     // });
//     $(this).on('apply.daterangepicker', function (ev, picker) {
//       // console.log(picker.startDate, picker.startDate.format('YYYY-MM-DD HH:mm'))
//       $(this).data('value', picker.startDate.format('YYYY-MM-DD HH:mm:00'));
//       $(this).val(picker.startDate.format(format));
//     });
//     $(this).on('cancel.daterangepicker', function (ev, picker) {
//       $(this).data('value', '');
//       $(this).val('');
//     });
//   });
//
// }

function makeDataPiker() {
    let format = 'dd.mm.yy';
    $("[type='date']").addClass('datepicker').attr('type', 'text');
    $.datepicker.regional['ro'] = {
        closeText: 'Șterge',
        prevText: '<Ant',
        nextText: 'Urm>',
        monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
            'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
        monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug',
            'Sep', 'Oct', 'Noi', 'Dec'],
        dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri',
            'Sambata'],
        dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam'],
        dayNamesMin: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa'],
        weekHeader: 'Sm',
        dateFormat: format,
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2100', // set the range of years
        isRTL: false,
        showOtherMonths: true,
        selectOtherMonths: true,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ro']);

    let options = {
        showButtonPanel: true,
        constrainInput: false,
        onClose: function (dateText, obj) {
            let d = $.datepicker.parseDate(format, dateText);
            let date = $.datepicker.formatDate("yy-mm-dd 00:00", d);
            if ($(this).hasClass('datepicker')) {
                date = $.datepicker.formatDate("yy-mm-dd", d);
            }
            $(this).data('value', date);
            //buton sterge
            let event = arguments.callee.caller.caller.arguments[0];
            if ($(event.delegateTarget).hasClass('ui-datepicker-close')) {
                $(this).val('');
                $(this).data('value', '');
            }
        },
        beforeShow: function (i) {
            //if ($(i).attr('readonly')) { return false; }
        }
    };

    let additionalOptions = $(this).data("datepicker");
    jQuery.extend(options, additionalOptions);

    $(".datepicker").each(function () {
        $(this).data('value', $(this).data('value') || '');

        $(this).datepicker(options);

        if ($(this).data('value') != '') {
            if ($(this).hasClass('datepicker')) {
                $(this).datepicker('setDate', new Date($(this).data('value')))
            }
            if ($(this).hasClass('daterange')) {
                $(this).datepicker('setDate', moment($(this).data('value')).format('YYYY-MM-DD HH:mm'));
            }
        }
    });

    $(".datepicker").attr('readOnly', 'true');
}

function validareCNP(id) {
    let cnp = document.getElementById(id).value;
    if (document.getElementById("tipCetatenie").checked != true) {
        if (cnp.length == 13) {
            let sum = cnp[0] * 2 + cnp[1] * 7 + cnp[2] * 9 + cnp[3] * 1 + cnp[4] * 4
                + cnp[5] * 6 + cnp[6] * 3 + cnp[7] * 5 + cnp[8] * 8 + cnp[9] * 2
                + cnp[10] * 7 + cnp[11] * 9;
            let rest = sum % 11;
            if (((rest < 10) && (rest == cnp[12])) || ((rest == 10) && (cnp[12]
                == 1))) {
                document.getElementById(id).style.borderColor = "";
                return true;
            } else {
                // $("#"+id).val("");
                $("#" + id).attr('placeholder', 'CNP incorect');
                document.getElementById(id).style.borderColor = "#188a15"
                document.getElementById("" + id).focus();
                return false;
            }
        } else if (cnp != "-" && cnp != "") {
            // $("#"+id).val("");
            $("#" + id).attr('placeholder', 'CNP incorect');
            document.getElementById(id).style.borderColor = "#188a15"
            document.getElementById("" + id).focus();
            return false;
        } else {
            document.getElementById(id).style.borderColor = "";
            return true;
        }

    }
}

function makeDataTable(id, nrColoana) {
    let ordering = true;
    if (nrColoana == -1) {
        ordering = false;
        nrColoana = 0;
    }
    $.fn.dataTable.ext.errMode = 'none';

    var footerCbk = function (row, data, start, end, display) {
        var api = this.api(), data;
        CalculateTableSummary(this);
        return;

        /*let api = this.api(), data;

        // Remove the formatting to get integer data for summation
        let intVal = function ( i ) {
            return typeof i === 'string' ?
                i.replace(/[\$,]/g, '')*1 :
                typeof i === 'number' ?
                    i : 0;
        };

        // Total over all pages
        total = api
            .column( 2 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );

        // Total over this page
        pageTotal = api
            .column( 2, { page: 'current'} )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );

        // Update footer
        $('#'+id+' tfoot th:first-child').attr('colspan', getTableColumns(id));
        $( api.column( (0) ).footer() ).html(
            'Valoare totală: ' + rround(total)
        );*/
    }

    if ($.fn.DataTable.isDataTable('#' + id)) {
        $('#' + id).DataTable().destroy();
    }

    let storageKey = id + '_pageLength';

    let savedPageLength = localStorage.getItem(storageKey) ? parseInt(localStorage.getItem(storageKey)) : 10;

    let table = $('#' + id).DataTable({
        /*lengthChange : false,*/
        "deferRender": true,
        "initComplete": function (settings, json) {
            let api = this.api();
            CalculateTableSummary(this);
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "pageLength": savedPageLength,
        dom: '<"dt-header"<"float-left"B><"float-right"f>>tr<"row"<"col-sm-4 pagination-test cate-elements"l><"col-sm-4 pagination-test show-elements"i><"col-sm-4 pagination-test pages-elements"p>>',
        /*columnDefs: [ {
            targets: 6,
            render: function ( data, type, row ) {
                    return type === 'display' && data.length > 10 ?
                        data.substr( 0, 10 ) +'…' :
                        data;
                }
            }
        ],*/
        "footerCallback": footerCbk,
        "ordering": ordering,
        "order": [[nrColoana, "desc"]],
        "buttons": [{
            extend: 'excel',
            text: '<i class="fa-solid fa-file-excel"></i>',
            title: getTitle(),
            filename: getTitle(),
        }, {
            extend: 'colvis',
            text: '<i class="fa-solid fa-table-columns"></i>'
        } /*{ extend: 'pdf', text: 'Export PDF', }*/],
        "language": {
            "lengthMenu": "Afișează _MENU_ linii",
            "zeroRecords": "Nu s-a găsit nimic",
            "info": "Pagina _PAGE_ din _PAGES_",
            "infoEmpty": "Nu există înregistrări",
            "infoFiltered": "(filtrate din _MAX_ totale)",
            "sSearch": "",
            "searchPlaceholder": "Căutare",
            "oAria": {
                "sSortAscending": ": activate to sort column ascending",
                "sSortDescending": ": activate to sort column descending"
            },
            "paginate": {
                "previous": "<i class=\"fas fa-angle-left\"></i>",
                "next": "<i class=\"fas fa-angle-right\"></i>",
                "first": "<i class=\"fas fa-angle-double-left\"></i>",
                "last": "<i class=\"fas fa-angle-double-right\"></i>"
            },
        },
        "pagingType": "full_numbers",
    });
    table.buttons().enable();
    //table.buttons().container().appendTo('#' + id + '_wrapper .dt-buttons');
    makeSmTable('#' + id);


    table.on('length.dt', function (e, settings, len) {
        localStorage.setItem(storageKey, len);
    })

    return table;

}

(function () {

    function removeAccents(data) {
        if (data.normalize) {
            // Use I18n API if avaiable to split characters and accents, then remove
            // the accents wholesale. Note that we use the original data as well as
            // the new to allow for searching of either form.
            return data + ' ' + data
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
        }

        return data;
    }

    let searchType = jQuery.fn.DataTable.ext.type.search;

    searchType.string = function (data) {
        return !data ?
            '' :
            typeof data === 'string' ?
                removeAccents(data) :
                data;
    };

    searchType.html = function (data) {
        return !data ?
            '' :
            typeof data === 'string' ?
                removeAccents(data.replace(/<.*?>/g, '')) :
                data;
    };

}());

function CalculateTableSummary(table) {
    try {

        let intVal = function (i) {
            return typeof i === 'string' ?
                i.replace(/[\$,]/g, '') * 1 :
                typeof i === 'number' ?
                    i : 0;
        };

        let api = table.api();
        api.columns(".sum").eq(0).each(function (index) {
            let column = api.column(index, {search: 'applied'});

            let sum = column
                .data()
                .filter(function (a, b, c) {
                    return $(column.nodes()[b]).data('active') == 1;
                })
                .reduce(function (a, b) {
                    //return parseInt(a, 10) + parseInt(b, 10);
                    if (isNaN(a) || isNaN(b)) {
                        return rround(intVal(a.toString().replace(/[^0-9.-]/g, "")), 2)
                            + rround(intVal(b.toString().replace(/[^0-9.-]/g, "")), 2);
                    } else {
                        return rround(intVal(a), 2) + rround(intVal(b), 2);
                    }
                }, 0);

            if ($(column.footer()).hasClass("Int")) {
                $(column.footer()).html(fmt(rround(sum, 0), 2));
                return true;
            }

            if ($(column.footer()).hasClass("customPercent") && $(
                column.footer()).hasClass("t")) {
                if ($('.customPercent.t').text() == 'NaN %') {
                    $(column.footer()).html(0 + ' %');
                } else {
                    $(column.footer()).html(fmt(rround(
                        parseFloat(unfmt($('.customPercent.cP1').text())) / parseFloat(
                            unfmt($('.customPercent.cP2').text())) * 100, 2), 2) + " %");
                    return true;
                }
            }

            if ($(column.footer()).hasClass("customPercent") && $(
                column.footer()).hasClass("p")) {
                if ($('.customPercent.p').text() == 'NaN %') {
                    $(column.footer()).html(0 + ' %');
                } else {
                    $(column.footer()).html(fmt(rround(
                        parseFloat(unfmt($('.customPercent.cP3').text())) / parseFloat(
                            unfmt($('.customPercent.cP2').text())) * 100, 2), 2) + " %");
                    return true;
                }
            }

            $(column.footer()).html(fmt(rround(sum), 2));

        });
    } catch (e) {
        console.log('Error in CalculateTableSummary');
        console.log(e)
    }
}

$(document).on('keypress', '#raspunsCertSIGN #codeSMS', function (e) {
    let key = e.which;
    if (key == 13) { // the enter key code
        $('#raspunsCertSIGN #codeSMS + button').click();
        return false;
    }
});

function makeSmTable(selector) {
    selector = selector || '.table-xs';
    $(selector).each(function () {
        $table = this;
        $($table).find('thead tr th').each(function () {
            let index = $(this).index() + 1;
            $($table).DataTable().rows().nodes().to$().find(
                'td:nth-child(' + index + ')').attr('data-head', $(this).text());
        });
    });
};

$(document).on("change", ".custom-file-input", function () {
    let fileName = $(this).val().split("\\").pop();
    fileName = fileName == '' ? 'Alegeți fișier' : fileName;
    if ($(this).get(0).files.length > 1) {
        fileName = $(this).get(0).files.length + " fisiere selectate";
    }
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

/*function defaultPhoto() {
    $('#poza_ci').attr('src', 'resources/images/user/bins.jpg');
    console.log('errr poza_ci');
}*/

function enableInput() {
    $("#enableDate").hide();
    $("#saveDate").show();
    $("#disableDate").show();
    $('.neEdit').prop("disabled", false);
    $('.neEdit').closest('.input-box').removeClass('disabled');
    $('.deleteDoc').show();
    $("#hideInputChoose").show();
    // $('.location-point .new-input').not('[data-key=active]').not(
    //     '.location-point:not(.inactive) [data-sub-category=bin_element]').prop(
    //     'disabled',
    //     true);
    // $('.location-point .new-input').not('.active-box').not(
    //     '.location-point:not(.inactive) [data-sub-category=bin_element]').closest(
    //     '.input-box').addClass('disabled');
}

function openModal(el) {
    $(el).modal('show');
}

function closeModal(el) {
    $(el).modal('hide');
}

$(document).on('hidden.bs.modal', '.modal', function (e) {
    $(this)
        .find("input.clear-data, textarea.clear-data, select.clear-data")
        .val('')
        .end()
        .find(".clear-data[type=checkbox], .clear-data[type=radio]")
        .prop("checked", "")
        .end();
});

/*$(document).on('change',
    'input[type="text"]:not(.no-upper), textarea:not(.no-upper)', function () {
        $(this).val($(this).val().toUpperCase());
    });*/

$(document).on('click', 'a[data-bs-toggle]', function (e) {
    // Special stuff to do when this link is clicked...

    // Cancel the default action
    e.preventDefault();
});

//TODO Roxana

function passVal() {
    // let length = $("#length");
    let length = $("#length");
    let number = $("#numbersOrSpecial");
    let capital = $("#capital");
    let letter = $("#letter");
    let pass1 = $("#pass1").val() || $("#parola").val() || '';

    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbersOrSpecial = /[0-9$&+,:;=?@#|'<>.^*()%!-]/g; //numberOrSpecial

    togglePassVal(pass1.match(lowerCaseLetters), letter);
    togglePassVal(pass1.match(upperCaseLetters), capital);
    togglePassVal(pass1.match(numbersOrSpecial), number);
    togglePassVal(pass1.length >= 6, length);

    if (
        pass1.match(lowerCaseLetters) &&
        pass1.match(upperCaseLetters) &&
        pass1.match(numbersOrSpecial) &&
        pass1.length >= 6
    ) {
        $('#btnActivateAccount').prop("disabled", false);
    } else {
        $('#btnActivateAccount').prop("disabled", true);
    }
}

function togglePassVal(cond, el) {
    if (cond) {
        el.find('i').removeClass("fa-times")
            .addClass("fa-check");
        el.removeClass("invalid")
            .addClass("valid");
    } else {
        el.find('i').addClass("fa-times")
            .removeClass("fa-check");
        el.addClass("invalid")
            .removeClass("valid");
    }
}

$(document).on("click", ".toggle-password", function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    let input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

$(document).ready(function () {
    let fullName = JSON.parse(Cookies.get("wstFullName")).trim() == "" ? JSON.parse(Cookies.get("wstEmail")) : JSON.parse(Cookies.get("wstFullName"));
    let groups = JSON.parse(Cookies.get("wstGroups"));

    let words = fullName.split(" ");
    let firstLetters = "";

    $.each(words, function (index, word) {
        if (index < 2) {
            firstLetters += word.charAt(0).toUpperCase();
        }
    });
    $('.logged-user-letters').append(firstLetters);
    //$('#loggedUserRoles').text(groups.join(' / '));
    //$("#grupuri").val(groups.join(' / '))
    $('#loggedUserId').text(fullName);
});


function toastGeneral(bodyMsg, type) {
    let title;
    let toast = $(`<div class="toast position-fixed" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000"></div>`);
    toast.html(
        `<div class="toast-header d-flex justify-content-between"></div>
        <div class="toast-body">
          <div class="d-flex justify-content-center align-items-center p-1 gap-3">
                  <p class="mb-0">${bodyMsg}</p>
          </div>
        </div>`);
    switch (type) {
        case "success":
            title = 'Succes!';
            //clasa = 'success-toast';
            toast.addClass('success-toast');
            break;
        case "error":
            title = 'Eroare!';
            //clasa = 'error-toast';
            toast.addClass('error-toast');
            break;
        case "warning":
            title = 'Atenție!';
            //clasa = 'warning-toast';
            toast.addClass('warning-toast');
            break;
        default:
            console.log('eroare')
            break;
    }
    toast.find('.toast-header').text(title);

    $('body').append(toast);


    const myToast = new bootstrap.Toast(toast);
    setTimeout(() => {
        myToast.show();
    }, 200)
}

function checkIfUatSelectIsSelected(msg) {
    if (($('#uatSelect').val() || $('[data-key="idUat"]').val()) == '') {
        // swalGeneral('', 'Selectați UAT-ul pentru care doriți adăugarea rolului!', 'warning').then(function () {
        //   $('[data-key="idUat"]').focus()
        // });
        toastGeneral(msg, 'warning');

        return false;
    }
}


function sameValueDate(selector, value) {
    $(selector).each(function () {
        if ($(this).data('daterangepicker') != undefined) {
            $(this).data('daterangepicker').setStartDate(value);
        }
    })

}

function makeDataRangePicker() {
    let format = 'DD.MM.YYYY HH:mm';
    let config = {
        // "autoUpdateInput": false,
        "singleDatePicker": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "locale": {
            "format": format,
            "separator": " - ",
            "applyLabel": "Aplică",
            "cancelLabel": "Renunță",
            "fromLabel": "De la",
            "toLabel": "Până la",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa'],
            "monthNames": ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai',
                'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie',
                'Decembrie'],
            "firstDay": 1
        },
        "linkedCalendars": false,
        "alwaysShowCalendars": true,
        "drops": "auto",
        "startDate": moment().format(format),
        "timePickerIncrement": 1,
    }
    $(".daterange").each(function () {
        config.autoUpdateInput = true;
        if ($(this).hasClass('no-auto-update') && ($(this).data('value') || $(this).val()) == '') {
            config.autoUpdateInput = false;
        } else {
            $(this).data('value', $(this).data('value') || moment().format('YYYY-MM-DD HH:mm:00'));
        }

        $(this).daterangepicker(config, function (start, end, label) {
            // console.log(
            //     'New date range selected: ' + start.format('YYYY-MM-DD') + ' to '
            //     + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        });

        if ($(this).data('value') != '') {
            $(this).data('daterangepicker').setStartDate(new Date($(this).data('value')));
        }
        $(this).on('apply.daterangepicker', function (ev, picker) {
            // console.log(picker.startDate, picker.startDate.format('YYYY-MM-DD HH:mm'))
            $(this).data('value', picker.startDate.format('YYYY-MM-DD HH:mm:00'));
            $(this).val(picker.startDate.format(format));
        });
        $(this).on('cancel.daterangepicker', function (ev, picker) {
            $(this).data('value', '');
            $(this).val('');
        });
    });
}






