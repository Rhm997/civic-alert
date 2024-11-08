<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>

<body>
<div class="rap-page">
    <div class="container-header">
        <h4 class="page-title">
            Contracte modificate
        </h4>
    </div>
    <div class="page-content">

        <form action="#" onsubmit="return false;" id="rapContracts" class=" content-tabs mt-3">
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
                <div class="col-xl-2 col-lg-3 col-md-6 col-12">
                    <div class="input-box active-grey">
                        <label class="input-label">UAT-uri </label>
                        <select class="form-control selectCodClient new-input focus-bottom-border" data-filter="uat">
                            <option value="0">Toate</option>
                            <c:forEach items="${uat }" var="uat">
                                <option value="${uat.id }">${uat.name }</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-12">
                    <div class="input-box active-grey">
                        <label class="input-label">Locație activă </label>
                        <select class="form-control selectCodClient new-input focus-bottom-border form-select"
                                data-filter="active">
                            <option value="">Toate</option>
                            <option value="1">Da</option>
                            <option value="0">Nu</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-2 col-lg-3 col-md-6 col-12">
                    <input type="reset" class="btn btn-secondary" value="Resetează" onclick="getRapContracts();"/>
                    <input type="submit" id="" class="btn btn-primary" value="Caută"
                           onclick="getRapContracts(0);">
                </div>
            </div>
        </form>
        <div class="content-tabs mt-3">
            <table class="table table-xs" id="table_rap_contracts" style="width: 100%;">
                <thead>
                <tr>
                    <th scope="col"><span>Nr. identificare</span></th>
                    <th scope="col"><span>Nume</span></th>
                    <th scope="col"><span>Locație</span></th>
                    <th scope="col"><span>Persoane locație</span></th>
                    <th scope="col"><span>Nr. pubele</span></th>
                    <th scope="col"><span>Acțiuni</span></th>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${contracts}" var="contract">
                    <tr onclick="openContract(${contract.id})"
                        style="cursor:pointer; ${contract.active == 'nu' ? 'color: #b6b8b9;' : ''}">
                        <td>${contract.nrDoc}</td>
                        <td>${contract.clientName}</td>
                        <td>${contract.locationAddress}</td>
                        <td>${contract.nrPers}</td>
                        <td>${contract.bins}</td>
                        <td style="white-space: nowrap;" class="dropdown"
                            onclick="event.stopPropagation();event.preventDefault();event.preventDefault();">
                            <a class="fs-6 ps-3 dropdown-toggle-split" data-bs-toggle="dropdown" href="#">
                                <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right" style="text-align: right;">
                                <li onclick="openContract(${contract.id})">
                                    <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"
                                       title="Vizualizare">
                                        Vizualizare
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
</div>
</body>