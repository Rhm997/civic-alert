<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>

<div class="modal fade" id="modal_add_fraction" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adăugare fracții
                    <br>
                    <span id="modal_subtitle" class="modal-title small" style="color: #188a15"></span>
                </h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="addFraction" action="#" onsubmit="return false;">
                <div class="modal-body" id="modalCapacity">
                    <div class="row" id="prod-fields">
                        <div class="col-12">
                            <div class="input-box">
                                <label class="input-label" for="fraction">*Fracție</label>
                                <input id="fraction" type="text" name="fraction" value="${fraction.description}" data-name="Fractie"
                                       class="form-control clear-data campObl new-input focus-bottom-border new-user-data" data-key="fraction"
                                       style="text-transform: none"/>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-box">
                                <label class="input-label" for="capacityWasteTypesSelect">*Selectați tipul:</label>
                                <select id="capacityWasteTypesSelect"
                                        class="form-control clear-data campObl new-input focus-bottom-border new-user-data form-select"
                                        data-name="Selectați tipul" data-live-search="true" onchange="" data-key="waste_types_id">
                                    <c:forEach items="${wasteTypes }" var="waste">
                                        <option value="${waste}" ${waste == wasteType ? 'selected' : ''}>${waste}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="active-grey input-box">
                                <label class="input-label">Preselectare</label>
                                <div class="form-control neEdit new-input">
                                    <div class="align-items-center d-flex form-check justify-content-around p-0 h-100">
                                        <div>
                                            <input type="radio" class="form-check-input fraction-check" id="is_active_1" data-key="active"
                                                   name="isActive" value="1">
                                            <label class="form-check-label" for="is_active_1">Da</label>
                                        </div>
                                        <div class="focus">
                                            <input type="radio" class="form-check-input fraction-check" id="is_active_2" name="isActive" value="0"
                                                   checked="checked">
                                            <label class="form-check-label" for="is_active_2">Nu</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="only_table_modal">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Renunță</button>
                    <button type="button" class="btn btn-primary" onclick="saveOrUpdateFractions(${id}, ${type})">Salvează</button>
                </div>
            </form>
        </div>
    </div>
</div>