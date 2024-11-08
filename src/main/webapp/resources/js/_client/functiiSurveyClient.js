let zones = [];
let surveys = [];
let selectedZonesIds=[];
let culturaSurvey=[];
let countAsoc = 0;
function viewForAnswer() {
    var args = arguments;
    var caller = viewForAnswer.caller.name;
    doGetHtml("client/survey/viewForAnswer").done(function (response) {
        changeContent(response, args, caller, 'viewForAnswer');
    });
}

function listClientSurveys() {
    var args = arguments;
    var caller = listClientSurveys.caller.name;
    doGetHtml(`client/survey/listClientSurveys/`).done(function (response) {
        //doGetHtml("api/surveys/listSurveys").done(function (response){
        //api/surveys
        //changeContent(content, args, caller, page = '');
        changeContent(response, args, caller, 'listClientSurveys');
        //makeDataTable('table_user_surveys', 0);
    });
}



 function raspunsuriperweek(){
	//var args = arguments;
    var caller = raspunsuriperweek.caller.name;
    var idSurvey = $('#userSurveys').val();
    var calendar = $('#crtweek').val();
    doGetHtml(`client/survey/listClientResponses/${idSurvey}/${calendar}`).done(function (response) {

        $('#divresponses').html(response);
        //makeDataTable('table_user_surveys', 0);
    });
 }


function viewUserClient(editabil, id_user = 0, is_logged_user = true) {
    let args = arguments;
    let caller = viewUserClient.caller.name;
    $.ajax({
        type: "GET", url: "client/users/", data: {}, dataType: "html", cache: false, success: function (response) {
            changeContent(response, args, caller, 'viewUserClient');
            if (is_logged_user) {
                setMenuPage('contul_meu');
                //@todo crapa - nu avem grupuri sau ce? de vazut!!!
                //let groups = JSON.parse(Cookies.get("wstGroups"));
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
            doGetJson(`api/zones`, null).done(function (response) {
                zones = response;
            });
        }, complete: function () {
            triggerPop();
            $('.dual-listbox__search').val('')
            //groups_list.searchLists();
            //roles_list.searchLists();
        }

    });
}
function viewHartaLocalizare(editabil, id_user = 0, is_logged_user = true) {
    let args = arguments;
    let caller = viewHartaLocalizare.caller.name;
    $.ajax({
        type: "GET", url: "client/survey/viewLocalizare/", data: {}, dataType: "html", cache: false, success: function (response) {
            changeContent(response, args, caller, 'viewHartaLocalizare');

        }, complete: function () {
            triggerPop();

            //groups_list.searchLists();
            //roles_list.searchLists();
        }

    });
}
 function viewSurvey(id, zona, agricYear) {
     var args = arguments;
     var caller = viewSurvey.caller.name;
     let checkSession;
     doGetJson(`api/surveys/checkSession/${agricYear}/${id}`).done(function (response2) {
         checkSession = response2;
         if (checkSession) {
             $('#modal_alerta_necompletat').modal('hide');
             doGetHtml(`client/survey/getSurveyClient/${id}/${zona}`).done(function (response) {
                 changeContent(response, args, caller, 'surveyClient');
             })
         } else {
             Swal.fire({
                 text: "Chestionarul nu se afla in sesiunea curenta",
                 icon: "error",
                 confirmButtonColor: "var(--primary-color-anm)",
                 confirmButtonText: "OK",
             })
         }
     })

}

function saveSurveyClient(idSurveyResponse) {
    let survey = {};
    let answers = [];


    $(".parent-survey").each(function () {
        $(".parent-survey .survey-header").each(function (a, b) {
            $(b).find("[data-header]")
                .each(function () {
                        if (!survey.hasOwnProperty($(this).data("header")))
                            survey[$(this).data("header")] = $(this).val();
                    }
                );
        })
        $(".answer-counter")
            .each(function () {
                switch ($(this).find("input").attr("type")) {
                    case "checkbox":
                    case "radio": {
                        if ($(this).find("input").is(":checked")) {
                            answers.push(
                                $(this).find("input").data()
                            )
                        }
                        break;
                    }
                    case "text":
                    case "date":
                    case "number": {
                        if ($(this).find("input").val() !== "") {
                            $(this).find("input").data("given-answer", $(this).find("input").data().value || $(this).find("input").val());
                            let obj = $(this).find("input").data();
                            obj.datepicker = "";
                            answers.push(obj);
                        }
                        break;
                    }
                    default:
                        break;
                }
            })
        survey["answers"] = answers;
    })

    doPostJson(`api/surveyResponse?idSurveyResponse=${idSurveyResponse}`, survey, "", "").done(function (response) {
        redirectSaveSurveyClient(20);
    })
}

$(document).on('click', '#navbarSupportedContent .buton-meniu', function () {
    $('#navbarSupportedContent .buton-meniu').removeClass('active-btn');
    $(this).addClass('active-btn');
});


/*modificare btn la scroll pana jos*/
$(document).on('scroll', function(e){
    const scrolledTo = window.scrollY + window.innerHeight
    const isReachBottom = document.body.scrollHeight === scrolledTo
    if(isReachBottom){
        $('.div-send-answers').addClass('sticky').slideDown(10000);

    }
})

function mainpage() {
    var token = Cookies.get('wmtoken');
    // language = $('#lang_id').data('lang');

    /* if (language != null) {
       lang = "&language=" + language;

     }*/
    var crtUrl = app.contextPath + "/client";

    window.location.href = crtUrl;
    setMenuPage('client');
}

function redirectSaveSurveyClient(idUser) {
    Swal.fire({
        text: "Modificările au fost salvate cu succes",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color-anm)",
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed) {
            mainpage();
        }
    });
}




function editSurveyClient(id, idZona, county, city, agricYear) {
    var args = arguments;
    var caller = editSurveyClient.caller.name;
    let checkSession;
    doGetJson(`api/surveys/checkSession/${agricYear}/${id}`).done(function (response2) {
        checkSession = response2
        if (checkSession) {
            doGetHtml(`client/survey/getSavedAnswers/${id}/${idZona}`).done(function (response) {
                changeContent(response, args, caller, 'surveyClient');
            })
        } else {
            Swal.fire({
                text: "Chestionarul nu se afla in sesiunea curenta",
                icon: "error",
                confirmButtonColor: "var(--primary-color-anm)",
                confirmButtonText: "OK",
            })
        }
    })
}

function checkSurveysAsoc(id) {
    doGetJson(`api/surveyResponse/getAsocSurveyZones/${id}`).done(function (response) {
        $("#user_asoc_survey_zones").empty();
        $(".multi-wrapper").remove();
        $("#user_asoc_survey_zones").removeAttr('data-multijs');
        zones.map(function (z) {
            $("#user_asoc_survey_zones").append(`<option value= ${z.id} ${response.hasOwnProperty(z.id) ? 'selected' : ''}> ${z.county} ${z.city}</option>`);
        })
        makeMulti('#user_asoc_survey_zones');
    })
}

function registerUser(){
    let user = {};
        $("#newUserForm").find("[data-register]")
            .each(function () {
                        user[$(this).data("register")] = $(this).val();
                }
            );
    try {
        const response =  doPostJson("api/auth/register", user);

        Swal.fire({
            text: "Accesați link-ul din email pentru a finaliza inregistrarea",
            icon: "success",
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = window.location
            }
        });
    } catch (error) {
        console.error("Registration failed:", error);
        Swal.fire({
            text: "A apărut o eroare la înregistrare.",
            icon: "error",
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        });
    }
}
function completeRegister(path, token) {
    var pass1 = $("#pass1").val();
    var pass2 = $("#pass2").val();
    var obj = {};
    if (pass1 == '' || pass2 == '') {
        Swal.fire({
            text: "Completati toate câmpurile",
            icon: "error",
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        })
    } else if (pass1 !== pass2) {
        Swal.fire({
            text: "Parolele nu coincid",
            icon: "error",
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        })
    } else {
        obj["token"] = token;
        obj["password"] = pass2;
        $.ajax({
            url: path + "/api/auth/register/confirm",
            type: "POST",
            data: JSON.stringify(obj),
            contentType:'application/json',
            success: function (response) {
                Cookies.set('wstToken', JSON.stringify(response.token), {expires: 1});
                Cookies.set('wstRoles', JSON.stringify(response.roles), {expires: 1});
                Cookies.set('wstGroups', JSON.stringify(response.groups), {expires: 1});
                Cookies.set('wstEmail', JSON.stringify(response.email), {expires: 1});
                Cookies.set('wstFullName', JSON.stringify(response.fullName), {expires: 1});
                Cookies.set('wstUsername', JSON.stringify(response.username), {expires: 1});

                window.location.href = PATH_TO_CONTROLLERS + "/client";
            }
        })
    }
}

function asocSurveysToLocations(){
    var args = arguments;
    var caller = asocSurveysToLocations.caller.name;
    doGetHtml( "client/users/asoc-page").done(function (response) {
        changeContent(response, args, caller, 'asocSurveysToLocations');
    })
    doGetJson(`api/zones`,).done(function (response) {
        zones = response;
    });
    doGetJson(`api/surveys`,).done(function (response) {
        surveys = response;
    });
}


$(document).on('keyup', '#filterList', function () {
        var valThis = $(this).val().toLowerCase();
        var indexAsocCard = $(this).parent().parent().parent().prop('id').split('_').pop()
        if (valThis == "") {
            $(".asoc-survey-locations_"+indexAsocCard+" > li").show();
        } else {
            $(".asoc-survey-locations_"+indexAsocCard+" > li").each(function () {
                var text = $(this).text().toLowerCase();
                text.indexOf(valThis) >= 0 ? $(this).show() : $(this).hide();
            });
        }
    })

$(document).on('click', '.asoc-locations', function () {
    var thisLocation = $(this).text()
    let idZone = $(this).parent().prop('id')
    let zoneVal = $(this).val();
    if(selectedZonesIds.indexOf(zoneVal) == -1){
        selectedZonesIds.push(zoneVal);
        let countSurveys = idZone.split("_").pop();
        $("#asocCardHeader_"+countSurveys).attr("data-id-zone", zoneVal);
        $("#"+idZone).parent().empty();
        $("#asocCardHeader_"+countSurveys+" .card-body-title").append(thisLocation).show();
        $("#asocSurveysList_"+countSurveys+" .asoc-user-surveys").show();
        $("#asocUserSurveys_"+countSurveys).closest(".surveys-container-for-asoc").append("<div class='align-items-center d-flex justify-content-between mt-3' data-id=" + culturaSurvey[0] + " data-survey-id="+culturaSurvey[0]+"> " + culturaSurvey[1] + " </div>");
        $("#asocUserSurveys_"+countSurveys +" option[value="+culturaSurvey[0]+"]").remove();
    }else{
        Swal.fire({
            text: "Locatia este deja selectata",
            icon: "error",
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        })
    }
    $("#asocSurveysList_"+countAsoc+"").css('display','block');
})

function addSurveyToList(survey) {
    let count = $(survey).prop('id').split('_').pop();
    $(survey).closest(".surveys-container-for-asoc").append("<div class='removable-survey d-flex justify-content-between align-items-center'><div class='mb-0' data-id=" + survey.options[survey.selectedIndex].value + " data-survey-id="+survey.options[survey.selectedIndex].value+"> " + survey.options[survey.selectedIndex].text + " </div> <div class='remove-survey-asoc mb-0' data-id=" +survey.options[survey.selectedIndex].value + " data-survey='"+ survey.options[survey.selectedIndex].text + "' data-count="+count+"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></div></div>");
    $('option:selected', survey).remove();
}

$(document).on('click', '.remove-survey-asoc', function () {
    var thisSurvey = $(this)
    $("#asocSurveysList_"+thisSurvey.data('count')).find('[data-id = '+thisSurvey.data('id')+']').parent().remove()
    $("#asocUserSurveys_"+thisSurvey.data('count')).append("<option value="+thisSurvey.data('id')+"> "+thisSurvey.data('survey')+"</option>")
})

function addAsocSurveysToLocation(idPermanentSurvey, titlePermanentSurvey){
    countAsoc = $("#asocContainer").children().length == 0 ? 0 : $("#asocContainer").children().last().prop("id").split("_").pop();
    countAsoc ++
    culturaSurvey.push(idPermanentSurvey, titlePermanentSurvey);

    $("#asocContainer").append('<div id="asocCardContainer_'+countAsoc+'" class="col-lg-4 col-12 fp-card asoc-container">' +
        '        <div class="card card-body mb-3 shadow" id="">' +
        '            <div class="row">' +
        '                <div id="asocCardHeader_'+countAsoc+'" class="fp-card-header row">' +
        '                   <div class="align-items-center d-flex justify-content-between p-0">' +
        '                    <h6 class="card-body-title"></h6>' +
        '                    <button class="btn btn-primary"  data-remove-card-asoc="#asocCardContainer_'+countAsoc+'" onclick="removeAsocCard(this)">X</button> ' +
        '                    </div>' +
        '                    <div class="search-asoc-container p-0">' +
        '                        <div class="form-group col-12">' +
        '                            <label for="filterList" class="sr-only">Filter</label>' +
        '                            <input class="campObl neEdit form-control new-input mt-0" id="filterList" placeholder="&#xF002;" type="text" style="font-family: FontAwesome;" />' +
        '                            <small class="form-text text-muted"></small>' +
        '                        </div>' +
        '                        <ul class=" m-0 asoc-survey-locations_'+countAsoc+' zones-list" id="asocSurveyToLocations_'+countAsoc+'" >' +
        '                        </ul>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="row">' +
        '                <div id="asocSurveysList_'+countAsoc+'" class="fp-card-footer surveys-container-for-asoc" style="display: none">' +
        '                    <div style="display: none" class="input-box focus asoc-user-surveys">' +
        '                        <select id="asocUserSurveys_'+countAsoc+'" data-key=""' +
        '                                class="campObl neEdit m-0 w-100" ' +
        '                                onchange="addSurveyToList(this)">' +
        '                                <option>Selectează chestionarele</option>' +
        '                        </select>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>');

    zones.map(function (res) {
        $("#asocSurveyToLocations_"+ countAsoc).append("<li class='asoc-locations' value=" + res.id + ">" + res.city +", "+ res.county + "</li>")});

    surveys.map(function (res) {
        $("#asocUserSurveys_"+ countAsoc).append("<option value="+res.id+">"+res.titleRo+"</option>")
    });
}

function removeAsocCard(el){
    const index = selectedZonesIds.indexOf($(el).closest('[data-id-zone]').data("id-zone"));
    if (index !== -1) {
        selectedZonesIds.splice(index, 1);
    }
    $($(el).data("remove-card-asoc")).remove()
}

function saveAsocUserZoneSurvey(){
    let zones = {};
    let idSurveys = [];

    $(".asoc-container").each(function (a, b) {

        $(b).find("[data-id-zone]").each(function () {
            $(b).find("[data-survey-id]").each(function () {
                idSurveys.push($(this).data("survey-id"));
            })
            zones[$(this).data("id-zone")] = idSurveys;
            idSurveys=[];
        })
        
    })
    doPostJson("api/surveyResponse/asocSurveyZones", zones).done(function (response) {

        Swal.fire({
            text: "Modificările s-au produs cu succes",
            icon: "success",
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        })

    })
}