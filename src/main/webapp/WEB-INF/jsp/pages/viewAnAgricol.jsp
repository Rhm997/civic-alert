<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewFoldersPage">
    <div class="container-header d-flex">
        <h4 class="page-title flex-grow-1">
            Configurare an agricol curent
        </h4>
    </div>

    <div class="page-content">
        <div class="col-12 titlu-categorie subtitlu mb-5"> Atenție! <br>
            *La adaugarea unui nou an agricol se vor genera sesiuni noi pentru toate chestionarele active existente in
            sistem. <br>
            *Din momentul in care se configureaza noul an agricol toate raspunsurile la chestionare vor fi asociate
            acestui nou an agricol
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-12">
                <div class="input-box active-grey">
                    <label class="input-label"> Dată start </label>
                    <input id="startDateAnAgricol" type="date"
                           class="campObl form-control new-input"
                           data-value="${an.get(0).startDate}"
                    >
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
                <div class="input-box active-grey">
                    <label class="input-label"> Dată stop </label>
                    <input id="endDateAnAgricol" type="date"
                           class="campObl form-control new-input"
                           data-value="${an.get(0).endDate}"
                    >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-12">
                <div class="input-box active-grey">
                    <label class="input-label"> Denumire an agricol </label>
                    <input id="agricYear" type="text"
                           class="campObl form-control new-input"
                           value="${an.get(0).agricYear}"
                    >
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
                <div class="input-box active-grey">
                    <label class="input-label"> Observații </label>
                    <textarea id="agricObs" type="text"
                              class="campObl form-control new-input"
                              value="${an.get(0).obs}"
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <div type="button" class="btn btn-primary" onclick="saveEditAnAgricol()">
                Schimbă an agricol
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
        if (${an.size() < 1}) {
            $("#startDateAnAgricol").datepicker("setDate", new Date("01.09." + moment().year()));
            $("#endDateAnAgricol").datepicker("setDate", new Date("08.15." + moment().add(1, 'years').year()));
            $("#agricYear").val(moment().year() + "-" + moment().add(1, 'years').year());
        }
    })
</script>
</body>

</html>