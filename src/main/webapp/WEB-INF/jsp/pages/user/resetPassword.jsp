<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@include file="../includes/path.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Insert title here</title>
</head>
<body>
<div class="fadeIn">

                    <div>
                        <i class="fa-solid fa-user"></i>
                        <input type="text" id="resetPassEmail" data-lang-id="labelEmailUser" class="mt-40 lang-change"
                               name="uname" value="${param.email}"
                               placeholder="Email" required/>
                    </div>

                    <div class="form-group">
                        <button type="submit" id="resetButton" class="lang-change btn-autentif" data-lang-id="labelAutentificare" onclick="resetUserPassword()">Resetează</button>

                    </div>
                <div class="footer-reset-pass">
                    <a class="lang-change btn-renunta" href="javascript:void(0);" data-lang-id="labelAmUitatParola"
                       onclick="redirectToLogin();"
                       title="Înapoi la autentificare"><i
                            class="fa-solid fa-arrow-left"></i></a>
                </div>


</div>
</body>
</html>