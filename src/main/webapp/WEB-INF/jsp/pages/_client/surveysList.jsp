<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%-- <%@include file="includes/path.jsp"%> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<body>
<div class="viewPersonsPage">
    <div class="container-header">
        <div class="d-flex align-items-center container-title">
            <h4 class="page-title">
                Listă chestionare
            </h4>
        </div>
    </div>
    <div class="page-content">
        <table class="table table-xs" id="table_my_surveys" style="width: 100%;">
            <thead>
            <tr align="left">
                <th scope="col"><span>Denumire</span></th>
                <th scope="col"><span>Valabilitate</span></th>
<%--                <th scope="col"><span>Activ</span></th>--%>
                <th scope="col"><span>Acțiune</span></th>
            </tr>
            </thead>
            <tbody>
            <!-- [SurveyFormDTO(id=6, titleRo=note ro, titleEn=chestionar 1 en, notesRo=null, notesEn=notes en, descriptionRo=test x, descriptionEn=test x- en, startCampaign=2026-11-04, endCampaign=2027-11-04, surveyFrequencyInDays=null, idSurveyType=1, isActive=null, isPermanent=null, questions=null), SurveyFormDTO(id=7, titleRo=note ro, titleEn=chestionar 1 en, notesRo=null, notesEn=notes en, descriptionRo=test xy, descriptionEn=test xy- en, startCampaign=2026-11-04, endCampaign=2027-11-04, surveyFrequencyInDays=null, idSurveyType=1, isActive=null, isPermanent=null, questions=null), SurveyFormDTO(id=4, titleRo=note 2, titleEn=title 2, notesRo=null, notesEn=notes 2, descriptionRo=test nou raz- ro, descriptionEn=test nou raz- en, startCampaign=2025-11-04, endCampaign=2026-11-04, surveyFrequencyInDays=null, idSurveyType=1, isActive=null, isPermanent=null, questions=null), SurveyFormDTO(id=2, titleRo=notes ro, titleEn=t1 en, notesRo=null, notesEn=notes en, descriptionRo=fake_data, descriptionEn=fake_data, startCampaign=2031-11-04, endCampaign=2023-06-19, surveyFrequencyInDays=null, idSurveyType=1, isActive=null, isPermanent=null, questions=null), SurveyFormDTO(id=3, titleRo=note , titleEn=titlu en, notesRo=null, notesEn=note en, descriptionRo=test raz- ro, descriptionEn=test raz- en, startCampaign=2024-11-04, endCampaign=2025-11-04, surveyFrequencyInDays=null, idSurveyType=1, isActive=null, isPermanent=null, questions=null), SurveyFormDTO(id=5, titleRo=nn2, titleEn=tt 2 en, notesRo=null, notesEn=nnn2 en, descriptionRo=test nou raz- ro, descriptionEn=test nou raz- en, startCampaign=2025-11-04, endCampaign=2026-11-04, surveyFrequencyInDays=null, idSurveyType=1, isActive=null, isPermanent=null, questions=null)] -->
            <c:forEach items="${surveys}" var="s">
                <tr onclick="viewSurvey(${s.id})" style="cursor:pointer;">
                    <td>${s.titleRo}</td>
                    <td>${s.startCampaign} - ${s.endCampaign}</td>
 <%--                   <td>${s.isActive}</td>--%>
                    <td style="white-space: nowrap;" class="dropdown"
                        onclick="event.stopPropagation();event.preventDefault();event.preventDefault();">
                        <a class="fs-6 dropdown-toggle-split" data-bs-toggle="dropdown" href="#">
                            <i class="fa fa-ellipsis-v" aria-hidden="true" style="line-height: 25px;"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" style="text-align: right;"><li onclick="">
                                <a href="javascript:void(0);" data-bs-toggle=""
                                   title="Editează datele" onclick="editSurveyClient(${s.id}, 1)">Editează datele </a>
                            </li>
                        </ul>
                    </td>
                </tr>

            </c:forEach>

            </tbody>
        </table>


    </div>
</div>
</body>

</html>