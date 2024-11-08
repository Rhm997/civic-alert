<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%--<%@include file="../includes/path.jsp" %>--%>
<body>
<div class="col-lg-4 col-12 fp-card">
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front mb-3 shadow">
                <div class="card card-body">
                    <div class="row">
                        <div class="fp-card-header">
                            <h5 class="card-body-title">Pubele asociate
                                <span class="btn-neutral fa fa-gear" onclick="flipCard(this)" title="Mai multe"></span>
                            </h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="fp-card-footer">
                            <i class="fa fa-arrow-right" style="width: 20px"></i>
                            <div style="color: #757575; display: inline">Pubele nou asociate:
                                <b class="home-numbers-container">${bins.size()}</b>
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
                                <span class="btn-neutral fa fa-check" title="Salvează" onclick="flipCard(this)"></span>
                            </h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="fp-card-footer">
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    <div class="input-box active-grey">
                                        <label class="input-label">Din data</label>
                                        <input type="date" id="dataStartPr" onchange="" class="form-control new-input daterange" value="${data_start }" data-filter="insertedAtStart">
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="input-box active-grey">
                                        <label class="input-label">Până la data</label>
                                        <input type="date" id="dataEndPr" onchange="" class="form-control new-input daterange" value="${data_stop }" data-filter="insertedAtEnd">
                                    </div>
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
