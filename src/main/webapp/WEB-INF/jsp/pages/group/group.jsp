<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<style>
    #container {
        display: flex;
        height: calc(100% - 75px);
    }
</style>
<div class="dateleMelePage">
    <div class="container-header">
        <h4 class="page-title">
            Grup
        </h4>
    </div>
    <div class="page-content row">
        <div class="col-12" style="min-width: 500px">
            <form method="GET" action="#" id="formContUpload" enctype="multipart/form-data"
                  onsubmit="return false;">
                <input type="hidden" class="new-group-data" id="id" data-key="id" value="${group.id}">
                <div class="row form-container">
                    <!-- edit form column -->
                    <div class="col-md-9 personal-info">
                        <div>
                            <div class="form-group row content-tabs mt-3">
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="control-label input-label">*Denumire</label>
                                        <input class="form-control neEdit campObl new-input new-group-data" type="text"
                                               id="group" data-key="name" value="${group.name}">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-box active-grey">
                                        <label class="control-label input-label">*Tip</label>
                                        <select id="group_type"
                                                class="campObl neEdit form-control new-input new-group-data form-select"
                                                data-key="idGroupType">
                                            <option value="">Selectați tipul</option>
                                            <c:forEach items="${groupTypes }" var="groupType">
                                                <option value="${groupType.id }" ${groupType.id == group.groupType.id ? 'selected' : '' }>${groupType.name } </option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="control-label input-label">Observații</label>
                                        <input class="form-control new-input focus-bottom-border  new-group-data"
                                               type="text" id="obs"
                                               data-key="obs"
                                               value="${group.obs}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row content-tabs mt-3">
                                <div class="col-12">
                                    <select id="group_uats" class="dual-list" multiple>
                                        <c:forEach var="uat" items="${uats}">
                                            <c:set var="userGroup"
                                                   value="${groupUats.stream().filter(u -> u.getId().equals(uat.id)).toList()}"></c:set>
                                            <option value="${uat.id}"
                                                ${userGroup.size() > 0 ? 'selected' : '' }
                                            >${uat.name}
                                            </option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="form-group" id="saveDate" style="margin-bottom: 0">
                                    <div class="col-md-12" style="text-align: center">
                                        <input type="submit" class="btn btn-primary lang-change" value="Salvează"
                                               onclick="creatOrUpdateGroup(${user.id});">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </form>
        </div>
    </div>

</div>
</body>
</html>