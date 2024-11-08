<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>

<body>
<div id="listResponse" class="viewFoldersPage">
    <div id="viewQuestion" class="page-content">
        <c:forEach items="${survey.questions}" var="questions" varStatus="loop">
            <div class="p-3 m-4 w-75 view-question-card">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="mb-3 mt-3">
                            <div class="mb-3 mt-3">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12">
                                        <div id="${questions.id}"
                                             class="question-title"> ${questions.ord}. ${questions.textRo}</div>
                                        <span class="question-description">${questions.questNotesRo}</div>
                                </div>
                                <c:forEach items="${questions.answers}" var="answers" varStatus="loop">
                                    <c:choose>
                                        <c:when test="${questions.questionType == 'SINGLE'}">
                                            <div class="row d-flex justify-content-center mt-2 answer-counter">
                                                <label for="${r.id_survey}" class="input-label input-check">
                                                    <input type="radio" id="${r.id_survey}" class="form-check-input"
                                                           name="raspRo" ${raspunsuri.containsKey(String.valueOf(answers.id)) ? "checked" : ''}
                                                           disabled> ${answers.descriptionRo}
                                                </label>
                                            </div>
                                        </c:when>
                                        <c:when test="${questions.questionType == 'MULTIPLE'}">
                                            <div class="row d-flex justify-content-center mt-2 answer-counter">
                                                <label for="${r.id_survey}" class="input-label input-check">
                                                    <input type="checkbox" id="${r.id_survey}" class="form-check-input"
                                                           value="" ${raspunsuri.containsKey(String.valueOf(answers.id)) ? "checked" : ''}
                                                           disabled> ${answers.descriptionRo}
                                                </label>
                                            </div>
                                        </c:when>
                                        <c:when test="${questions.questionType == 'TEXT'}">
                                            <div class="answer-counter">
                                                <div data-answer="id" class="row">
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="input-box">
                                                            <label class="input-label"> Introduceți răspuns </label>
                                                            <input disabled type="text"
                                                                   value="${raspunsuri.containsKey(String.valueOf(answers.id)) ? raspunsuri.get(String.valueOf(answers.id)) : ''}"
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
                                                            <input disabled type="number"
                                                                   value="${raspunsuri.containsKey(String.valueOf(answers.id)) ? raspunsuri.get(String.valueOf(answers.id)) : ''}"
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
                                                            <input disabled type="date"
                                                                   data-value="${raspunsuri.containsKey(String.valueOf(answers.id)) ? raspunsuri.get(String.valueOf(answers.id)) : ''}"
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
                    </div>
                </form>
            </div>
        </c:forEach>
    </div>
</div>


<%--<table class="table table-xs" id="table_users" style="width: 100%;">
    <thead>
    <tr align="left">
        <th scope="col"><span>Zona</th>
        <th scope="col"><span>Intrebare</th>
        <th scope="col"><span>Raspuns</span></th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="r" items="${raspunsuri}">
        <tr>
            <td>${r.zona}</td>
            <td>${r.intrebare_ro}</td>
            <td>${r.optiune_raspuns_ro}</td>
        </tr>
    </c:forEach>
    </tbody>
</table>--%>


</body>
</html>