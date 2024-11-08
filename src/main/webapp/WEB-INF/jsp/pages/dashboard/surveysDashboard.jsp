<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- <%@include file="includes/path.jsp"%> --%>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
<div class="container-header">
        <div class="d-flex align-items-center container-title">
            <h4 class="page-title">
                Dashboard
            </h4>
        </div>
        <span>
    </span>
    </div>
    <div class="page-content">
    	<div class="row">
    		<div class="col-6 card-to-add">
    			<h6>Nr completari in sesiunea curenta</h6>
		        <table class="table table-xs" id="table_users" style="width: 100%;">
		            <thead>
		            <tr align="left">
		                <th scope="col"><span>Chestionar</th>
		                <th scope="col"><span>Nr. completari</span></th>
		            </tr>
		            </thead>
		            <tbody>
		            <c:forEach var="sc" items="${survey_completions }">
		                <tr >
		                    <td>${sc.survey_title_ro}</td>
		                    <td>${sc.nr_completari}</td>                    
		
		                </tr>
		            </c:forEach>
		            </tbody>
		        </table>
	        </div>
        </div>
</div>


</body>
</html>
