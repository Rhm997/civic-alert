<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="java.net.URLDecoder" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<%@ page import="com.fac.civicalert.management.surveys.dto.SurveyFormDTO" %>
<%@ page import="java.util.Map" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>


<html>
<head>
    <title>Test pagina asoc</title>
</head>
<body>
<div class="container-header" style="justify-content: unset; gap: 2.5rem">
    <div class="d-flex align-items-center container-title">
        <h4 class="page-title">
            Adaugă cartonaș cu locație
        </h4>
    </div>
    <span id="data_curenta">
            <button type="button" class="btn btn-primary"
                    onclick="addAsocSurveysToLocation(${permanentSurvey.get(0).id}, '${permanentSurvey.get(0).survey_title_ro}' );">Adaugă</button>
        </span>
</div>
<div id="asocContainer" class="row">
    <c:forEach items="${ids }" var="id">
        <div id="asocCardContainer_${ids.indexOf(id) +1}" class="col-lg-4 col-12 fp-card asoc-container">
            <div class="card card-body mb-3 shadow" id="">
                <div class="row">
                    <div id="asocCardHeader_${ids.indexOf(id) +1}" data-id-zone="${id.id_zone}"
                         class="fp-card-header row">
                        <div class="align-items-center d-flex justify-content-between p-0">
                            <h6 class="card-body-title">
                                    ${id.zone}
                            </h6>
                            <button class="btn btn-primary"
                                    data-remove-card-asoc="#asocCardContainer_${ids.indexOf(id) +1}"
                                    onclick="removeAsocCard(this)">X
                            </button>
                        </div>
                        <div class="search-asoc-container p-0">
                            <div class="form-group col-12">
                                <label for="filterList" class="sr-only">Filter</label>
                                <input class="campObl neEdit form-control new-input mt-0" id="filterList"
                                       placeholder="&#xF002;" type="text" style="font-family: FontAwesome;"/>
                                <small class="form-text text-muted"></small>
                            </div>
                            <ul class=" m-0 asoc-survey-locations_${ids.indexOf(id) +1} zones-list"
                                id="asocSurveyToLocations_${ids.indexOf(id) +1}">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div id="asocSurveysList_${ids.indexOf(id) +1}" class="fp-card-footer surveys-container-for-asoc">
                        <div class="input-box focus asoc-user-surveys campObl neEdit m-0 w-100">
                            <select id="asocUserSurveys_${ids.indexOf(id) +1}" class="campObl neEdit m-0 w-100"
                                    onchange="addSurveyToList(this)">
                                <option>Selectează chestionarele</option>
                                <c:forEach items="${asocs}" var="asoc">
                                    <c:if test="${asoc.id_zone == id.id_zone}">
                                        <c:set var="excludedSurveyIds" value="${fn:split(asoc.id_survey, ',')}" />
<                                        <option>${excludedSurveyIds}</option>
                                    </c:if>
                                </c:forEach>
                                <c:forEach items="${surveys}" var="survey">
                                    <c:set var="isExcluded" value="false" />

                                    <!-- Loop through the excluded IDs to check if the current survey is excluded -->
                                   <c:forEach items="${excludedSurveyIds}" var="excludedId">
                                        <c:if test="${excludedId == survey.id}">
                                            <c:set var="isExcluded" value="true" />
                                        </c:if>
                                       <option>${excludedId}</option>
                                    </c:forEach>

                                    <!-- Print the survey if it is not excluded -->
                                    <c:if test="${!isExcluded}">
                                        <%--<option value="${survey.id}">${survey.titleRo}</option>--%>
                                    </c:if>
                                </c:forEach>

                            </select>
                        </div>
                        <c:forEach items="${asocs}" var="asoc">
                            <c:if test="${asoc.id_zone == id.id_zone}">
                                <div class='removable-survey d-flex justify-content-between align-items-center'>
                                    <div class='mb-0' data-id="${asoc.id_survey}"
                                         data-survey-id="+survey.options[survey.selectedIndex].value+"> ${asoc.survey_title_ro}
                                    </div>
                                    <div class='remove-survey-asoc mb-0'
                                         data-id="${asoc.id_survey}"
                                         data-survey="${asoc.id_survey}"
                                         data-count="${ids.indexOf(id) +1}"><i class="fa fa-trash"
                                                                               aria-hidden=\"true\"></i></div>
                                </div>
                            </c:if>
                        </c:forEach>
                    </div>
                </div>
            </div>
        </div>
    </c:forEach>
</div>
<footer class="msg-footer mt-3 mb-3" id="footer">
    <div>
        <span>
            <button type="button" class="btn btn-primary"
                    onclick="saveAsocUserZoneSurvey();">Salvează</button>
        </span>
    </div>
</footer>

</body>
</html>
