<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>

      #viewQuestion.page-content {
        padding: unset;
      }

      #container {
        margin: 0 ;
      }


    </style>
</head>
<body>
<div class="viewFoldersPage">
    <div id="viewQuestion" class="page-content">
        <div id="${survey.id}" class="parent-survey">
            <div class="survey-title w-100 d-flex justify-content-center align-items-center">
                ${survey.titleRo}
            </div>
            <div class="survey-description w-100 d-flex align-items-center justify-content-center text-center">
                ${survey.descriptionRo}
            </div>
            <div class="survey-header" style="display: none">
                <input style="display: none" data-header="languageId" value="1">1</input>
                <input style="display: none" data-header="surveyId" value="${survey.id}">${survey.id} </input>
                <input style="display: none" data-header="userId" value="${idUser}">${idUser}</input>
                <input style="display: none" data-header="sessionId" value="${idSession}">${idSession}</input>
                <input style="display: none" data-header="zoneId" value="${idZona}">${idZona}</input>
                <input style="display: none" data-header="latitude" value="2222,333">2222,333</input>
                <input style="display: none" data-header="longitude" value="123,456">123,456</input>
                <input style="display: none" data-header="answerYearId" value="${crtYear.get(0).id}">${crtYear.get(0).id}</input>
            </div>
            <c:forEach items="${survey.questions}" var="questions" varStatus="loop">
                <div class="p-3 m-4 w-75 view-question-card">
                    <form class="formTabs" data-changed="false">
                        <div class="col-12 fp-card card-form">
                            <div class="mb-3 mt-3">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12">
                                        <div id="${questions.id}" class="question-title"> ${questions.ord}. ${questions.textRo}
                                        </div>
                                        <span class="question-description">${questions.questNotesRo}</div>
                                </div>

                                    <%-- NEW --%>
                                <c:forEach items="${questions.answers}" var="answers" varStatus="loop">
                                    <c:choose>
                                        <c:when test="${questions.questionType == 'SINGLE'}">
                                            <div class="row d-flex justify-content-center mt-2 answer-counter">
                                                <label for="${answers.id}" class="input-label input-check">
                                                    <input type="radio" id="${answers.id}" class="form-check-input"
                                                           data-user-id="${idUser}"
                                                           data-survey-id="${survey.id}"
                                                           data-question-id="${questions.id}"
                                                           data-answer-id="${answers.id}"
                                                           data-final-question-answer=""
                                                           data-given-answer=""
                                                           data-answer-session-id="${idSession}"
                                                           data-answer-year-id="${crtYear.get(0).id}"
                                                           data-zone-id="${idZona}"
                                                           name="raspRo" ${savedAnswers.containsKey(String.valueOf(answers.id)) ? "checked" : ''}> ${answers.descriptionRo}
                                                </label>
                                            </div>
                                        </c:when>
                                        <c:when test="${questions.questionType == 'MULTIPLE'}">
                                            <div class="row d-flex justify-content-center mt-2 answer-counter">
                                                <label for="${answers.id}" class="input-label input-check">
                                                    <input type="checkbox" id="${answers.id}" class="form-check-input"
                                                           data-user-id="${idUser}"
                                                           data-survey-id="${survey.id}"
                                                           data-question-id="${questions.id}"
                                                           data-answer-id="${answers.id}"
                                                           data-final-question-answer=""
                                                           data-given-answer=""
                                                           data-answer-session-id="${idSession}"
                                                           data-answer-year-id="${crtYear.get(0).id}"
                                                           data-zone-id="${idZona}"
                                                           name="raspRo" value="" ${savedAnswers.containsKey(String.valueOf(answers.id)) ? "checked" : ''}> ${answers.descriptionRo}
                                                </label>
                                            </div>
                                        </c:when>
                                        <c:when test="${questions.questionType == 'TEXT'}">
                                            <div class="answer-counter">
                                                <div data-answer="id" class="row">
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="input-box">
                                                            <label class="input-label"> Introduceți răspuns </label>
                                                            <input type="text"
                                                                   id="${answers.id}"
                                                                   data-user-id="${idUser}"
                                                                   data-survey-id="${survey.id}"
                                                                   data-question-id="${questions.id}"
                                                                   data-answer-id="${answers.id}"
                                                                   data-final-question-answer=""
                                                                   data-given-answer=""
                                                                   data-answer-session-id="${idSession}"
                                                                   data-answer-year-id="${crtYear.get(0).id}"
                                                                   data-zone-id="${idZona}"
                                                                   value="${savedAnswers.containsKey(String.valueOf(answers.id)) ? savedAnswers.get(String.valueOf(answers.id)) : ''}"
                                                                   class="campObl form-control new-input"

                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:when>
                                        <c:when test="${questions.questionType == 'NUMBER'}">
                                            <div class="answer-counter">
                                                <div data-answer="id" class="row">
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="input-box">
                                                            <label class="input-label"> Introduceți răspuns </label>
                                                            <input type="number"
                                                                   id="${answers.id}"
                                                                   data-user-id="${idUser}"
                                                                   data-survey-id="${survey.id}"
                                                                   data-question-id="${questions.id}"
                                                                   data-answer-id="${answers.id}"
                                                                   data-final-question-answer=""
                                                                   data-given-answer=""
                                                                   data-answer-session-id="${idSession}"
                                                                   data-answer-year-id="${crtYear.get(0).id}"
                                                                   data-zone-id="${idZona}"
                                                                   value="${savedAnswers.containsKey(String.valueOf(answers.id)) ? savedAnswers.get(String.valueOf(answers.id)) : ''}"
                                                                   class="campObl form-control new-input"

                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:when>
                                        <c:when test="${questions.questionType == 'DATE'}">
                                            <div class="answer-counter">
                                                <div data-answer="id" class="row">
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="input-box active-grey">
                                                            <label class="input-label"> Introduceți răspuns </label>
                                                            <input type="date"
                                                                   id="${answers.id}"
                                                                   data-user-id="${idUser}"
                                                                   data-survey-id="${survey.id}"
                                                                   data-question-id="${questions.id}"
                                                                   data-answer-id="${answers.id}"
                                                                   data-final-question-answer=""
                                                                   data-given-answer=""
                                                                   data-answer-session-id="${idSession}"
                                                                   data-answer-year-id="${crtYear.get(0).id}"
                                                                   data-zone-id="${idZona}"
                                                                   data-value="${savedAnswers.containsKey(String.valueOf(answers.id)) ? savedAnswers.get(String.valueOf(answers.id)) : ''}"
                                                                   class="campObl form-control new-input"
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:when>
                                    </c:choose>
                                </c:forEach>
                            </div>
                        </div>
                    </form>
                </div>
            </c:forEach>
            <div class="w-75">
                <textarea class="campObl form-control new-input"></textarea>
                <%--  aici jos vine textul din obs finale--%>
                <div class="final-obs">
                    ${survey.notesRo}
                </div>
            </div>
            <div class="div-send-answers">
                <div type="button" class="btn btn-primary" onclick="saveSurveyClient(${idSurveyResponse == null ? 0 : idSurveyResponse}, 20)">
                    Trimite
                    răspunsurile
                </div>
            </div>
        </div>
    </div>
</div>

</body>

</html>