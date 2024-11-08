<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="java.net.URLDecoder" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="com.fac.civicalert.commons.repository.filter.QueryOperator" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<%@include file="includes/path.jsp" %>

<%
    Cookie[] cookies = null;

    // Get an array of Cookies associated with the this domain
    cookies = request.getCookies();

    int hasToken = 0;
    String emailUser = "";
    List<String> roles = new ArrayList<>();
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("wstToken")) {
                hasToken++;
            }
            if (cookie.getName().equals("wstRoles")) {
                roles = new Gson().fromJson(URLDecoder.decode(cookie.getValue()), List.class);
            }
        }
    }
    if (hasToken == 0) {
        //request.getRequestDispatcher("/").forward(request, response);
        response.sendRedirect(pathRedirect);
    }
%>
<c:set var="roles" value="<%=roles%>"></c:set>
<c:set var="appName" value="<%=appName%>"></c:set>

<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <%-- <link rel="SHORTCUT ICON" href="resources/<%=appFolder%>/images/first_page/logo.png"> --%>

    <title>Chestionare</title>

    <jsp:include page="includes/includeCSS.jsp"></jsp:include>
   <%-- <jsp:include page="includes/includeCSSManagement.jsp"></jsp:include>--%>

    <script>
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [year, month, day].join('-');
      }

      var app = {};
      var req = {};

      app.contextPath = '<%=path%>';
      app.appFolder = '<%=appFolder %>';
      app.appName = '<%=appName %>';

      app.defLoc = <%=defLoc%>;
      app.defJud = <%=defJud%>;
      app.liveUser = {};//JSON.parse('${liveUser }');
      app.idUsr = app.liveUser.id;
      app.filters = {};
      app.filters.def = {};
      // ce ne mai trebuie in app si se refresuiesc la refresh de main

      var date = new Date();
      app.curr_date = formatDate(date);
      app.f_d_month = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
    </script>
</head>
<body>
<div class="wrapper">
    <!-- Sidebar  -->
    <nav id="sidebar">
        <div>
            <div class="sidebar-header">
                <div align="center">
                    <img src="resources/images/first_page/logo-agro.png" class="logo-agro">
                </div>
                <div align="center" class="mt-4">
                     <img src="resources/images/first_page/logo-anm.png" class="logo-anm">
                </div>
            </div>
            <ul class="list-unstyled components mt-4">
                <li>
                    <a href="javascript:void(0);" onclick="mainpage();" data-page="main" selectat="true"
                       class="selectat">
                        <i class="fas fa-home"></i><span class="lang-change"
                                                         data-lang-id="labelHome">Pagină principală</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="viewUser(false);" id="contul_meu_id" data-page="contul_meu">
                        <i class="fas fa-user"></i><span class="lang-change"
                                                         data-lang-id="labelContulMeu">Contul meu</span>
                    </a>
                </li>

                <li>
                    <a href="#listaAdministrarePers" data-bs-toggle="collapse" aria-expanded="false"
                       class="dropdown-toggle">
                        <i class="fa-solid fa-folder-open"></i><span class="lang-change"
                                                                     data-lang-id="labelContulMeu">Administrare</span>
                    </a>
                    <ul id="listaAdministrarePers" class="collapse list-unstyled">
                        <li>
                            <a href="javascript:void(0);" onclick="listPersons();" data-page="list_pers"
                               class="submeniu">Personal</a>
                        </li>

                        <li>
                            <a href="javascript:void(0)" onclick="viewAllUsers();" data-page="list_users"
                               class="submeniu">Utilizatori</a>
                        </li>
                        
                        <li>
                            <a href="javascript:void(0);" onclick="" data-page="list_zones"
                               class="submeniu">Zone</a>
                        </li>
                        
                    </ul>
                </li>

                <li>
                    <a href="#listaAdministrare" data-bs-toggle="collapse" aria-expanded="false"
                       class="dropdown-toggle">
                        <i class="fa-solid fa-folder-open"></i><span class="lang-change"
                                                                     data-lang-id="labelContulMeu">Chestionare</span>
                    </a>
                    <ul id="listaAdministrare" class="collapse list-unstyled">
                        <li>
                            <a href="javascript:void(0);" onclick="listSurveys();" data-page="list_surveys"
                               class="submeniu">Vizualizare Chestionare</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onclick="addEditSurvey();" data-page="new_survey"
                               class="submeniu">Chestionar Nou</a>
                        </li>

                    </ul>
                </li>
                <li>
                    <a href="#listaSetari" data-bs-toggle="collapse" aria-expanded="false"
                       class="dropdown-toggle">
                        <i class="fa-solid fa-gear"></i><span class="lang-change"
                                                         data-lang-id="labelSetari">Setări</span>
                    </a>
                    <ul id="listaSetari" class="collapse list-unstyled">
                        <li>
                            <a href="javascript:void(0);" onclick="viewAnAgricol();" data-page="an_agricol"
                               class="submeniu">An agricol</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="surveysDashboard();" id="dashboard_id" data-page="dashboard">
                        <i class="fa-solid fa-chart-column"></i><span class="lang-change"
                                                         data-lang-id="labelDashboard">Dashboard</span>
                    </a>
                </li>

                <!--  de comentat linkul pana -i gata... -->


                <c:if test="${loggedUser.grupuri['20'].exista == 1 }">
                    <li>
                        <a href="javascript:void(0);" onclick="generateAll();" data-page="generare_facturi">
                            <i class="fas fa-money-bill"></i><span class="lang-change"
                                                                   data-lang-id="">Generare facturi</span>
                        </a>
                    </li>
                </c:if>
                <!-- <li>
                 <a href="javascript:void(0);" onclick="openDash();" data-page="Dashboard_cadrane">
                    <i class="fas fa-money-bill"></i><span class="lang-change" data-lang-id="">Dashboard</span>
                 </a>
                </li> -->

                <!--  drepturi 3 si 4 - read + write pe modulul de umanagement -->

                <%-- <c:if test="${loggedUser.onlyRights['3']==4 && loggedUser.onlyRights['4']==4 }">
                    <li>
                        <a href="#pageUserManagement" data-bs-toggle="collapse" aria-expanded="false"
                           class="dropdown-toggle">
                            <i class="fas fa-image"></i><span class="lang-change"
                                                              data-lang-id="pageUserManagement">Utilizatori</span>
                        </a>
                        <ul class="collapse list-unstyled" id="pageUserManagement">
                            <li><a href="javascript:void(0);" class="submeniu" onclick="create_user_page();"
                                   data-page="add_user">Utilizatori</a></li>
                            <li><a href="javascript:void(0);" class="submeniu" onclick="list_all_groups();"
                                   data-page="add_groups">Grupuri</a></li>
                            <li><a href="javascript:void(0);" class="submeniu" onclick="openViewDevices();"
                                   data-page="view_devices">Dispozitive</a></li>

                        </ul>
                    </li>
                </c:if> --%>
            </ul>
        </div>

        <div class="fida-logo">
            <img src="resources/images/fida/logo_fida1.png"/>
        </div>
    </nav>

    <!-- Page Content  -->
    <div id="content">
        <nav class="navbar">
            <div class="container-fluid p-0">
                <div class="navbar-header">
                    <button type="button" id="sidebarCollapse" class="btn p-1">
                        <i class="fas fa-align-left"></i>
                        <!-- <span>Toggle Sidebar</span> -->
                    </button>

                </div>
                <div style="display: flex; flex-direction: row; gap: 10px;">
                    <%--                    <div class="uat-header">--%>
                    <%--                        <span>UAT: Baia Mare</span>--%>
                    <%--                    </div>--%>
                    <ul class="navbar-nav navbar-right" style="flex-direction: row;">
                        <li class="nav-item dropdown" style="box-shadow: unset !important;">
                            <a class="nav-link p-2" href="javascript:void(0);" id="navbarDropdownMenuLink-5"
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <%--                                <i class="fa-solid fa-circle-user"></i>--%>
                                <div class="logged-user-letters" title="Detalii Cont"></div>

                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-info dropdown-menu-end"
                                 aria-labelledby="navbarDropdownMenuLink-5" style="position: absolute;">
                                <a class="dropdown-item user-dropdown-item" href="javascript:void(0);"
                                   disabled="disabled">
                                    <span id="loggedUserId"></span>
                                    <div id="loggedUserRoles"></div>
                                </a>
                                <hr>
                                <div class="couple-btns-account">
                                    <a class="dropdown-item my-account-item btn-primary" href="javascript:void(0);"
                                       onclick="viewUser(false)">
                                        <button class="lang-change" data-lang-id="labelContulMeu"><i
                                                class="fa-solid fa-address-card"></i> Contul Meu
                                        </button>
                                    </a>
                                    <a class="dropdown-item logout-item btn-secondary" href="javascript:void(0);"
                                       onclick="logout()">
                                        <button class="lang-change" data-lang-id="labelDelogare"><i
                                                class="fa-solid fa-arrow-right-from-bracket"></i> Delogare
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- <img src="resources/images/icons/bootstrap-icons/alarm.svg" > -->
        <div id="container" class="container-user-content">
            <style>
                #container {
                    background-color: unset;
                    box-shadow: none !important;
                }
            </style>
            <jsp:useBean id="now" class="java.util.Date"/>
            <fmt:formatDate value="${now}" pattern="dd.MM.yyyy 00:00" var="formattedDateNowRo"/>
            <fmt:formatDate value="${now}" pattern="yyyy-MM-dd 00:00" var="formattedDateNow"/>
           <%-- <div id="addDashboards" onclick="checkNrOfDashboardsOnAdd()">
                <span class="add-dashboard-text"><b>+</b> Adaugă element nou</span>
                <span id="countDashboards">
                    <span id="counter"></span>
                    / 10 Cadrane
                </span>
            </div>--%>

            <div id="dashboardGrid" class="row grid">

            </div>

            <!-- Modal -->
            <div class="modal fade" id="modalFullScreen" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content modal-height">
                        <%--                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>--%>
                        <div class="modal-body modal-height">

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalAddElements" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Adaugă element nou</h5>
                            <%--                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="close"><span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span></button>--%>
                        </div>
                        <div class="modal-body pb-0">
                            <div class="elements-container">

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Renunță</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalConfigDash" tab-index="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Configurări</h5>
                        </div>
                        <div class="modal-body">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Renunță</button>
                            <button type="button" class="btn btn-primary btn-saveUpdate" data-bs-dismiss="modal"
                                    onclick="saveUpdateChart(this.getAttribute('data-id-asoc'), this.getAttribute('data-id-chart'))">
                                Salvează
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
         
        </div>
    </div>
</div>
</div>

</div>

<div id="c-maskUpload" class="c-maskUpload is-active"></div>
<div id="imgLoading">
    <div id="floatingCirclesG">
        <div class="f_circleG" id="frotateG_01"></div>
        <div class="f_circleG" id="frotateG_02"></div>
        <div class="f_circleG" id="frotateG_03"></div>
        <div class="f_circleG" id="frotateG_04"></div>
        <div class="f_circleG" id="frotateG_05"></div>
        <div class="f_circleG" id="frotateG_06"></div>
        <div class="f_circleG" id="frotateG_07"></div>
        <div class="f_circleG" id="frotateG_08"></div>
    </div>

</div>
</div>

<div id="div_map">
    <div class="modal fade" id="modal_map" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="title_cautare" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen p-sm-4">
            <div class="modal-content modal-fida  h-100">
                <div class="align-items-center d-flex justify-content-center position-absolute"
                     style="right: 0;top: 0;width: 32px;height: 32px;background: var(--f-primary); z-index:10000">
                    <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onclick=""></button>
                </div>
                <div class="for-map h-100 w-100"></div>
            </div>
        </div>
    </div>
</div>
</div>

<jsp:include page="includes/includeJS.jsp"></jsp:include>
<script>
  $(document).ready(function () {
    //openDash();
    stopLoading();
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
    $("#sidebar ul.components li a").on("click", function () {
      var this1 = $(this);
      if ($(this).hasClass('dropdown-toggle')) {
        $("#sidebar ul.components .dropdown-toggle[aria-expanded='true']").each(function () {
          if ($(this) != this1) {
            //$($(this).attr('href')).removeClass('show');
            $($(this).attr('href')).collapse('hide');
            // $(this).attr('aria-expanded', false);
          }
        });
      }
      setMenuPage($(this).data("page"));
      if ($(window).width() <= 980 && !$(this).hasClass('dropdown-toggle')) {
        $('#sidebar').removeClass('active');
      }
    });
    $('#container').click(function (e) {
      if ($(window).width() <= 980) {
        $('#sidebar').removeClass('active');
      }
    });

    $('body').on('click', function (e) {
      //did not click a popover toggle or popover
      if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('[data-bs-toggle="popover"]').length === 0
          && $(e.target).parents('.popover.in').length === 0) {
        $('[data-bs-toggle="popover"]').popover('hide');
      }
    });
    makeDataPiker();
    makeDataRangePicker();
    //openDash();
  });
</script>

</body>
</html>