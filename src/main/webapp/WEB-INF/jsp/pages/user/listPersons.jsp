<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewPersonsPage">
    <div class="container-header">
        <div class="d-flex align-items-center container-title">
            <h4 class="page-title">
               Listă personal
            </h4>
        </div>
        <span>
            <input type="button" class="btn btn-primary" value="Adaugă" onclick="viewPerson()">
        </span>
    </div>
    <div class="page-content">
        <table class="table table-xs" id="table_persons" style="width: 100%;">
            <thead>
            <tr align="left">
                <th scope="col"><span>Nume</span></th>
                <th scope="col"><span>Funcție</span></th>
                <th scope="col"><span>Departament</span></th>
                <th scope="col"><span>Localizare</span></th>
                <th scope="col"><span>Acțiuni</span></th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>


    </div>
</div>
</body>
</html>