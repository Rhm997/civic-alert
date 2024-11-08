<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewFoldersPage">
    <div class="container-header">
        <div class="d-flex align-items-center container-title">
            <h4 class="page-title">
                <spring:message code="list.people" text="Listă persoane"/>
            </h4>
        </div>
        <span>
        <input type="button" class="btn btn-primary" value="<spring:message code="btn.add" text="Adaugă"/>" onclick="viewUser(true, -1, false)">
    </span>
    </div>
    <div class="page-content">
        <table class="table table-xs" id="table_users" style="width: 100%;">
            <thead>
            <tr align="left">
                <th scope="col"><span><spring:message code="table.user" text="Utilizator"/></span></th>
                <th scope="col"><span>Email</span></th>
                <th scope="col"><span><spring:message code="table.name" text="Nume"/></span></th>
                <th scope="col"><span><spring:message code="table.actions" text="Acțiuni"/></span></th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="user" items="${users}">
                <tr onclick="viewUser(false, ${user.id}, false)" style="cursor:pointer;">
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.firstName}</td>
                    <td style="white-space: nowrap;" class="dropdown"
                        onclick="event.stopPropagation();event.preventDefault();event.preventDefault();">
                        <a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#">
                            <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" style="text-align: right;">
                            <li onclick="viewUser(false, ${user.id}, false)">
                                <a href="javascript:void(0);" data-bs-toggle=""
                                   title="Editează">
                                    <spring:message code="table.edit" text="Editează"/>
                                </a>
                            </li>
                        </ul>
                    </td>

                </tr>
            </c:forEach>
            </tbody>
        </table>


        <!-- div for ajax filter -->

        <div class="modal fade" id="modal_add_user" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Adăugare utilizator
                            <br>
                            <span id="modal_subtitle" class="modal-title small" style="color: #188a15"></span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

                        </button>
                    </div>
                    <form action="#" onsubmit="return false;" id="add_user">
                        <div class="modal-body">
                            <div class="form-group row">
                                <input type="hidden" class="form-control clear-data no-upper new-input new-user-data"
                                       id="id_type" name="idtype" data-key="idtype"/>
                                <div class="col-lg-12">
                                    <div class="active-grey input-box">
                                        <label class="input-label">Activ</label>
                                        <div class="form-control neEdit new-input">
                                            <div class="align-items-center d-flex form-check justify-content-around p-0 h-100">
                                                <div>
                                                    <input type="radio" class="form-check-input new-user-data"
                                                           id="is_active_1" data-key="active" name="isActive"
                                                           value="true" checked="checked">
                                                    <label class="form-check-label" for="is_active_1">Da</label>
                                                </div>
                                                <div>
                                                    <input type="radio" class="form-check-input" id="is_active_2"
                                                           name="isActive" value="false">
                                                    <label class="form-check-label" for="is_active_2">Nu</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 ">
                                    <div class="input-box">
                                        <label class="input-label" for="username">Utilizator</label>
                                        <input type="text"
                                               class="form-control clear-data no-upper new-input new-user-data"
                                               id="username" name="username" data-key="username"/>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="input-label" for="email">Email</label>
                                        <input type="email"
                                               class="form-control clear-data no-upper new-input focus-bottom-border new-user-data"
                                               id="email" name="email" data-key="email"/>
                                    </div>
                                </div>
                                <div class="col-lg-12 ">
                                    <div class="input-box">
                                        <label class="input-label" for="username">Nume și prenume</label>
                                        <input type="text"
                                               class="form-control clear-data no-upper new-input new-user-data"
                                               id="firstName" name="firstName" data-key="firstName"/>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="input-label" for="pass1">Parola Nouă</label>
                                        <input type="password"
                                               class="form-control clear-data no-upper new-input new-user-data"
                                               id="pass1" name="pass1" onkeyup="passVal()" data-key="password"/>
                                        <span toggle="#pass1" class="fa fa-eye field-icon toggle-password"></span>
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
                            <button id="btnChangePass" type="button" onclick="creatOrUpdateUser()"
                                    class="btn btn-primary">
                                <spring:message code="btn.save" text="Salvează"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>