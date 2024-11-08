<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>
<body>
    <table class="table table-xs" id="table_location" style="width: 100%;">
        <thead>
        <tr>
            <th scope="col"><span>Nr. identificare</span></th>
            <th scope="col"><span>Adresă</span></th>
            <th scope="col"><span>Acțiuni</span></th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="loc" items="${location}">
            <tr>
                <td>${loc.contractRole }</td>
                <td>${loc.fullLocation }</td>
                <td class="dropdown">
                    <a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#">
                        <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right" style="text-align: right;">
                        <li onclick="sendMailAsocPerson(${loc.contractRole}, ${loc.idContract})">
                            <a href="javascript:void(0);">Asociază email</a>
                        </li>
                            <%--                            <li onclick="stergereColectare(${colectare.id }, ${only_table })">--%>
                            <%--                                <a href="javascript:void(0);">Stergere</a>--%>
                            <%--                            </li>--%>
                    </ul>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</body>