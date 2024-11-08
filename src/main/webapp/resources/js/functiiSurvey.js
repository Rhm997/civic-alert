let surveyQuestionTypes = [];
function addEditSurvey() {
    var args = arguments;
    var caller = addEditSurvey.caller.name;
    doGetHtml("survey/addEditSurvey").done(function (response) {
        changeContent(response, args, caller, 'addEditSurvey');
        setMenuPage('new_survey');
    });

    doGetJson(`api/questionTypes`, null).done(function (response) {
        surveyQuestionTypes = response;
    });
}

function listSurveys() {
    var args = arguments;
    var caller = listSurveys.caller.name;
    doGetHtml("survey/listSurveys").done(function (response) {
        //doGetHtml("api/surveys/listSurveys").done(function (response){
        //api/surveys
        changeContent(response, args, caller, 'listSurveys');
        makeDataTable('table_surveys', 0);
    });
}

function listPersons() {
    var args = arguments;
    var caller = listPersons.caller.name;
    //survey = mapping catre controller listPersons; e mapping catre metoda (alias)
    doGetHtml("survey/listPersons").done(function (response) {
        changeContent(response, args, caller, 'listPersons');
        makeDataTable('table_persons', 0);
    });
}

function viewAnAgricol() {
    var args = arguments;
    var caller = viewAnAgricol.caller.name;
    doGetHtml("survey/anAgricol").done(function (response) {
        changeContent(response, args, caller, 'viewAnAgricol');
    });

    doGetJson(`api/questionTypes`, null).done(function (response) {
        surveyQuestionTypes = response;
    });
}

function surveysDashboard() {
    var args = arguments;
    var caller = surveysDashboard.caller.name;
    doGetHtml("survey/dashboard").done(function (response) {
        changeContent(response, args, caller, 'surveysDashboard');
    });
}
/*END PAGINI*/

var count = 0

function addFormQuestionAnswer(id) {
    if (id != 0) {
        count = $("#survey_" + id).find(".div-question").length
        count++
    } else {
        count = $("#survey_").find(".div-question").length
        count++
    }

    $(".parent-survey .add-survey").before(
        '    <div class="m-4 div-question" id="div_' + count + '" style="display: none;">'
        + '                <div class="d-flex align-items-center">'
        + '                    <div class="flex-grow-1 count">'
        + `                     <span class="order-span">${count}. </span>`
        + '                    </div>'
        + '                    <div id="question_' + count + '" class="btn-delete-question" onclick="confirmDeleteQuestionCard(this.id)">'
        + '                        <i class="fa-solid fa-trash-can" title="Șterge întrebare" ></i>'
        + '                    </div>'
        + '                </div>'
        + '                <form class="formTabs" data-changed="false">'
        + '                    <div class="col-12 fp-card card-form">'
        + '                        <div class="row  mt-3">'
        + '                            <div class="col-lg-6 col-md-12">'
        + '                                <img src="resources/images/lang/icon-ro.png" alt="lb romana">'
        + '                            </div>'
        + '                            <div class="col-lg-6 col-md-12">'
        + '                                <img src="resources/images/lang/icon-en.png" alt="lb engleza">'
        + '                            </div>'
        + '                        </div>'
        + '                        <div class="mb-3 mt-3">'
        + '                            <div class="survey-question" data-questions="questions">'
        + '                            <div class="row">'
        + '                                <div class="col-lg-12 col-md-12">'
        + '                                    <input style="display: none" data-key="id"/>'
        + '                                    <div class="input-box active-grey">'
        + '                                        <label class="input-label">Tip întrebare </label>'
        + '                                        <select id="'+count +'" data-key="" class="campObl neEdit form-control new-input"'
        + '                                                data-name="Tip intrebare" data-question="questionType" onchange="checkType(this.id, this.value)">'
        + '                                            <option value=""> Selectați tipul de întrebare </option>'
        + '                                        </select>'
        + '                                    </div>'
        + '                                </div>'
        + '                            </div>'
        + '                                <div class="d-flex mt-3 mb-2 mx-3">'
        + '                                    <label class="input-label input-check">'
        + '                                        <input type="checkbox" class="form-check-input" data-question="stat_map" id="" name="isActive"  value="false"> Generează statistici în hartă'
        + '                                    </label>'
        +'                                    <label class="input-label input-check">'
        + '                                        <input type="checkbox" class="form-check-input" data-question="stat_graph" id="" name="isActive"  value="false"> Generează grafic'
        + '                                    </label>'
        +'                                    <label class="input-label input-check">'
        + '                                        <input type="checkbox" class="form-check-input" data-question="stat_fixed" id="" name="isActive"  value="false"> Continut static'
        + '                                    </label>'
        + '                                </div>'
        + '                            <div class="row">'
        + '                                <div class="col-lg-6 col-md-12">'
        + '                                    <input style="display: none" data-key="id"/>'
        + '                                    <div class="input-box">'
        + '                                        <label class="input-label"> Întrebare </label>'
        + '                                        <input type="text"'
        + '                                               data-question="textRo"'
        + '                                               class="campObl neEdit form-control new-input" data-key="description"'
        + '                                               data-name="Denumire instituție"'
        + '                                               value=""/>'
        + '                                    </div>'
        + '                                </div>'
        + '                                <div class="col-lg-6 col-md-12">'
        + '                                    <div class="input-box">'
        + '                                        <label class="input-label"> Question</label>'
        + '                                        <input type="text"'
        + '                                               data-key="fullAddress"'
        + '                                               data-question="textEn"'
        + '                                               class="campObl form-control new-input"'
        + '                                               data-name="Adresă"'
        + '                                               value="">'
        + '                                    </div>'
        + '                                </div>'
        + '                            </div>'
        + '                            <div class="row">'
        + '                                <div class="col-lg-6 col-md-12">'
        + '                                    <input style="display: none" data-key="id"/>'
        + '                                    <div class="input-box">'
        + '                                        <label class="input-label"> Explicații suplimentare(opțional) </label>'
        + '                                        <textarea  class="campObl form-control new-input" data-question="questNotesRo" ></textarea>'
        + '                                    </div>'
        + '                                </div>'
        + '                                <div class="col-lg-6 col-md-12">'
        + '                                    <div class="input-box">'
        + '                                        <label class="input-label"> Extra description(optional)</label>'
        + '                                        <textarea  class="campObl form-control new-input" data-question="questNotesEn" ></textarea>'
        + '                                    </div>'
        + '                                </div>'
        + '                            </div> <br>'
        + '                            </div>'
        + '                            <div class="survey-answers-parent">'
        + '                              <div class="survey-answers" data-answer="answers">'
        + '                                <div class="row answer-counter">'
        + '                                  <div class="col-lg-6 col-md-12">'
        + '                                      <input style="display: none" data-key="id"/>'
        + '                                      <div class="input-box">'
        + '                                          <label class="input-label"> Introduceți răspuns </label>'
        + '                                          <input type="text"'
        + '                                                 data-key="fullAddress"'
        + '                                                 data-answer="descriptionRo"'
        + '                                                 class="campObl form-control new-input"'
        + '                                                 data-name="Adresă"'
        + '                                                 value="">'
        + '                                      </div>'
        + '                                  </div>'
        + '                                <div class="col-lg-6 col-md-12">'
        + '                                    <div class="input-box">'
        + '                                        <label class="input-label"> Add answer</label>'
        + '                                        <input type="text"'
        + '                                               data-key="phone"'
        + '                                               data-answer="descriptionEn"'
        + '                                               class="campObl form-control new-input"'
        + '                                               data-name="Telefon"'
        + '                                               value="">'
        + '                                    </div>'
        + '                               </div>'
        + '                                </div>'
        + '                             </div>'
        + '                                </div>'
        + '                                <div class="d-flex justify-content-end mt-4 div-add-answer">'
        + '                                    <button id="answer_' + count + '" type="button" class="btn btn-add btn-primary btn-add-answer" title="Adaugă răspuns"'
        + '                                            onclick="addNewAnswer(this.id);">'
        + '                                        <i class="fas fa-plus"></i>'
        + '                                    </button>'
        + '                                </div>'
        + '                            </div>'
        + '                        </div>'
        + '                    </div>'
        + '                </form>'
        + '            </div>');
    $('#div_' + count).slideDown('slow');

    surveyQuestionTypes.map(function (res) {
        $("#"+ count).append("<option value=" + res.name + ">" + res.description + "</option>");
    })
}

function addNewAnswer(id) {
    $("#" + id).closest(".div-question").find(".survey-answers").append('<div class="row answer-counter">'
        + '                                            <div class="col-lg-6 col-md-12">'
        + '                                                <input style="display: none" data-key="id"/>'
        + '                                                <div class="input-box">'
        + '                                                    <label class="input-label"> Introduceți răspuns </label>'
        + '                                                    <input type="text"'
        + '                                                           data-key="fullAddress"'
        + '                                                           class="campObl form-control new-input"'
        + '                                                           data-answer="descriptionRo"'
        + '                                                           value="">'
        + '                                                    </select>'
        + '                                                </div>'
        + '                                            </div>'
        + '                                            <div class="col-lg-6 col-md-12">'
        + '                                                <div class="input-box">'
        + '                                                    <label class="input-label"> Add answer </label>'
        + '                                                    <input type="text"'
        + '                                                           data-key="phone"'
        + '                                                           class="campObl form-control new-input"'
        + '                                                           data-answer="descriptionEn"'
        + '                                                           value="">'
        + '                                                </div>'
        + '                                            </div>'
        + '                                        </div>')
}


function deleteQuestionCard(id) {
    $("#" + id).closest(".div-question").remove();
    //@todo- se poate o renumerotare???
    const elements_div = document.getElementsByClassName('div-question');
    const elements_btn_add = document.getElementsByClassName('btn btn-add btn-primary btn-add-answer');
    const elements_btn_delete = document.getElementsByClassName('btn-delete-question');
    const elements_order_span = document.getElementsByClassName('order-span');
        // renumerotam
        for (let i = 0; i < elements_div.length; i++) {
            elements_div[i].setAttribute('id', 'div_'+(i+1));
            elements_btn_add[i].setAttribute('id', 'div_'+(i+1));
            elements_btn_delete[i].setAttribute('id', 'div_'+(i+1));
            elements_order_span[i].innerText =(i+1) + '.';
        }
}

function confirmDeleteQuestionCard (id) {
    Swal.fire({
        text: "Sunteți sigur(ă) că doriți să ștergeți întrebarea?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color-anm)",
        confirmButtonText: "Da",
        cancelButtonText: "Renunță"
    }).then((result) => {
        if (result.isConfirmed) {
                $("#" + id).closest(".div-question").slideUp("slow");
                setTimeout(function () {
                    deleteQuestionCard(id);
                }, 1500)

        }
    });
}


function disableDataInput() {
    $('#permanentSurvey').change(function () {
        if (this.checked) {
            $('.daterange').prop('disabled', true);
        } else {
            $('.daterange').prop('disabled', false);
        }
    });
};

/*function getSurvey(id){

}*/

function editSurvey(id) {
    var args = arguments;
    var caller = editSurvey.caller.name;
    doGetHtml(`/anm-survey-management/survey/getSurveyEditData/${id}`).done(function (response) {
        changeContent(response, args, caller, 'editSurvey');
    })
}

function create_new_from(id) {
    var args = arguments;
    var caller = create_new_from.caller.name;
    doGetHtml(`/anm-survey-management/survey/getSurveyEditStructure/${id}`).done(function (response) {
        changeContent(response, args, caller, `addedit?id=${id}`);
    })
}


function save_from_existing() {
    denumire = $('#den_id').val();
    vid = $('#survey_id').val();

    doGetJson(`/anm-survey-management/api/surveys/${vid}/${denumire}`, null).done(function (response) {
        console.log(response)
        $('#modalCreateFromExisting').modal('hide');
        alert("lista surveys");
        listSurveys();

    })

}

function saveEditsSurvey(id) {
    Swal.fire({
        text: "Sunteți sigur(ă) că doriți să salvați modificările?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color-anm)",
        confirmButtonText: "Da",
        cancelButtonText: "Renunță"
    }).then((result) => {
        if (result.isConfirmed) {
                saveSurvey(id);
        }
    });
}


$(document).on('click', '.view-question-card input[type="radio"]', function () {
    var groupName = $(this).attr('name');
    var parent = $(this).closest('.view-question-card');
    if ($(this).data('waschecked') == true) {
        // Uncheck the radio button if it was already checked
        $(this).prop('checked', false);
        $(this).data('waschecked', false);
    } else {
        // Uncheck all radio buttons in the same group within the same container
        parent.find('input[name="' + groupName + '"]').each(function () {
            $(this).data('waschecked', false);
        });
        // Check the clicked radio button
        $(this).data('waschecked', true);
    }
})


function deleteSurvey(id) {
    Swal.fire({
        text: "Sunteți sigur(ă) că doriți să stergeți chestionarul?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color-anm)",
        confirmButtonText: "Da",
        cancelButtonText: "Renunță"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `api/surveys/softDelete/${id}`,
                type: "PUT",
                success:function(){
                    Swal.fire({
                        text: "Chestionar sters!",
                        icon: "success",
                        confirmButtonColor: "var(--primary-color-anm)"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            listSurveys();
                        }
                    })
                },
                error: function (){
                    Swal.fire({
                        text: "A apărut o problemă!",
                        icon: "error",
                        confirmButtonColor: "var(--primary-color-anm)"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            listSurveys();
                        }
                    });
                }
            })
        }
    });
}

function checkType(id, type) {
    switch (type) {
        case "DATE":
        case "NUMBER":
        case "TEXT": {
            $("#div_" + id).find(".answer-counter").remove();
            addNewAnswer(`answer_${id}`);
            $("#div_" + id).find(".answer-counter").hide();
            $("#div_" + id).find(".btn-add-answer").hide()
            break;
        }
        case "SINGLE":
        case "MULTIPLE": {
            $("#div_" + id).find(".answer-counter").show()
            $("#div_" + id).find(".btn-add-answer").show()
            break;
        }
        default:
            break;
    }
}

async function saveSurvey(id) {
    let survey = {};
    let questions = [];
    let ordQuestion = 1;
    let ordAnswer = 1;

    $(".parent-survey").each(function () {
        $(".parent-survey .survey-header").each(function (a, b) {
                if ($(".switch-input").is(":checked")) {
                    survey["isActive"] = 1;
                } else {
                    survey["isActive"] = 0;
                }
            $(b).find("[data-header]")
            .each(function () {
                    if (id) {
                        survey["id"] = id;
                    }
                    if ($(this).data("header") == "startCampaign" || $(this).data(
                        "header") == "endCampaign") {
                        survey[$(this).data("header")] = moment(
                            $(this).data('value')).format('YYYY-MM-DD');
                    }
                    if ($(this).data("header") == "isPermanent") {
                        if ($(this).is(":checked")) {
                            survey[$(this).data("header")] = 1;
                        } else {
                            survey[$(this).data("header")] = 0;
                        }
                    }
                    if (!survey.hasOwnProperty($(this).data("header")))
                        survey[$(this).data("header")] = $(this).val();
                }
            );
        })
        $(".parent-survey .div-question .survey-question").each(function (a, b) {
            let objQuestion = {};
            let answers = [];
            let objAnswer = {};
            $(b).find("[data-question]")
            .each(function () {
                    if ($(this).data("question") == "id") {
                        objQuestion[$(this).data("question")] = $(this).attr("id")
                    }
                    if ($(this).data("question") == "stat_map") {
                        if ($(this).is(":checked")) {
                            objQuestion[$(this).data("question")] = 1;
                        } else {
                            objQuestion[$(this).data("question")] = 0;
                        }
                    }
                    if ($(this).data("question") == "stat_graph") {
                        if ($(this).is(":checked")) {
                            objQuestion[$(this).data("question")] = 1;
                        } else {
                            objQuestion[$(this).data("question")] = 0;
                        }
                    }
                    if ($(this).data("question") == "stat_fixed") {
                        if ($(this).is(":checked")) {
                            objQuestion[$(this).data("question")] = 1;
                        } else {
                            objQuestion[$(this).data("question")] = 0;
                        }
                    }
                    if (!objQuestion.hasOwnProperty($(this).data("question"))) {
                        objQuestion[$(this).data("question")] = $(this).val();
                    }
                }
            )
            objQuestion["ord"] = ordQuestion++;
            $(this).siblings().find(".answer-counter")
            .each(function (c, d) {

                $(d).find("[data-answer]").each(function () {
                        if ($(this).data("answer") == "id") {
                            objAnswer[$(this).data("answer")] = $(this).attr("id")
                        }
                        objAnswer[$(this).data("answer")] = $(this).val();
                    }
                )
                objAnswer["ord"] = ordAnswer++;
                answers.push(
                    objAnswer
                )
                objAnswer = {};
            })
            objQuestion["answers"] = answers;
            questions.push(
                objQuestion
            )
        })
        survey["questions"] = questions;
    })
    if (id) {
        doPutJson("/anm-survey-management/api/surveys", survey, "", "").done(await function (response) {
            redirectSaveSurvey();
        })
    } else {
        doPostJson("/anm-survey-management/api/surveys", survey, "", "").done(await function (response) {
            redirectSaveSurvey()
        })
    }
}

function redirectSaveSurvey(){
    Swal.fire({
        text: "Modificările au fost salvate cu succes",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color-anm)",
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed) {
            listSurveys();
            setMenuPage("list_surveys");
        }
    });
}

function saveAnAgricol(){
    let dataStart = $("#startDateAnAgricol").val()
    let dataStop = $("#endDateAnAgricol").val()
    let agricYear = $("#agricYear").val()
    let obs = $("#agricObs").val()

    doPostJson("agricYear/", {startDate: moment(dataStart, 'DD.MM.YYYY').format('YYYY-MM-DD'), endDate: moment(dataStop, 'DD.MM.YYYY').format('YYYY-MM-DD'), agricYear: agricYear, obs: obs}),done(function (response){
        Swal.fire({
            text: "Anul a fost schimbat cu succes",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "var(--primary-color-anm)",
            confirmButtonText: "OK",
        })
    })
}

function saveEditAnAgricol() {
    Swal.fire({
        text: "Sunteți sigur(ă) că doriți să setați anul agricol?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color-anm)",
        confirmButtonText: "Da",
        cancelButtonText: "Renunță"
    }).then((result) => {
        if (result.isConfirmed) {
            saveAnAgricol();
        }
    });
}



