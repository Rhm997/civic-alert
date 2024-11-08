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
    <link rel="SHORTCUT ICON" href="resources/images/app/favicon.ico">
    <title>Chestionare</title>
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

            <div class="container-login">
                <input type="checkbox" id="flip">
                <input type="checkbox" id="flip_pass">
                <div class="cover-complete-register">
                    <div class="back">
                        <img src="<%=path%>/resources/images/first_page/logo-anm.png"/>
                        <div class="text text-createAcc">
                            <span class="text-1">Setează parola </span> <br>
                            <div class="text-2">Configurează parola pentru a activa contul.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="forms">
                    <div class="form-content">
                        <div class="form-signup-complete-register" style="display: block">
                            <div class="title">Activare cont</div>
                                <div class="input-boxes">
                                    <div class="input-box">
                                        <i class="fas fa-user"></i>
                                        <input type="password" id="pass1" placeholder="Parolă" name="pass1" onkeyup="passVal()"/>
                                        <span toggle="#pass1" class="fa fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div class="input-box">
                                        <i class="fas fa-user"></i>
                                        <input type="password" placeholder="Confirmă parola" id="pass2" name="pass2"/>
                                        <span toggle="#pass2" class="fa fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div id="validation-box" class="mt-2" style="background: unset">
                                        <div id="letter" class="invalid"><i class="fas fa-times"></i> Litere mici</div>
                                        <div id="capital" class="invalid"><i class="fas fa-times"></i> Litere mari</div>
                                        <div id="numbersOrSpecial" class="invalid"><i class="fas fa-times"></i>Cifre sau caractere speciale
                                        </div>
                                        <div id="length" class="invalid"><i class="fas fa-times"></i>Cel puțin 6 caractere
                                        </div>
                                    </div>
                                    <div class="button input-box">
                                        <input id="btnActivateAccount" type="submit" onclick="completeRegister('<%=path%>', '${token}')" value="Activare" class="btn btn-primary" disabled>
                                    </div>
                                </div>
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
