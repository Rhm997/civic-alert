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
    <div id="viewQuestion" class="page-content">
        <div class="parent-survey">
            <div class="survey-title">
                DriDanube – Riscul Secetei în Regiunea Dunării
            </div>
            <div class="survey-description m-3 w-75 text-center">
                Principalul obiectiv al proiectului DriDanube este creșterea capacității de a gestiona riscurile legate de secetă în regiunea Dunării. Contribuția dvs. la proiect se referă la informații despre impactul secetei în timp real din localitatea dvs. Vă mulțumim pentru cooperare!
            </div>
            <div class="p-3 m-4 w-75 view-question-card">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="mb-3 mt-3">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="question-title">1. Estimați impactul secetei asupra cerealierelor de iarnă pentru producția din 2023</div>
                                    <span class="question-description">* În comparație cu media ultimilor trei ani; înainte de recoltare, este estimarea bazată pe starea vegetației (de exemplu, uniformitatea și vigurozitatea lăstarilor). După recoltare, răspunsurile reflectă scăderea observată a producției din cauza fenomenului de secetă.</span>
                                </div>
                            </div>
                            <div class="row mt-2 div-answers">
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="checkbox" class="form-check-input"  name="check-answer"
                                               value="false"> Niciun efect al secetei; vegetația este optimă
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="checkbox" class="form-check-input"  name="check-answer"
                                               value="false"> Niciun efect al secetei, însă vegetația este afectată din alte motive
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="checkbox" class="form-check-input"  name="check-answer"
                                               value="false"> Seceta a afectat dezvoltarea vegetației, însă nu sunt așteptate pierderi considerabile, producția va scădea cu 10% * *
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="checkbox" class="form-check-input"  name="check-answer"
                                               value="false"> Afectare medie, se estimează o scădere considerabilă a producției de aproximativ 10-30% * *
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="p-3 m-4 w-75 view-question-card">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="mb-3 mt-3">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="question-title">2. Evaluare prin imprimarea degetului: care este starea umidității în stratul de sol 0-20 cm (de la suprafață)?</div>
                                    <span class="question-description"></span>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center mt-2 div-answers">
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input" name="radio-answer"
                                               value="false"> Solul este uscat și prăfos la atingere, fără posibilitatea de modelare
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input"  name="radio-answer"
                                               value="false"> Solul este mai uscat la atingere, are o structură slabă; fără impact asupra umidității
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input"  name="radio-answer"
                                               value="false"> Solul are o umiditate moderată, se poate modela dar având o consistență scăzută, lasă o impresie de umezeală la atingere
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input"  name="radio-answer"
                                               value="false"> Solul este umed, cu o bună capacitate de a fi prelucrat
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="p-3 m-4 w-75 view-question-card">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="mb-3 mt-3">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="question-title">3. Cum evaluați ultimele 3 luni în funcție de echilibrul apei?</div>
                                    <span class="question-description"></span>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center mt-2 div-answers">
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input" name="radio-answer"
                                               value="false"> Extrem de uscat – deficit de precipitații/secetă puternică cu impact semnificativ
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input"  name="radio-answer"
                                               value="false"> Foarte uscat – deficit de precipitații cu impact negativ vizibil al secetei
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input"  name="radio-answer"
                                               value="false"> Stare normală
                                    </label>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <label class="input-label">
                                        <input type="radio" class="form-check-input"  name="radio-answer"
                                               value="false"> Foarte umed – cu impact negativ vizibil
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="p-3 m-4 w-75 view-question-card">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="mb-3 mt-3">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="question-title">4. Specificați înălțimea plantelor (în cm)</div>
                                    <span class="question-description"></span>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center mt-2 div-answers">
                                <div class="col-lg-12 col-md-12">
                                    <div class="input-box active-grey">
                                        <input type="number"
                                               data-key=""
                                               data-header=""
                                               class="campObl form-control new-input"
                                               data-name=""
                                               value="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="p-3 m-4 w-75 view-question-card">
                <form class="formTabs" data-changed="false">
                    <div class="col-12 fp-card card-form">
                        <div class="mb-3 mt-3">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="question-title">5. Data de semănat a culturii</div>
                                    <span class="question-description"></span>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center mt-2 div-answers">
                                <div class="col-lg-12 col-md-12">
                                    <div class="input-box active-grey">
                                        <input id="dataOraInput" type="text" value=""
                                               class="form-control new-input daterange campObl" data-name="Dată și oră" data-header="startCampaign"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="w-75">
                <textarea class="campObl form-control new-input"></textarea>
                 <%--  aici jos vine textul din obs finale--%>
                <div class="final-obs">
                    Vă rugăm să descrieți semnele fenomenului de secetă pe care le observați, cantitatea de precipitații pe care ați înregistrat-o în ultima duminică (la ora 7:00 dimineața) sau specificați mai detaliat notițele dumneavoastră referitorare la impactul secetei.
                </div>
            </div>
            <div class="m-3">
                <div type="button" class="btn btn-primary" onclick="">
                    Trimite
                    răspunsurile
                </div>
            </div>
        </div>
    </div>
</div>

</body>

</html>