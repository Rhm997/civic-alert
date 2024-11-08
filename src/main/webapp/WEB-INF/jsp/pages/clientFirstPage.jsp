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
    <jsp:include page="includes/includeCSSClient.jsp"></jsp:include>

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
<div >
    <!-- Sidebar  -->
<%--    <nav id="sidebar">--%>
<%--        <div>--%>
<%--            <div class="sidebar-header">--%>
<%--                <div align="center" style="padding-right: 8px;">--%>
<%--                     <img src="resources/images/first_page/logo-anm.png">--%>
<%--                </div>--%>
<%--            </div>--%>
<%--            <ul class="list-unstyled components">--%>
<%--                <li>--%>
<%--                    <a href="javascript:void(0);" onclick="mainpage();" data-page="main" selectat="true"--%>
<%--                       class="selectat">--%>
<%--                        <i class="fas fa-home"></i><span class="lang-change"--%>
<%--                                                         data-lang-id="labelHome">Pagină principală</span>--%>
<%--                    </a>--%>
<%--                </li>--%>
<%--                <li>--%>
<%--                    <a href="javascript:void(0);" onclick="viewUser(false);" id="contul_meu_id" data-page="contul_meu">--%>
<%--                        <i class="fas fa-user"></i><span class="lang-change"--%>
<%--                                                         data-lang-id="labelContulMeu">Contul meu</span>--%>
<%--                    </a>--%>
<%--                </li>--%>
<%--                <li>--%>
<%--                    <a href="#listaChestionare" data-bs-toggle="collapse" aria-expanded="false"--%>
<%--                       class="dropdown-toggle">--%>
<%--                        <i class="fa-solid fa-folder-open"></i><span class="lang-change"--%>
<%--                                                                     data-lang-id="labelContulMeu">Chestionare</span>--%>
<%--                    </a>--%>
<%--                    <ul id="listaChestionare" class="collapse list-unstyled">--%>

<%--                        <li>--%>
<%--                            <a href="javascript:void(0)" onclick="viewForAnswer();" data-page="view_survey"--%>
<%--                               class="submeniu">Chestionar Public</a>--%>
<%--                        </li>--%>

<%--                        <li>--%>
<%--                            <a href="javascript:void(0)" onclick="listUserSurveys();" data-page="view_survey_ext"--%>
<%--                               class="submeniu">Chestionarele Mele</a>--%>
<%--                        </li>--%>

<%--                        <li>--%>
<%--                            <a href="javascript:void(0)" onclick="viewUserExt();" data-page="view_user_ext"--%>
<%--                               class="submeniu">Contul meu</a>--%>
<%--                        </li>--%>
<%--                    </ul>--%>
<%--                </li>--%>

<%--                <!--  de comentat linkul pana -i gata... -->--%>


<%--                <c:if test="${loggedUser.grupuri['20'].exista == 1 }">--%>
<%--                    <li>--%>
<%--                        <a href="javascript:void(0);" onclick="generateAll();" data-page="generare_facturi">--%>
<%--                            <i class="fas fa-money-bill"></i><span class="lang-change"--%>
<%--                                                                   data-lang-id="">Generare facturi</span>--%>
<%--                        </a>--%>
<%--                    </li>--%>
<%--                </c:if>--%>
<%--                <!-- <li>--%>
<%--                 <a href="javascript:void(0);" onclick="openDash();" data-page="Dashboard_cadrane">--%>
<%--                    <i class="fas fa-money-bill"></i><span class="lang-change" data-lang-id="">Dashboard</span>--%>
<%--                 </a>--%>
<%--                </li> -->--%>

<%--                <!--  drepturi 3 si 4 - read + write pe modulul de umanagement -->--%>

<%--                &lt;%&ndash; <c:if test="${loggedUser.onlyRights['3']==4 && loggedUser.onlyRights['4']==4 }">--%>
<%--                    <li>--%>
<%--                        <a href="#pageUserManagement" data-bs-toggle="collapse" aria-expanded="false"--%>
<%--                           class="dropdown-toggle">--%>
<%--                            <i class="fas fa-image"></i><span class="lang-change"--%>
<%--                                                              data-lang-id="pageUserManagement">Utilizatori</span>--%>
<%--                        </a>--%>
<%--                        <ul class="collapse list-unstyled" id="pageUserManagement">--%>
<%--                            <li><a href="javascript:void(0);" class="submeniu" onclick="create_user_page();"--%>
<%--                                   data-page="add_user">Utilizatori</a></li>--%>
<%--                            <li><a href="javascript:void(0);" class="submeniu" onclick="list_all_groups();"--%>
<%--                                   data-page="add_groups">Grupuri</a></li>--%>
<%--                            <li><a href="javascript:void(0);" class="submeniu" onclick="openViewDevices();"--%>
<%--                                   data-page="view_devices">Dispozitive</a></li>--%>

<%--                        </ul>--%>
<%--                    </li>--%>
<%--                </c:if> &ndash;%&gt;--%>
<%--            </ul>--%>
<%--        </div>--%>

<%--        <div class="fida-logo">--%>
<%--            <img src="resources/images/fida/logo_fida1.png"/>--%>
<%--        </div>--%>
<%--    </nav>--%>

    <!-- Page Content  -->
    <div id="content" class="w-100">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <div class="d-flex">
                    <div class="logo1">
                        <img src="resources/images/first_page/logo-agro.png">
                    </div>
                    <div class="logo2">
                        <img src="resources/images/first_page/logo-anm.png">
                    </div>
                </div>
                <div class="butoane-meniu">
                    <div class="collapse navbar-collapse mobile-buttons" id="navbarSupportedContent">
                        <!-- de scapat de 20- hardcodat si aici sa fie id_user!!! -->
                        <div class="active align-items-center mobile-btn buton-meniu d-flex gap-2 pe-lg-3 ps-lg-3 p-md-3 active-btn" id="" data-toggle="#content_cereri" data-trigger="#menu_top" onclick="mainpage();" title="">
                            <i class="fa-solid fa-house"></i> <span>Pagina Principală</span>
                        </div>
                        <div class="active align-items-center mobile-btn buton-meniu d-flex gap-2 pe-lg-3 ps-lg-3 p-md-3" id="toggleDivCereri" data-toggle="#content_cereri" data-trigger="#menu_top" onclick="listClientSurveys();" title="">
                            <i class="fa-solid fa-list"></i> <span>Istoric chestionare</span>
                        </div>
                        <div id="btnContact" class="active align-items-center mobile-btn buton-meniu d-flex gap-2 pe-lg-3 ps-lg-3 p-md-3" data-toggle="#divStraturi" data-trigger="#menu_top"  title="">
                            <i class="fa-solid fa-headphones"></i><span>Contact</span>
                        </div>

                        <div id="btnProtectieDate" class="active align-items-center mobile-btn buton-meniu d-flex gap-2 pe-lg-3 ps-lg-3 p-md-3" data-toggle="#divStraturi" data-trigger="#menu_top"  title="">
                            <i class="fas fa-info"></i> <span>Protecția datelor personale</span>
                        </div>
                        <div id="btnCookie" class="active align-items-center buton-meniu mobile-btn d-flex gap-2 pe-lg-3 ps-lg-3 p-md-3" data-toggle="#divHelp" data-trigger="#menu_top"  title="">
                            <i class="fas fa-info"></i> <span>Politica de cookie</span>
                        </div>
                    </div>

                </div>


                    <div class="row select-language">
                        <div class="col-lg-6 col-md-12">
                            <img src="resources/images/lang/icon-ro.png" alt="lb romana">
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <img src="resources/images/lang/icon-en.png" alt="lb engleza">
                        </div>
                    </div>
                <div style="display: flex; flex-direction: row; gap: 10px;">
                    <ul class="navbar-nav navbar-right" style="flex-direction: row;">
                        <li class="nav-item dropdown" style="box-shadow: unset !important;">
                            <a class="nav-link p-2" href="javascript:void(0);" id="navbarDropdownMenuLink-5"
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="logged-user-letters" title="Detalii Cont"></div>

                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-info dropdown-menu-end"
                                 aria-labelledby="navbarDropdownMenuLink-5" style="position: absolute;">„
                                <a class="dropdown-item user-dropdown-item" href="javascript:void(0);"
                                   disabled="disabled">
                                    <span id="loggedUserId"></span>
                                    <div id="loggedUserRoles"></div>
                                </a>
                                <hr>
                                <div class="couple-btns-account">
                                    <a class="dropdown-item my-account-item btn-primary" href="javascript:void(0);"
                                       onclick="viewUserClient(false)">
                                        <button class="lang-change" data-lang-id="labelContulMeu"><i
                                                class="fa-solid fa-address-card"></i> Contul Meu
                                        </button>
                                    </a>
                                    <a class="dropdown-item my-account-item btn-primary" href="javascript:void(0);"
                                       onclick="viewHartaLocalizare(false)">
                                        <button class="lang-change" data-lang-id="labelContulMeu"><i
                                                class="fa-solid fa-address-card"></i>Localizare
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

            <%--          <div id="addDashboards" onclick="checkNrOfDashboardsOnAdd()">--%>
            <%--                <span class="add-dashboard-text"><b>+</b> Adaugă element nou</span>--%>
            <%--                <span id="countDashboards">--%>
            <%--                    <span id="counter"></span>--%>
            <%--                    / 10 Cadrane--%>
            <%--                </span>--%>
            <%--            </div>--%>
            <div id="divMsg" class="mt-5 mb-5">
                <header class="msg-header mt-3">
                    <h2 class="msg-header-title" >Mulțumim!  <i class="fa-regular fa-face-smile"></i></h2>
                </header>
                <div class="msg-content mt-3 mb-3">
                    <div class="msg-content-body" > Vă mulțumim pentru sprijinul acordat prin completarea chestionarelor noastre.</div>
                </div>

                <footer class="msg-footer mt-3 mb-3" id="footer">
                        <div>
                         <span id="data_curenta">
                           <button type = "button" class="btn btn-primary" onclick="asocSurveysToLocations();">Locații</button>
                        </span>
                    </div>
                </footer>
            </div>
            
            <div class="col-12 titlu-categorie subtitlu">Chestionarele dumneavoastră:</div>
            <div id="pagPricip" class="row">

                <c:forEach items="${zones}" var="z">
                <div class="col-lg-4 col-12 fp-card" onclick="">
                    <div class="card card-body mb-3 shadow" id="${z.key}">
                        <div class="row">
                            <div class="fp-card-header">
                                <h5 class="card-body-title"><spring:message text="${z.value[0].county}, ${z.value[0].city}"/>
                                        <%--code="main.card.recent-readings"--%>
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="fp-card-footer">
                                <!-- putem face aici testele sau sa mai frec colectia in java back!!!!! -->
                                <c:forEach items="${z.value}" var="chestionar">
                                 <!--  nu avem raspunsuri salvate -->
                                 <c:if test="${chestionar.survey_from_answer==null}">
                                  <div onclick="viewSurvey(${chestionar.id_survey}, ${z.key}, ${agricYear})"> <i class="fa fa-arrow-right"></i>
                                     <spring:message text="${chestionar.survey_title_ro}"/>
                                  </div>
                                <br>
                                </c:if>
                                <!--  avem raspunsuri in sesiunea curenta -->
                                <c:if test="${chestionar.survey_from_answer !=null}">
                                <div class="survey-completed" onclick="editSurveyClient(${chestionar.id_survey},${z.key}, '${z.value[0].county}', '${z.value[0].city}', ${agricYear})"> <i class="fa fa-check"></i>
                                     <spring:message text="${chestionar.survey_title_ro}"/>
                                  </div>
                                  <br>
                                </c:if>
                                
                                </c:forEach>
                                
                                <%-- <div class="survey-completed">  <i class="fa fa-check"></i>
                                    <spring:message
                                            code="main.card.recent-readings.p2" text="Chestionar cultură viță"/>
                                </div>
                                <br>
                                <div>  <i class="fa fa-arrow-right"></i>
                                    <spring:message
                                            code="main.card.recent-readings.p3" text="Chestionar cultură grâu"/>
                                </div>
                                <br> --%>
                            </div>
                        </div>
                    </div>
                </div>
                </c:forEach>
               
                 
               
               <!--  data-bs-backdrop="static" data-bs-keyboard="false"-->
               <div class="modal fade" id="modal_alerta_necompletat"  tabindex="-1" role="dialog">
  					<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    					<div class="modal-content">
      					 <div class="modal-header" style="border-bottom: 1px solid #dee2e6">
        				  <h5 class="modal-title">Au mai rămas de completat următoarele chestionare</h5>
        				  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          				   <span aria-hidden="true">X</span>
        				  </button>
      					 </div>
      					 <div class="modal-body">

        				 	<c:forEach items="${alertZones}" var="z">
        				 	  
        				 	  <c:if test="${z.value[0]!=null}">
                    			<div class="p-2"><h6><c:out value="${z.value[0].county}, ${z.value[0].city}"/></h6>
                        		<c:forEach items="${z.value}" var="chestionar">
                            		<div class="surveys-modal" onclick="viewSurvey(${chestionar.id_survey}, ${z.key}, ${agricYear})">- <c:out value= "${chestionar.survey_title_ro}"/></div>
                        		</c:forEach>
                        		</div>
                        	  </c:if>	                       
                			 
                			 </c:forEach>
                			

      					 </div>
      					 <div class="modal-footer">
        				 
      					 </div>
    				    </div>
  				 </div>
				</div>
               
               
               
             
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
<jsp:include page="includes/includeJSClient.jsp"></jsp:include>

<c:if test="${alertZones.keySet().size()>0}">
	<script>
	  $(document).ready(function () {
		$('#modal_alerta_necompletat').modal('show');
	  });
	</script>
</c:if>

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