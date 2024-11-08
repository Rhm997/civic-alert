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
        <h4 class="page-title">
            <%--            ${user.id == null ? 'Adăugare persoană' : (user.id == loggedUser ? 'Contul meu' : 'Editare persoană') }--%>
            <c:choose>
                <c:when  test="${user.id == null}">
                    <spring:message code="list.people" text="Adăugare persoană"/>
                </c:when>
                <c:when test="${user.id == loggedUser}">
                    <spring:message code="account.title" text="Contul meu"/>
                </c:when>
                <c:otherwise>
                    <spring:message code="edit.person" text="Editare persoană"/>
                </c:otherwise>
            </c:choose>
        </h4>
    </div>
    <span>
        <c:if test="${user.id > 0}">
            <input type="button" class="btn btn-primary" onclick="openModal('#modalChangePass')" value="<spring:message code="account.change-pass" text="Modifică parolă"/>"
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
                    <span class="fa-solid fa-circle-user"></span> <spring:message code="account.tab.data" text="Date"/>
                </a>
                <c:if test="${user.id > 0}">
                    <security:authorize access="hasAnyAuthority('MASTER', 'USER_GROUP_ADD')">
                        <a class="nav-link" id="nav-groups-tab" data-bs-toggle="tab" data-bs-target="#nav-groups"
                           type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <span class="fa-solid fa-user-group"></span> <spring:message code="account.tab.groups" text="Grupuri"/>
                        </a>
                        <a class="nav-link" id="nav-roles-tab" data-bs-toggle="tab" data-bs-target="#nav-roles"
                           type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                            <span class="fa-solid fa-hand"></span> <spring:message code="account.tab.rights" text="Drepturi"/>
                        </a>
                    </security:authorize>
                </c:if>
            </ul>
        </div>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="nav-data" role="tabpanel" aria-labelledby="nav-data-tab">
                <div class="row d-flex justify-content-center mt-2">
                    <div class="col-12"></div>
                    <div class="col-lg-4 col-md-12">
                        <div class="active-grey input-box">
                            <label class="input-label"><spring:message code="account.active" text="Activ"/></label>
                            <div class="form-control neEdit new-input">
                                <div class="align-items-center d-flex form-check justify-content-around p-0 h-100">
                                    <div>
                                        <input type="radio" class="form-check-input new-user-data" id="is_active_1"
                                               data-key="active" name="isActive" value="true" checked="checked">
                                        <label class="form-check-label" for="is_active_1"><spring:message code="afirmative.yes" text="Da"/></label>
                                    </div>
                                    <div>
                                        <input type="radio" class="form-check-input" id="is_active_2" name="isActive"
                                               value="false">
                                        <label class="form-check-label" for="is_active_2"><spring:message code="negative.no" text="Nu"/></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form id="personForm" data-changed="false">
                    <input type="hidden" data-key="idUser" value="${user.id}"/>
                    <input type="hidden" data-key="id" value="${user.person.id}"/>
                    <div class="col-12 fp-card card-form">
                        <div id="" class="card card-body mb-3 mt-3 shadow">
                            <div class="row p-0">
                                <div class="legenda-obl pb-0">
                                    *<spring:message code="required-field" text="Câmp obligatoriu"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 titlu-categorie subtitlu">*<spring:message code="account.personal-details" text="Date personale"/></div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> *<spring:message code="account.firstname" text="First name"/> </label>
                                        <input type="text"
                                               class="campObl neEdit form-control new-input"
                                               data-key="fname"
                                               data-name="Nume"
                                               value="${user.person.fname}"/>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> *<spring:message code="account.lastname" text="Last name"/></label>
                                        <input type="text"
                                               class="campObl form-control new-input"
                                               data-key="lname"
                                               data-name="Prenume"
                                               value="${user.person.lname}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 titlu-categorie subtitlu"><spring:message code="account.user-details" text="Date utilizator"/></div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"><span class="lang-change" data-lang-id="labelNume">*<spring:message code="account.username" text="Utlizator"/></span></label>
                                        <input class="form-control neEdit campObl new-input new-user-data" type="text"
                                               id="username" data-key="username" data-name="Utilizator"
                                               value="${user.username}">
                                        <input type="hidden" id="username_hidden" value="${user.username}">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-box">
                                        <label class="control-label input-label"><span class="lang-change"
                                                                                       data-lang-id="labelEmail">*Email</span></label>
                                        <input class="campObl form-control new-input new-user-data" type="text"
                                               id="email" data-key="email" data-name="Email"
                                               autocomplete="one-time-code" value="${user.email}">
                                    </div>
                                </div>
                                <c:if test="${user.id == null}">
                                    <div class="col-lg-12">
                                        <div class="input-box">
                                            <label class="input-label" for="pass1">Parola</label>
                                            <input type="password"
                                                   class="form-control clear-data no-upper new-input new-user-data"
                                                   id="pass1" name="pass1" onkeyup="passVal()" data-key="password"
                                                   autocomplete="one-time-code"/>
                                            <span toggle="#pass1" class="fa fa-eye field-icon toggle-password"></span>
                                        </div>
                                    </div>
                                    <div id="validation-box" class="d-flex flex-wrap justify-content-between"
                                         style="background: unset">
                                        <h5 class="modal-title1">
                                            <span class="title"> <spring:message code="condition.pass.h" text="Parola trebuie să conțină"/>: </span>
                                        </h5>
                                        <span id="letter" class="invalid"><i
                                                class="fas fa-times"></i> <spring:message code="condition.pass.sm-letters" text="Litere mici"/></span>
                                        <span id="capital" class="invalid"><i
                                                class="fas fa-times"></i> <spring:message code="condition.pass.xl-letters" text="Litere mari"/></span>
                                        <span id="numbersOrSpecial" class="invalid"><i class="fas fa-times"></i> <spring:message code="condition.pass.numbers-special" text="Cifre sau caractere speciale"/>
                                        </span>
                                        <span id="length" class="invalid"><i class="fas fa-times"></i> <spring:message code="condition.pass.length" text="Cel puțin 6 caractere"/>
                                        </span>
                                    </div>
                                </c:if>
                            </div>
                            <div class="row">
                                <div class="col-12 titlu-categorie subtitlu"><spring:message code="account.other-info" text="Informații suplimentare"/></div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label">*<spring:message code="account.other-info.disposition" text="Dispoziție"/> </label>
                                        <select class="campObl neEdit form-control new-input"
                                                data-key="idDisposition">
                                            <c:forEach items="${dispozitions}" var="dispozition">
                                                <option value="${dispozition.value}" ${user.person.idDisposition == dispozition.value ? 'selected' : ''}>
                                                        ${dispozition.description}
                                                </option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label"><spring:message code="account.other-info.position" text="Poziție"/> </label>
                                        <select class="campObl neEdit form-control new-input"
                                                data-key="idPositionNom">
                                            <option value="-1"><spring:message code="account.other-info.position.option" text="Selectați poziția"/></option>
                                            <c:forEach items="${positions}" var="positions">
                                                <option value="${positions.value}" ${user.person.idPositionNom == positions.value ? 'selected' : ''}>
                                                        ${positions.description}
                                                </option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label"><spring:message code="account.other-info.qualification" text="Calificare"/> </label>
                                        <select class="campObl neEdit form-control new-input"
                                                data-key="idQualification">
                                            <option value="-1"><spring:message code="account.other-info.qualification.option" text="Selectați calificarea"/></option>
                                            <c:forEach items="${qualifications}" var="qualification">
                                                <option value="${qualification.value}" ${user.person.idQualification == qualification.value ? 'selected' : ''}>
                                                        ${qualification.description}
                                                </option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label">*<spring:message code="account.other-info.institution" text="Instituție"/> </label>
                                        <select id="institutionVizPers"
                                                class="campObl neEdit form-control new-input"
                                                data-key="idInstitution">
                                            <option value=""><spring:message code="account.other-info.institution.option" text="Selectați instituția"/></option>
                                            <c:forEach items="${institutions}" var="institution">
                                                <option value="${institution.id}" ${user.person.idInstitution == institution.id ? 'selected' : ''}>
                                                        ${institution.description}
                                                </option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label">* <spring:message code="account.other-info.phone" text="Telefon"/></label>
                                        <input type="text"
                                               class="campObl neEdit form-control new-input focus-bottom-border"
                                               data-key="phone" data-name="Telefon" value="${user.person.phone}"/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> *<spring:message code="account.other-info.location" text="Localizare"/> </label>
                                        <input type="text"
                                               class="campObl neEdit form-control new-input"
                                               data-key="localization"
                                               value="${user.person.localization}"/>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> *<spring:message code="account.other-info.department" text="Departament"/></label>
                                        <input type="text"
                                               class="campObl form-control new-input"
                                               data-key="department"
                                               data-name="Departament"
                                               value="${user.person.department}">
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="input-box">
                                        <label class="input-label"> *<spring:message code="account.other-info.function" text="Funcție"/></label>
                                        <input type="text"
                                               class="campObl form-control new-input"
                                               data-key="job"
                                               data-name="Funcție"
                                               value="${user.person.job}">
                                    </div>
                                </div>
                                <%--                                <div class="col-lg-4 col-md-12">--%>
                                <%--                                    <div class="input-box">--%>
                                <%--                                        <label class="input-label"> *Prag de alertă (dW/dm)</label>--%>
                                <%--                                        <select class="campObl neEdit form-control new-input focus-bottom-border"--%>
                                <%--                                                onchange="" data-key="alertLimit" data-name="Prag de alertă">--%>
                                <%--                                            <option>Alege prag</option>--%>
                                <%--                                        </select>--%>
                                <%--                                    </div>--%>
                                <%--                                </div>--%>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="input-box">
                                        <label class="input-label"> <spring:message code="account.other-info.obs" text="Observații"/></label>
                                        <textarea type="text" class="form-control new-input no-upper" data-key="obs"
                                                  style="height: 60px; padding-top: 10px">${user.person.obs}</textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="person_data" class="row" style="${user.id == null ? 'display: none' : ''}">
                        <div class="col-6 fp-card">
                            <div class="card card-body mb-3 shadow">
                                <div class="fp-card-header">
                                    <div class="titlu-categorie titlu-categorie-contract titlu-adaugare">Contact
                                        <button type="button" class="btn btn-add btn-primary neEdit"
                                                onclick="addEntityContact('person')">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div class="fp-card-content" id="entity_contacts">
                                    <c:forEach items="${user.person.contacts}" var="contact">
                                        <div class="card">
                                            <div class="row g-0">
                                                <div class="col-md-2"
                                                     style="background: #2798f2; display: flex; justify-content: center">
                                                    <img src="resources/images/contact-icon.png"
                                                         class="img-fluid rounded-start" alt="..."
                                                         style="height: 80px; margin: auto">
                                                </div>
                                                <div class="col-md-10">
                                                    <div class="card-body p-2">
                                                        <div class="btn-sterge-contact">
                                                            <button type="button" class="btn btn-add btn-primary neEdit"
                                                                    onclick="">
                                                                x
                                                            </button>
                                                        </div>
                                                        <p class="card-text"><b><spring:message code="table.description" text="Descriere"/>
                                                            contact:</b> ${contact.description}</p>
                                                        <p class="card-text"><b><spring:message code="table.phone" text="Telefon"/>:</b> ${contact.phone}</p>
                                                        <p class="card-text"><b>Email:</b> ${contact.email}</p>
                                                        <p class="card-text"><b>Fax:</b> ${contact.fax}</p>
                                                        <p class="card-text"><b><spring:message code="table.address" text="Adresă"/>:</b> ${contact.fullAddress}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 fp-card">
                            <div class="card card-body mb-3 shadow">
                                <div class="fp-card-header">
                                    <div class="titlu-categorie titlu-categorie-contract"
                                         style="font-weight: bold; font-size: 0.8rem;"><spring:message code="account.interventions" text="Intervenții"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="tab-pane fade" id="nav-groups" role="tabpanel" aria-labelledby="nav-groups-tab">
                <%--                <div class="col-lg-6 col-md-12">--%>
                <%--                    <div class="input-box">--%>
                <%--                        <label class="input-label">Grupuri </label>--%>

                <%--                        <select class="campObl neEdit form-control new-input focus-bottom-border" onchange="" style="height: 82px; padding-top: 15px; " multiple>--%>

                <%--                            <option value="0">Grup 1</option>--%>
                <%--                            <option value="1">Grup 2</option>--%>
                <%--                            <option value="2">Grup 3</option>--%>
                <%--                            <option value="3">Grup 4</option>--%>
                <%--                            <option value="4">Grup 5</option>--%>
                <%--                        </select>--%>
                <%--                    </div>--%>


                <%--                </div>--%>
                <div class="card card-body mb-3 mt-3 p-2 shadow">
                    <form>
                        <select id="user_groups" class="dual-list" multiple>
                            <c:forEach var="group" items="${groups}">
                                <option value="${group.id}" ${user.idsGroups.contains(group.id) ? 'selected': ''}>${group.name}</option>
                            </c:forEach>
                        </select>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary mx-auto"
                                    onclick="updateUserGroups(${user.id})">
                                <spring:message code="btn.update" text="Actualizează"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-roles" role="tabpanel" aria-labelledby="nav-roles-tab">
                <%--                <div class="col-lg-6 col-md-12">--%>

                <%--                    <div class="input-box">--%>
                <%--                        <label class="input-label"> Drepturi </label>--%>

                <%--                        <select class="campObl neEdit form-control new-input focus-bottom-border" onchange="" style="height: 82px; padding-top: 15px; " multiple>--%>
                <%--                            <option value="0">Drept 1</option>--%>
                <%--                            <option value="1">Drept 2</option>--%>
                <%--                            <option value="2">Drept 3</option>--%>
                <%--                            <option value="3">Drept 4</option>--%>
                <%--                            <option value="4">Drept 5</option>--%>
                <%--                        </select>--%>
                <%--                    </div>--%>
                <%--                </div>--%>
                <div class="card card-body mb-3 mt-3 p-2 shadow">
                    <form>
                        <select id="user_roles" class="dual-list" multiple>
                            <c:forEach var="role" items="${roles}">
                                <c:set var="userRole"
                                       value="${user.roles.stream().filter(r -> r.getIdRole().equals(role.id)).toList()}"></c:set>
                                <option value="${role.id}"
                                    ${userRole.size() > 0 ? 'selected' : '' }
                                    ${userRole.size() > 0 && userRole.get(0).getIsFromGroup() ? 'disabled' : '' }
                                >${role.description} ${userRole.size() > 0 && userRole.get(0).getIsFromGroup() ? '(grup)' : '' }
                                </option>
                            </c:forEach>
                        </select>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary mx-auto" onclick="updateUserRoles(${user.id})">
                                <spring:message code="btn.update" text="Actualizează"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="div-btns">
        <button type="button" class="btn btn-primary" onclick="creatOrUpdateUser();"><spring:message code="btn.save" text="Salvează"/></button>
    </div>
    <div class="modal fade" id="modalEventContact" tabindex="-1" role="dialog"
         aria-labelledby="modalEventContactTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="mt-3 text-center">
                    <h5 class="modal-title" id="modalEventContactTitle">Adăugare contact</h5>
                </div>
                <div class="modal-body">
                    <table class="table table-xs" id="modalEventContactTable">
                        <thead>
                        <tr>
                            <th scope="col"><span><spring:message code="table.description" text="Descriere"/></span></th>
                            <th scope="col"><span>Email</span></th>
                            <th scope="col"><span><spring:message code="table.address" text="Adresă"/></span></th>
                            <th scope="col"><span><spring:message code="table.phone" text="Telefon"/></span></th>
                            <th scope="col"><span><spring:message code="table.actions" text="Acțiuni"/></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
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
                    <h5 class="modal-title"><spring:message code="account.change-pass" text="Modifică parolă"/>
                        <br>
                        <span id="modal_subtitle" class="modal-title small" style="color: #188a15"></span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

                    </button>
                </div>
                <div class="modal-body">

                    <div class="col-lg-12 ">
                        <div class="input-box">
                            <label class="input-label" for="pass0"><spring:message code="input.pass.old" text="Parolă veche"/></label>
                            <input type="password" class="form-control clear-data no-upper new-input" id="pass0"
                                   name="pass0"/>
                            <span toggle="#pass0" class="fa fa-eye field-icon toggle-password"></span>
                        </div>
                    </div>
                    <div>
                        <div class="col-lg-12">
                            <div class="input-box">
                                <label class="input-label" for="pass1"><spring:message code="input.pass.new" text="Parolă nouă"/></label>
                                <input type="password" class="form-control clear-data no-upper new-input" id="pass1"
                                       name="pass1" onkeyup="passVal()"/>
                                <span toggle="#pass1" class="fa fa-eye field-icon toggle-password"></span>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="input-box">
                                <label class="input-label" for="pass2"><spring:message code="input.pass.confirm" text="Confirmare parolă"/></label>
                                <input type="password"
                                       class="form-control clear-data no-upper new-input focus-bottom-border"
                                       id="pass2"
                                       name="pass2"/>
                                <span toggle="#pass2" class="fa fa-eye field-icon toggle-password"></span>
                            </div>
                        </div>
                        <div id="validation-box" class="mt-2" style="background: unset">
                            <h5 class="modal-title1">
                                <span class="title"> <spring:message code="condition.pass.h" text="Parola trebuie să conțină"/>: </span>
                            </h5>
                            <div id="letter" class="invalid"><i class="fas fa-times"></i> <spring:message code="condition.pass.sm-letters" text="Litere mici"/></div>
                            <div id="capital" class="invalid"><i class="fas fa-times"></i> <spring:message code="condition.pass.xl-letters" text="Litere mari"/></div>
                            <div id="numbersOrSpecial" class="invalid"><i class="fas fa-times"></i> <spring:message code="condition.pass.numbers-special" text="Cifre sau caractere speciale"/>
                            </div>
                            <div id="length" class="invalid"><i class="fas fa-times"></i> <spring:message code="condition.pass.length" text="Cel puțin 6 caractere"/>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="only_table_modal">
                    <button type="button" class="btn btn-secondary discard-button" data-bs-dismiss="modal">
                        <spring:message code="btn.cancel" text="Renunță"/>
                    </button>
                    <button id="btnChangePass" type="button" onclick="changePassword('${user.id}', '${user.email}')"
                            class="btn btn-primary btn-autentif" disabled>
                        <spring:message code="btn.save" text="Salvează"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</c:if>
</body>
</html>