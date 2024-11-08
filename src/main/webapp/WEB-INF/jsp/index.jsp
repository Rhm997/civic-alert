<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
    response.addHeader("Access-Control-Allow-Origin", "*");
%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>


<%@include file="pages/includes/path.jsp" %>
<html>
<head>
    <jsp:include page="pages/includes/includeCSS.jsp"></jsp:include>
    <jsp:include page="pages/includes/includeCSSClient.jsp"></jsp:include>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Chestionare</title>
    <link rel = "icon" type = "image/png"  href = "resources/images/first_page/anm.png" >
    <script>
        var PATH_TO_CONTROLLERS = '<%=path%>';
    </script>
    <link rel="stylesheet" type="text/css" href="<%=path%>/resources/css/importuri/fontawesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=path%>/resources/css/importuri/bootstrap.min.css"/>
    <link rel="stylesheet" href="<%=path%>/resources/css/index.css"/>
    <link rel="stylesheet" href="<%=path%>/resources/css/vars.css"/>
    <link rel="stylesheet" type="text/css" href="<%=path%>/resources/css/app.css?v=<%=v %>"/>
    <link rel="stylesheet" type="text/css" href="<%=path%>/resources/css/design.css?v=<%=v %>"/>
    <link rel="stylesheet" type="text/css" href="<%=path%>/resources/css/importuri/animate.css?v=<%=v %>"/>
    <style>

        .lang-div {
            width: 90%;
        }

        .lang-div a {
            color: var(--main-color);
            font-weight: 700;
        }

        body {
            background-color: #f5f5f5;
        }
    </style>

</head>
<body>
<div class="container-fluid p-0">
    <div id="coverLogin" class="">
        <div class="login-shadow">

            <div class="container-login animate__animated animate__fadeInDown">
                <input type="checkbox" id="flip">
                <input type="checkbox" id="flip_pass">
                <div class="cover">
                    <div class="front">
                        <div class="text">
                            <img src="resources/images/first_page/logo-anm.png"/>
                            <span class="text-1"><spring:message code="login.welcome-text" text="default"/></span>
                            <span class="text-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</span>
                        </div>
                    </div>
                    <div class="back">
                        <img src="resources/images/first_page/logo-anm.png"/>
                        <div class="text text-createAcc">
                            <span class="text-1">Nu ai cont în aplicație? </span> <br>
                            <div class="text-2">Introdu datele tale în formularul din dreapta paginii și crează acum un
                                cont în aplicație.
                            </div>
                        </div>
                        <div class="text text-resetPass">
                            <span class="text-1">Dorești să îți resetezi parola? </span> <br>
                            <div class="text-2">Introdu emailul în partea dreaptă și vei primi pe email o nouă parolă.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="forms">
                    <div class="form-content">
                        <div class="form-login">
                            <div class="d-flex div-languages">
                            <div class="position-absolute internationalization-container">
                                    <div class="dropdown dropdown-inter">
                                        <a data-bs-dropdown-init class="dropdown-toggle" href="#" id="Dropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="Dropdown">
                                            <li>
                                                <a class="dropdown-item" href="#" data-lang="ro">
                                            <img src="resources/images/lang/icon-ro.png" class="img-language"/>
                                                    <spring:message code="ro.ro" text="Română"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" data-lang="en">
                                                    <img src="resources/images/lang/icon-en.png" class="img-language"/>
                                                    <spring:message code="en.en" text="Engleză"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="title"> <spring:message code="login.log-in-titlte" text="default"/></div>
                            <form id="formLogin" action="#" onsubmit="return false;">
                                <div class="input-boxes">
                                    <div class="input-box">
                                        <i class="fas fa-envelope"></i>
                                        <input type="text" placeholder="<spring:message code="login.user.placeholder" text="default"/>" id="username"
                                               oninvalid="this.setCustomValidity('Completați câmpul.')"
                                               oninput="this.setCustomValidity('')" required>
                                    </div>
                                    <div class="input-box">
                                        <i class="fas fa-lock"></i>
                                        <input type="password" placeholder="<spring:message code="login.password.placeholder" text="default"/>" id="password"
                                               oninvalid="this.setCustomValidity('Completați câmpul.')"
                                               oninput="this.setCustomValidity('')" required>
                                        <span toggle="#password" class="fa fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div class="text forgot-password"><label for="flip_pass"><spring:message code="login.forget-password" text="default"/></label>
                                    </div>
                                    <div class="button input-box">
                                        <input type="submit" value="<spring:message code="login.login" text="default"/>" class="btn btn-primary"
                                               onclick="login();">
                                    </div>
                                    <div class="text sign-up-text"><spring:message code="login.no-account" text="default"/> <label for="flip"><spring:message code="login.create-account" text="default"/></label></div>
                                </div>
                            </form>
                        </div>
                        <div class="form-signup">
                            <div class="title"><spring:message code="login.create-account-title" text="default"/></div>
                            <form id="newUserForm" action="#" onsubmit="return false;">
                                <div class="input-boxes">
                                    <div class="input-box">
                                        <i class="fas fa-user"></i>
                                        <input type="text" data-register="firstName" placeholder="<spring:message code="account.firstname" text="default"/>" required>
                                    </div>
                                    <div class="input-box">
                                        <i class="fas fa-user"></i>
                                        <input type="text" data-register="lastName" placeholder="<spring:message code="account.lastname" text="default"/>" required>
                                    </div>
                                    <div class="input-box">
                                        <i class="fas fa-envelope"></i>
                                        <input type="text" data-register="email" placeholder="Email" required>
                                    </div>
                                    <div class="input-box">
                                        <i class="fas fa-envelope"></i>
                                        <input type="text" data-register="phone" placeholder="<spring:message code="account.phone" text="default"/>" required>
                                    </div>
                                    <div class="input-box">
                                        <i class="fa-solid fa-earth-americas" style="margin-top: 16px;"></i>
                                        <select data-key="" class="campObl neEdit form-control new-input"
                                                data-name="Țară" data-header="idSurveyType">
                                            <option value="0"> Alege țara din listă</option>
                                            <option value="1"> România</option>
                                            <option value="2"> Ungaria</option>
                                        </select>
                                    </div>
                                    <div class="button input-box">
                                        <input onclick="registerUser('<%=path%>', '${token}')"  type="submit" value="<spring:message code="login.register" text="default"/>" class="btn btn-primary">
                                    </div>
                                    <div class="text sign-up-text"><spring:message code="login.have-account" text="default"/> <label for="flip"><spring:message code="login.back-to-login" text="default"/></label></div>
                                </div>
                            </form>
                        </div>
                        <div class="form-forgotPass">
                            <div class="title"><spring:message code="login.reset-password-title" text="default"/></div>
                            <form id="forgotPassword" action="#" onsubmit="return false;">
                                <div class="input-boxes">
                                    <div class="input-box">
                                        <i class="fas fa-envelope"></i>
                                        <input type="text" placeholder="Email" value="${param.email}" required>
                                    </div>
                                    <div class="button input-box">
                                        <input type="submit" value="<spring:message code="login.reset-password" text="default"/>" class="btn btn-primary"
                                               onclick="resetUserPassword();">
                                    </div>
                                    <div class="text sign-up-text"><spring:message code="login.back-to" text="default"/> <label for="flip_pass"><spring:message code="login.back-to-login" text="default"/></label></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <!--   <div class="lang-div">
                 <span id="lang_id" data-lang="">Limba</span>
                  <select class="lang-control" id="languageSelect" name="languageSelect"><option>RO</option><option>EN</option><option>DE</option></select>
              </div>  -->

        </div>
    </div>
</div>
</div>
<script src="resources/js/importuri/jquery-3.3.1.min.js?v=<%=v%>"></script>
<script src="resources/js/importuri/jquery-ui(1.12.1).js?v=<%=v%>"></script>

<script src="resources/js/importuri/js.cookie.js?v=<%=v%>"></script>
<script src="resources/js/importuri/sweetalert2.all.min.js?v=<%=v%>"></script>

<script src="resources/js/index.js?v=<%=v %>"></script>
<script src="resources/js/utils.js?v=<%=v %>"></script>

<jsp:include page="pages/includes/includeJS.jsp"></jsp:include>
<jsp:include page="pages/includes/includeJSClient.jsp"></jsp:include>

<script>
    //getAllLanguages();
</script>

<script>
    $(".toggle-password").click(function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

      document.addEventListener('DOMContentLoaded', e => {
        $('#input-url').autocomplete()
    }, false);


      $('.forgot-password').on('click', function (){
        $('.text-resetPass').css('display', 'flex');
      })

      $('.sign-up-text').on('click', function (){
        $('.text-resetPass').css('display', 'none');
      })

</script>

<%--    <script src="<%=path%>/resources/js/index.js?v=<%=v%>"></script> --%>
<c:if test="${not empty sesiune_exiprata && sesiune_exiprata == 1}">
    <script>

        swal({
            title: "Sesiunea a expirat!",
            text: "Vă rugăm să vă autentificați din nou.",
            icon: "error",
            button: "Închide",
        }).then(function () {
            redirectToLogin();
        });
    </script>
</c:if>


</body>
</html>
