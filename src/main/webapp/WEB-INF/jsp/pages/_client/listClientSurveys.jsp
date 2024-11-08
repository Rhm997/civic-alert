<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewPersonsPage">
    <div class="container-header">
        <div class="d-flex align-items-center container-title">
            <h4 class="page-title">
                Chestionarele mele
            </h4>
        </div>
    </div>
    <div class="page-content">
       
       <div>
                    <div class="input-box focus">
                        <label class="input-label">Chestionare </label>
                        <select id="userSurveys"data-key=""
                                class="campObl neEdit form-control new-input"
                                onchange="">
                            <option>Selectează chestionarul</option>
                            <c:forEach items="${mySurveys}" var="survey">
                                <option value="${survey.id}" > ${survey.survey_title_ro }</option>
                            </c:forEach>
                        </select>
                    </div>
                    
                    <div>
                    <label for="week">Selectati saptamana:</label>
        			<input type="week" id="crtweek" name="week" required>
        			<br><br>
        			<button type="button" class="btn btn-primary" onclick="raspunsuriperweek();">Vezi raspunsuri</button>
        			</div>
                   
       </div>
    <div id="divresponses"></div>
    </div>
</div>

</body>

</html>