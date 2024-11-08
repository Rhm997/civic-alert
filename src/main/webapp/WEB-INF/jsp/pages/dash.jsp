<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<%@include file="includes/path.jsp" %>
<body>

<jsp:useBean id="now" class="java.util.Date"/>
<div id="pagPricip" class="row row-gap-4">
    <%--                onclick="$('#rap_asoc_bins').trigger('click');"--%>
    <div class="col-lg-3 col-12 fp-card">
        <%@include file="dahsboard/cardBins.jsp" %>
    </div>
    <%--    <div class="col-lg-3 col-12 fp-card">--%>
    <%--        <%@include file="dahsboard/cardContracts.jsp" %>--%>
    <%--    </div>--%>
    <div class="col-lg-3 col-12 fp-card">
        <%@include file="dahsboard/cardCollects.jsp" %>
    </div>
    <div class="col-lg-3 col-12 fp-card">
        <%@include file="dahsboard/cardProblems.jsp" %>
    </div>
</div>

</body>