<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%--<%@include file="../includes/path.jsp" %>--%>

<html>
<body>
<div class="viewFoldersPage">
    <div class="container-header">
        <h4 class="page-title">
            Vizualizare locații
        </h4>
        <button id="addLocationModal" class="btn-primary">
            Adaugă
        </button>
    </div>
    <div id="totalColectari" class="content-tabs mt-3">
        <div class="page-content">
            <%@include file="../user/locations_table.jsp" %>
        </div>
    </div>
    <div class="modal fade" id="modal_add_location" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Adaugă locație</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="#" onsubmit="return false;" id="add_user">
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-lg-12 ">
                                <div class="input-box">
                                    <label class="input-label">CNP</label>
                                    <input type="text"
                                           class="form-control clear-data no-upper new-input" id="cnpLocation"
                                           data-key="cnp"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" id="only_table_modal">
                        <button type="button" class="btn btn-secondary discard-button" data-bs-dismiss="modal">
                            Renunță
                        </button>
                        <button id="btnChangePass" type="button" onclick="addLocation()"
                                class="btn btn-primary">
                            Salvează
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="modalAsocPerson"></div>
</body>
</html>
