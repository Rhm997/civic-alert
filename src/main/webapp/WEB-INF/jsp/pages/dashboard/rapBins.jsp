<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>

<body>
<div class="rap-page">
    <div class="container-header">
        <h3 class="page-title">
            Pubele asociate
        </h3>
        <jsp:include page="../uat/select_uat.jsp"></jsp:include>
    </div>
    <div class="page-content">
        <form action="#" onsubmit="return false;" id="rapBins" class="content-tabs mt-3">
            <div class="row" style="margin-bottom: .5rem;">
                <div class="col-xl-2 col-lg-3 col-md-6 col-12">
                    <div class="input-box active-grey">
                        <label class="input-label">
                            Din data
                        </label>
                        <input type="date" id="dataStartPr" onchange="" class="form-control new-input daterange"
                               value="${data_start }" data-filter="insertedAtStart">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-12">
                    <div class="input-box active-grey">
                        <label class="input-label">
                            Până la data
                        </label>
                        <input type="date" id="dataEndPr" onchange="" class="form-control new-input daterange"
                               value="${data_stop }" data-filter="insertedAtEnd">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-2 col-lg-3 col-md-6 col-12">
                    <input type="submit" id="" class="btn btn-primary btn-filters" value="Caută" onclick="getRapBins(0);">
                </div>
            </div>
        </form>
        <div class="content-tabs mt-3">
            <table class="table table-xs" id="table_asoc_bins" style="width: 100%;">
                <thead>
                <tr>
                    <th scope="col"><span>Nr. Rol</span></th>
                    <th scope="col"><span>Client</span></th>
                    <th scope="col"><span>Cod bare</span></th>
                    <th scope="col"><span>Dată asociere</span></th>
                    <th scope="col"><span>Dată modificare</span></th>
                    <th scope="col"><span>Locație</span></th>
                    <th scope="col"><span>Acțiuni</span></th>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${bins}" var="bin">
                    <tr onclick="openContract(${bin.contractId})" style="cursor:pointer;">
                        <td>${bin.contractNrDoc}</td>
                        <td>${bin.contractClient}</td>
                        <td>${bin.barCode}</td>
                        <td data-order="${bin.createdAt}">
                            <fmt:formatDate pattern="dd.MM.yyyy HH:mm" value="${bin.createdAt}"/>
                        </td>
                        <td data-order="${bin.modifiedAt}">
                            <fmt:formatDate pattern="dd.MM.yyyy HH:mm" value="${bin.modifiedAt}"/>
                        </td>
                        <td>${bin.location}</td>
                        <td style="white-space: nowrap;" class="dropdown"
                            onclick="event.stopPropagation();event.preventDefault();" data-bs-toggle="dropdown">
                            <a class="fs-6 ps-3 dropdown-toggle-split" href="#">
                                <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right dropdown-menu-end" style="text-align: right;">
                                <li onclick="openContract(${bin.contractId})">
                                    <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"
                                       title="Vizualizare contract">
                                        Vizualizare
                                    </a>
                                </li>
                                <c:if test="${bin.latitudine != '0.0' && bin.latitudine != null && bin.longitudine != '0.0' && bin.longitudine != null}">
                                    <li onclick="openBinMap(false, '${bin.barCode}')">
                                        <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"
                                           title="Vizualizare pe harta">
                                            Vizualizare pe harta
                                        </a>
                                    </li>
                                </c:if>
                            </ul>
                        </td>

                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>