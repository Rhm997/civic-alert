<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@include file="../includes/path.jsp" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
      div#container.container-user-content {
        box-shadow: unset !important;
      }

      .fp-card:hover .card-body {
        transform: unset;
        cursor: unset;
      }


    </style>
</head>
<body onload="gototop();">

<div class="container-header">
    <div class="d-flex align-items-center container-title">
        <h4 class="page-title">Contul meu</h4>
    </div>
    <span>
        <c:if test="${user.id > 0}">
            <input type="button" class="btn btn-primary" onclick="openModal('#modalChangePass')" value="Modifică parolă"
            />
        </c:if>
    </span>
</div>
<div class="page-content row justify-content-center">
    <div class="col-md-10 " style="display: inline-block;">
        <div class="card-header">
            <ul class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                <a class="nav-link active" id="nav-data-tab" data-bs-toggle="tab" data-bs-target="#nav-data"
                   type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                    <span class="fa-solid fa-circle-user"></span> Date
                </a>
                <c:if test="${user.id > 0}">
                    <a class="nav-link" id="nav-groups-tab" data-bs-toggle="tab" data-bs-target="#nav-groups"
                       type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        <span class="fa-solid fa-location-dot"></span> Locații terenuri
                    </a>
                </c:if>
            </ul>
        </div>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="nav-data" role="tabpanel" aria-labelledby="nav-data-tab">
               <form id="personForm" data-changed="false">
                    <input type="hidden" data-key="idUser" value=""/>
                    <input type="hidden" data-key="id" value=""/>
                    <div class="col-12 fp-card card-form">
                        <div id="" class="card card-body shadow">
                            <div class="row">
                                <div class="col-12 titlu-categorie subtitlu">Date personale</div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label">Nume </label>
                                        <input type="text"
                                               class="campObl neEdit form-control new-input"
                                               data-key="fname"
                                               data-name="Nume"
                                               value=""/>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label">Prenume</label>
                                        <input type="text"
                                               class="campObl form-control new-input"
                                               data-key="lname"
                                               data-name="Prenume"
                                               value="">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="control-label input-label"><span class="lang-change"
                                                                                       data-lang-id="labelEmail">Email</span></label>
                                        <input class="campObl form-control new-input new-user-data" type="text"
                                               id="email" data-key="email" data-name="Email"
                                               autocomplete="one-time-code" value="${user.email}">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label" for="pass1">Parola</label>
                                        <input type="password"
                                               class="form-control clear-data no-upper new-input new-user-data"
                                               id="pass1" name="pass1" onkeyup="passVal()" data-key="password"
                                               autocomplete="one-time-code"/>
                                        <span toggle="#pass1" class="fa fa-eye field-icon toggle-password"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 titlu-categorie subtitlu">Informații suplimentare</div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label "> Ocupație (opțional)</label>
                                        <select data-key="" class="campObl neEdit form-control new-input" data-name="Tip chestionar" data-question="questionType">
                                            <option value="Agricultură"> Selectați </option>
                                            <option value="Agricultură"> Fermier </option>
                                            <option value="Silvicultură"> Agricultor </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label">Compania (opțional)</label>
                                        <input type="text"
                                               class="campObl neEdit form-control new-input focus-bottom-border"
                                               data-key="phone" data-name="Telefon" value=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="div-btns">
                                <button type="button" class="btn btn-primary" onclick="creatOrUpdateUser();">Actualizează datele</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="tab-pane fade" id="nav-groups" role="tabpanel" aria-labelledby="nav-groups-tab">
                <div>
                    <div class="input-box focus">
                        <label class="input-label">Chestionare </label>
                        <select id="surveyZones"data-key=""
                                class="campObl neEdit form-control new-input"
                                data-name="Tip intrebare"
                                data-question="questionType"
                                onchange="checkSurveysAsoc(this.value)">
                            <option>Selectează chestionarul</option>
                            <c:forEach items="${surveys}" var="surveys">
                                <option value="${surveys.id }" > ${surveys.titleRo }</option>
                            </c:forEach>
                        </select>
                    </div>
                   <%-- <jsp:include page="../harti/localizare.jsp"></jsp:include></div> --%>
                    <iframe src="http://localhost:8081/HartaLocalizare" width="400" height="400"></iframe>
                </div>
                <div class="card card-body mb-3 mt-3 p-2 shadow">
                    <form>
                        <select id="user_asoc_survey_zones" class="dual-list" multiple>
                            <c:forEach var="zones" items="${zones}">
                                <option value="${zones.id}" >${zones.county } ${zones.city}</option>
                            </c:forEach>
                        </select>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary mx-auto"
                                    onclick="updateAsocSurveyZones()">
                                Actualizează
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<c:if test="${user.id > 0}">
    <div class="modal fade" id="modalChangePass" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modifică parolă
                        <br>
                        <span id="modal_subtitle" class="modal-title small" style="color: #188a15"></span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

                    </button>
                </div>
                <div class="modal-body">

                    <div class="col-lg-12 ">
                        <div class="input-box">
                            <label class="input-label" for="pass0">Parolă veche</label>
                            <input type="password" class="form-control clear-data no-upper new-input" id="pass0"
                                   name="pass0"/>
                            <span toggle="#pass0" class="fa fa-eye field-icon toggle-password"></span>
                        </div>
                    </div>
                    <div>
                        <div class="col-lg-12">
                            <div class="input-box">
                                <label class="input-label" for="pass1">Parolă nouă</label>
                                <input type="password" class="form-control clear-data no-upper new-input" id="pass1"
                                       name="pass1" onkeyup="passVal()"/>
                                <span toggle="#pass1" class="fa fa-eye field-icon toggle-password"></span>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="input-box">
                                <label class="input-label" for="pass2">Confirmare parolă</label>
                                <input type="password"
                                       class="form-control clear-data no-upper new-input focus-bottom-border"
                                       id="pass2"
                                       name="pass2"/>
                                <span toggle="#pass2" class="fa fa-eye field-icon toggle-password"></span>
                            </div>
                        </div>
                        <div id="validation-box" class="mt-2" style="background: unset">
                            <h5 class="modal-title1">
                                <span class="title"> Parola trebuie să conțină: </span>
                            </h5>
                            <div id="letter" class="invalid"><i class="fas fa-times"></i> Litere mici</div>
                            <div id="capital" class="invalid"><i class="fas fa-times"></i> Litere mari</div>
                            <div id="numbersOrSpecial" class="invalid"><i class="fas fa-times"></i>Cifre sau caractere speciale
                            </div>
                            <div id="length" class="invalid"><i class="fas fa-times"></i>Cel puțin 6 caractere
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="only_table_modal">
                    <button type="button" class="btn btn-secondary discard-button" data-bs-dismiss="modal">
                        Renunță
                    </button>
                    <button id="btnChangePass" type="button" onclick="changePassword('${user.id}', '${user.email}')"
                            class="btn btn-primary btn-autentif" disabled>
                        Salvează
                    </button>
                </div>
            </div>
        </div>
    </div>
</c:if>
</body>
</html>