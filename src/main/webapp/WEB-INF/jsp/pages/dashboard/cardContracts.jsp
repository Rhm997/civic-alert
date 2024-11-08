<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%--<%@include file="../includes/path.jsp" %>--%>
<body>
<div class="flip-card" id="rapContracts">
    <div class="flip-card-inner">
        <div class="flip-card-front mb-3 shadow">
            <div class="card card-body">
                <div class="row">
                    <div class="fp-card-header">
                        <h5 class="card-body-title">Contracte modificate
                            <span class="btn-neutral fa fa-gear" onclick="flipCard(this)" title="Mai multe"></span>
                            <span class="btn-neutral fa-solid fa-square-arrow-up-right me-2" onclick="$('#rap_contracts').trigger('click');" title="Vizualizare raport"></span>
                        </h5>
                    </div>
                </div>
                <div class="row">
                    <div class="fp-card-footer">
                        <i class="fa fa-arrow-right" style="width: 20px"></i>
                        <div style="color: #757575; display: inline">Contracte modificate:
                            <b class="home-numbers-container">${contracts.size()}</b>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>
        <div class="flip-card-back">
            <div class="card card-body">
                <div class="row">
                    <div class="fp-card-header">
                        <h5 class="card-body-title">Filtre
                            <span class="btn-neutral fa fa-check" title="Salvează" onclick="getRapContracts(1); flipCard(this)"></span>
                        </h5>
                    </div>
                </div>
                <div class="row">
                    <div class="fp-card-footer">
                        <div class="row justify-content-between">
                            <div class="col-6">
                                <div class="input-box active-grey">
                                    <label class="input-label">Din data</label>
                                    <input type="date" id="dataStartCtr" onchange="" class="form-control new-input daterange" value="${formattedDateNowRo }" data-filter="insertedAtStart" data-value="${formattedDateNow}">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-box active-grey">
                                    <label class="input-label">Până la data</label>
                                    <input type="date" id="dataEndCtr" onchange="" class="form-control new-input daterange" value="${data_stop }" data-filter="insertedAtEnd">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
