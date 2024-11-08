<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewFoldersPage">
    <div class="container-header d-flex">
        <h4 class="page-title flex-grow-1">
            <c:choose>
                <c:when test="${id != null}">
                    Editare chestionar
                </c:when>
                <c:otherwise>
                    Chestionar nou
                </c:otherwise>
            </c:choose>
        </h4>
        <c:choose>
            <c:when test="${survey.isActive == 1}">
                <label class="switch">
                    <input class="switch-input div-header"
                           type="checkbox" checked>
                    <div class="switch-button">
                        <span class="switch-button-left">Activ</span>
                        <span class="switch-button-right">Inactiv</span>
                    </div>
                </label>
            </c:when>
            <c:otherwise>
                <label class="switch">
                    <input class="switch-input div-header"
                           type="checkbox">
                    <div class="switch-button">
                        <span class="switch-button-left">Activ</span>
                        <span class="switch-button-right">Inactiv</span>
                    </div>
                </label>
            </c:otherwise>
        </c:choose>
    </div>
    <div class="page-content">
        <div id="survey_${id}" class="parent-survey">
            <div class="m-4 div-header" id="divGeneral">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="row  mt-3">
                            <div class="col-lg-6 col-md-12">
                                <img src="resources/images/lang/icon-ro.png" alt="lb romana">
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <img src="resources/images/lang/icon-en.png" alt="lb engleza">
                            </div>
                        </div>
                        <div class="mb-3 mt-3 survey-header">
                            <div class="row">
                                <div class="col-12 titlu-categorie subtitlu"> Detalii chestionar</div>

                                <div class="col-lg-12 col-md-12">
                                    <input style="display: none" data-key="id"/>
                                    <div class="input-box active-grey">
                                        <label class="input-label">Tip chestionar </label>
                                        <select data-key="" class="campObl neEdit form-control new-input"
                                                data-name="Tip chestionar" data-header="idSurveyType">
                                            <option value="0"> Selectați tipul chestionarului</option>
                                            <c:choose>
                                                <c:when test="${survey.idSurveyType == '1'}">
                                                    <option value="1" selected> Sol</option>
                                                    <option value="2"> Cultură</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="1"> Cultură</option>
                                                    <option value="2" selected> Sol</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <input style="display: none" data-key="id"/>
                                    <div class="input-box">
                                        <label class="input-label"> Titlu chestionar </label>
                                        <input type="text"
                                               class="campObl neEdit form-control new-input" data-key="description"
                                               data-header="titleRo"
                                               data-name="Denumire instituție"
                                               value="${survey.titleRo}"/>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> Survey title</label>
                                        <input type="text"
                                               data-key="fullAddress"
                                               data-header="titleEn"
                                               class="campObl form-control new-input"
                                               data-name="Adresă"
                                               value="${survey.titleEn}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-12">
                                    <input style="display: none" data-key="id"/>
                                    <div class="input-box">
                                        <label class="input-label"> Descriere chestionar </label>
                                        <textarea class="campObl form-control new-input"
                                                  data-header="descriptionRo">${survey.descriptionRo}</textarea>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> Survey description </label>
                                        <textarea class="campObl form-control new-input"
                                                  data-header="descriptionEn">${survey.descriptionEn}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-12">
                                    <input style="display: none" data-key="id"/>
                                    <div class="input-box">
                                        <label class="input-label"> Observații finale - descriere </label>
                                        <textarea class="campObl form-control new-input"
                                                  data-header="notesRo">${survey.notesRo}</textarea>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> Final notes - description</label>
                                        <textarea class="campObl form-control new-input"
                                                  data-header="notesEn">${survey.notesEn}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label">Data start</label>
                                        <input id="dataOraInput" type="text" value=""
                                               class="form-control new-input daterange campObl" data-name="Dată și oră"
                                               data-value="${an.get(0).startDate}"
                                               data-header="startCampaign"/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> Data stop</label>
                                        <input id="dataOraInput2" type="text" value=""
                                               class="form-control new-input daterange campObl" data-name="Dată și oră"
                                               data-value="${an.get(0).endDate}"
                                               data-header="endCampaign"/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> Frecvență (zile)</label>
                                        <input type="number"
                                               data-key="phone"
                                               data-header="surveyFrequencyInDays"
                                               class="campObl form-control new-input"
                                               data-name="Telefon"
                                               value="7">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <hr>
            <c:choose>
                <c:when test="${id != null}">
                    <c:forEach items="${survey.questions}" var="questions" varStatus="loop">
                        <div class="m-4 div-question" id="div_${questions.ord}">
                            <div class="d-flex align-items-center">
                                <div id="${questions.ord}" class="flex-grow-1 count">
                                    <span class="order-span">Intrebare ${questions.ord}</span>
                                </div>
                                <div id="question_${questions.ord}" class="btn-delete-question"
                                     onclick="confirmDeleteQuestionCard(this.id)">
                                    <i class="fa-solid fa-trash-can" title="Șterge întrebare"></i>
                                </div>
                            </div>
                            <form class="formTabs" data-changed="false">
                                <div class="col-12 fp-card card-form">
                                    <div class="row  mt-3">
                                        <div class="col-lg-6 col-md-12">
                                            <img src="resources/images/lang/icon-ro.png" alt="lb romana">
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <img src="resources/images/lang/icon-en.png" alt="lb engleza">
                                        </div>
                                    </div>
                                    <div class="mb-3 mt-3">
                                        <div class="survey-question" data-questions="questions">
                                            <div data-question="id">
                                                <div class="row">
                                                    <div class="col-lg-12 col-md-12">
                                                        <input style="display: none" data-key="id"/>
                                                        <div class="input-box focus">
                                                            <label class="input-label">Tip întrebare </label>
                                                            <select data-key=""
                                                                    class="campObl neEdit form-control new-input"
                                                                    data-name="Tip intrebare"
                                                                    data-question="questionType"
                                                                    onchange="checkType(${questions.ord}, this.value)">
                                                                <option value=""> Selectați tipul de întrebare</option>
                                                                <c:forEach items="${questionTypes}" var="q">
                                                                    <option value="${q.name }" ${q.name == questions.questionType ? 'selected' : '' }> ${q.description }</option>
                                                                </c:forEach>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="d-flex mt-3 mb-2 mx-3">
                                                    <c:choose>
                                                        <c:when test="${questions.stat_map == 1}">
                                                            <label class="input-label input-check">
                                                                <input type="checkbox" class="form-check-input"
                                                                       data-question="stat_map"
                                                                       name="isActive" value="false" checked> Generează
                                                                statistici în
                                                                hartă
                                                            </label>
                                                        </c:when>
                                                        <c:otherwise>
                                                            <label class="input-label input-check">
                                                                <input type="checkbox" class="form-check-input"
                                                                       data-question="stat_map"
                                                                       name="isActive" value="false"> Generează
                                                                statistici în
                                                                hartă
                                                            </label>
                                                        </c:otherwise>
                                                    </c:choose>

                                                    <c:choose>
                                                        <c:when test="${questions.stat_graph == 1}">
                                                            <label class="input-label input-check">
                                                                <input type="checkbox" class="form-check-input"
                                                                       data-question="stat_graph" name="isActive"
                                                                       value="false"
                                                                       checked>
                                                                Generează grafic
                                                            </label>
                                                        </c:when>
                                                        <c:otherwise>
                                                            <label class="input-label input-check">
                                                                <input type="checkbox" class="form-check-input"
                                                                       data-question="stat_graph" name="isActive"
                                                                       value="false">
                                                                Generează grafic
                                                            </label>
                                                        </c:otherwise>
                                                    </c:choose>

                                                    <c:choose>
                                                        <c:when test="${questions.stat_fixed == 1}">
                                                            <label class="input-label input-check">
                                                                <input type="checkbox" class="form-check-input"
                                                                       data-question="stat_fixed" name="isActive"
                                                                       value="false"
                                                                       checked>
                                                                Generează static
                                                            </label>
                                                        </c:when>
                                                        <c:otherwise>
                                                            <label class="input-label input-check">
                                                                <input type="checkbox" class="form-check-input"
                                                                       data-question="stat_fixed" name="isActive"
                                                                       value="false">
                                                                Generează static
                                                            </label>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-12">
                                                        <input style="display: none" data-key="id"/>
                                                        <div class="input-box">
                                                            <label class="input-label"> Întrebare </label>
                                                            <input type="text"
                                                                   data-question="textRo"
                                                                   class="campObl neEdit form-control new-input"
                                                                   data-key="description"
                                                                   data-name="Denumire instituție"
                                                                   value="${questions.textRo}"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-12">
                                                        <div class="input-box">
                                                            <label class="input-label"> Question</label>
                                                            <input type="text"
                                                                   data-key="fullAddress"
                                                                   data-question="textEn"
                                                                   class="campObl form-control new-input"
                                                                   data-name="Adresă"
                                                                   value="${questions.textEn}">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-12">
                                                        <input style="display: none" data-key="id"/>
                                                        <div class="input-box">
                                                            <label class="input-label"> Explicații
                                                                suplimentare(opțional) </label>
                                                            <textarea class="campObl form-control new-input"
                                                                      data-question="questNotesRo">${questions.questNotesRo}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-12">
                                                        <div class="input-box">
                                                            <label class="input-label"> Extra
                                                                description(optional)</label>
                                                            <textarea class="campObl form-control new-input"
                                                                      data-question="questNotesEn">${questions.questNotesEn}</textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                            </div>
                                        </div>
                                        <div class="survey-answers" data-answer="answers">
                                            <c:forEach items="${questions.answers}" var="answers" varStatus="loop">
                                                <div class="answer-counter">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-md-12">
                                                            <input style="display: none" data-key="id"/>
                                                            <div class="input-box">
                                                                <label class="input-label"> Introduceți răspuns </label>
                                                                <input type="text"
                                                                       data-key="fullAddress"
                                                                       data-answer="descriptionRo"
                                                                       class="campObl form-control new-input"
                                                                       data-name="Adresă"
                                                                       value="${answers.descriptionRo}">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12">
                                                            <div class="input-box">
                                                                <label class="input-label"> Add answer</label>
                                                                <input type="text"
                                                                       data-key="phone"
                                                                       data-answer="descriptionEn"
                                                                       class="campObl form-control new-input"
                                                                       data-name="Telefon"
                                                                       value="${answers.descriptionEn}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </c:forEach>
                                        </div>
                                            <%----%>
                                        <div class="d-flex justify-content-end mt-4 div-add-answer">
                                            <button id="answer_${questions.ord}" type="button"
                                                    class="btn btn-add btn-primary btn-add-answer"
                                                    title="Adaugă răspuns"
                                                    onclick="addNewAnswer(this.id);">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </c:forEach>
                </c:when>
                <c:otherwise></c:otherwise>
            </c:choose>
            <div class="mt-4 add-survey">
                <div class="btn-border"></div>
                <div type="button" class="btn btn-primary btn-add-question" title="Adaugă întrebare"
                     onclick="addFormQuestionAnswer(${id != null ? id : 0})">+
                </div>
            </div>
            <div class="m-3">
                <div type="button" class="btn btn-primary w-100 btn-save-survey" onclick="saveSurvey();"> Salvează
                    chestionar
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
        let id;
        let type;
        $(".div-question").each(function (a, b) {
            id = $(b).find(".count").attr("id");
            type = $(b).find("select:first").find(":selected").val()
            checkType(id, type)
        })
    })
</script>
</body>

</html>