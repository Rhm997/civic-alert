<%@ page import="com.fac.civicalert.commons.common.constants.Constants" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.fac.civicalert.commons.common.constants.Constants" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%

    String path = request.getContextPath(); // request.getContextPath() -> ia numele proiectului in cazul asta: wManagement
    String pathRedirect = path;

//for deploy
    //pathRedirect = "/";
    //path = ""; //si cand nu e publicat trebuie comentat

    String v = "2023_01_11";

    String currDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
    java.util.Date curDateD = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(currDate);
    if (request.getServerName().toLowerCase().contains("xxx.ro")) {
        //path = "";
        //System.out.println(".aici():" + request.getServerName());
    }

    request.setAttribute("currDate", currDate);

//    Integer app = Constants.APP_SLANIC;
//    Integer app = Constants.APP_ISACCEA;
    Integer app = Constants.APP_ADIS_B;

    String appFolder = Constants.NOM_APP[app];
    String appName = Constants.NOM_APP_NAMES[app];

    Integer defJud = 0;
    Integer defLoc = 0;
    if (app == Constants.APP_ADIS_B) {
        defJud = 4;
        defLoc = 2415;
    }
    if (app == Constants.APP_SLANIC) {
        defJud = 4;
        defLoc = 2004;
    }
    if (app == Constants.APP_ISACCEA) {
        defJud = 36;
        defLoc = 15517;
    }

//System.out.println(".getServerName():" + request.getServerName());

%>
<fmt:setLocale value="en_US" scope="session"/>