<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>

<body>
<div class="rap-page">
    <div class="container-header">
        <h4 class="page-title">
            Pubele asociate azi
        </h4>
    </div>
    <div class="page-content">
        <%--        <form action="#" onsubmit="return false;">--%>
        <%--            <div class="row" style="margin-bottom: .5rem;">--%>
        <%--                <div class="col-xl-2 col-lg-3 col-md-6 col-12">--%>
        <%--                    <div class="input-box">--%>
        <%--                        <label class="input-label">Nume</label>--%>
        <%--                        <input type="text" id="nume_search_id" class="form-control new-input"--%>
        <%--                               value="${nume_solicitant }">--%>
        <%--                    </div>--%>
        <%--                </div>--%>
        <%--                <div class="col-xl-2 col-lg-3 col-md-6 col-12">--%>
        <%--                    <div class="input-box">--%>
        <%--                        <label class="input-label">Email</label>--%>
        <%--                        <input type="text" id="cnp_search_id" class="form-control new-input" value="${cnp_solicitant }">--%>
        <%--                    </div>--%>
        <%--                </div>--%>
        <%--                <div class="col-xl-2 col-lg-3 col-md-6 col-12">--%>
        <%--                    <div class="input-box">--%>
        <%--                        <label class="input-label">Adresă</label>--%>
        <%--                        <input type="text" id="nr_contract" class="form-control new-input" value="${nr_contract }">--%>
        <%--                    </div>--%>
        <%--                </div>--%>
        <%--            </div>--%>
        <%--            <div class="row">--%>
        <%--                <div class="col-xl-2 col-lg-3 col-md-6 col-12">--%>
        <%--                    <input type="submit" id="" class="btn btn-primary" value="Caută" onclick="viewUsers();">--%>
        <%--                </div>--%>
        <%--            </div>--%>
        <%--        </form>--%>
        <table class="table table-xs" id="table_asoc_bins" style="width: 100%;">
            <thead>
            <tr>
                <th scope="col"><span>Nr. Rol</span></th>
                <th scope="col"><span>Client</span></th>
                <th scope="col"><span>Cod pubelă</span></th>
                <th scope="col"><span>Acțiuni</span></th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${bins}" var="bin">
                <c:set var="contract" value="${bin.contracts[0]}"></c:set>
                <tr onclick="openContract(${contract.id})" style="cursor:pointer;">
                    <td>${contract.nrDoc}</td>
                    <td>${contract.clientName}</td>
                    <td>${bin.barCode}</td>
                    <td style="white-space: nowrap;" class="dropdown"
                        onclick="event.stopPropagation();event.preventDefault();event.preventDefault();">
                        <a class="fs-6 ps-3 dropdown-toggle-split" data-bs-toggle="dropdown" href="#">
                            <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" style="text-align: right;">
                            <li onclick="viewUser(false, ${user.id})">
                                <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"
                                   title="Vizualizare contract">
                                    Vizualizare
                                </a>
                            </li>
                            <li onclick="stergereContract(${user.id})">
                                <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"
                                   title="Ștergere contract">
                                    Ștergere
                                </a>
                            </li>
                        </ul>
                    </td>

                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</div>
</body>