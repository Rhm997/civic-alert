<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewFoldersPage">
    <div class="container-header">
        <h4 class="page-title">
            Vizualizare grupuri
        </h4>
        <span class="ms-auto">
        <input type="button" class="btn btn-primary" id="liveToastBtn" value="Adaugă" onclick="viewGroup(true)"/>
    </span>
    </div>
    <div class="page-content">
        <div class="content-tabs mt-3">
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
            <table class="table table-xs" id="table_groups" style="width: 100%;">
                <thead>
                <tr align="left">
                    <th scope="col"><span>Denumire</span></th>
                    <th scope="col"><span>Tip</span></th>
                    <th scope="col"><span>Acțiuni</span></th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="group" items="${groups}">
                    <tr onclick="viewGroup(false, ${group.id})" style="cursor:pointer;">
                        <td>${group.name}</td>
                        <td>${group.groupType.name}</td>
                        <td style="white-space: nowrap;" class="dropdown"
                            onclick="event.stopPropagation();event.preventDefault();event.preventDefault();">
                            <a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#">
                                <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right" style="text-align: right;">
                                <li onclick="viewGroup(false, ${group.id})">
                                    <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"
                                       title="Vizualizare ">
                                        Vizualizare
                                    </a>
                                </li>
                                    <%--                            <li onclick="stergereContract(${user.id})">--%>
                                    <%--                                <a href="javascript:void(0);" data-bs-toggle="<!-- tooltip -->"--%>
                                    <%--                                   title="Ștergere contract">--%>
                                    <%--                                    Ștergere--%>
                                    <%--                                </a>--%>
                                    <%--                            </li>--%>
                            </ul>
                        </td>

                    </tr>
                </c:forEach>
                </tbody>
            </table>

        </div>


        <!-- div for ajax filter -->
        <div id="totalContracte_2" class="panel-body">

        </div>
        <div class="modal fade" id="modal_add_user" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Adăugare grup
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
                                <div class="col-lg-12 ">
                                    <div class="input-box">
                                        <label class="input-label" for="username">Denumire</label>
                                        <input type="text"
                                               class="form-control clear-data no-upper new-input new-user-data"
                                               id="username" name="username" data-key="username"/>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-box active-grey">
                                        <label class="input-label">Tip</label>
                                        <select class="form-control new-input focus-bottom-border"
                                                data-name="Selectați UAT-ul" data-key="groupType">
                                            <option value="">Toate</option>
                                            <c:forEach items="${groupTypes }" var="groupType">
                                                <option value="${groupType.id }">${groupType.name }</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="hidden" id="only_table_modal">
                            <button type="button" class="btn btn-secondary discard-button" data-bs-dismiss="modal">
                                Renunță
                            </button>
                            <button id="btnChangePass" type="button" onclick="creatOrUpdateUser()"
                                    class="btn btn-primary">
                                Salvează
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