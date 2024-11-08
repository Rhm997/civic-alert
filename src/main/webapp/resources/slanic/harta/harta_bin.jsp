<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    Cookie cookie = new Cookie("JSESSIONID", session.getId());
    response.addCookie(cookie);
    response.addHeader("X-Frame-Options", "SAMEORIGIN");

    String paramCond = request.getParameter("cond");
    String cond = " 1=1";
    if (paramCond != null && !paramCond.isEmpty() && !paramCond.equals("1")) {
        cond += " and bar_code in (" + paramCond + ") ";
    }
%>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <title>Slănic Moldova</title>
    <style>
      html,
      body,
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.25/esri/themes/light/main.css"/>
    <script src="https://js.arcgis.com/4.25/"></script>

    <script>

      var view;
      require(["esri/Map", "esri/views/MapView", "esri/geometry/Extent", "esri/layers/MapImageLayer", "esri/layers/VectorTileLayer",
            "esri/layers/FeatureLayer", "esri/Graphic", "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/core/urlUtils"
          ],
          (Map, MapView, Extent, MapImageLayer, VectorTileLayer, FeatureLayer, Graphic, SimpleFillSymbol, SimpleLineSymbol, Color, urlUtils) => {

            /* 	  urlUtils.addProxyRule({
                       urlPrefix: "https://gis.primariagalati.ro/server/rest/services",
                      proxyUrl: "https://admparcari.primariagalati.ro/proxy/proxy.jsp"
              }); */

            initExtent = new Extent({
              "xmin": 2608480.4726307276,
              "ymin": 6040333.447977691, "xmax": 2644119.2370686433,
              "ymax": 6058850.31807975, "spatialReference": {"wkid": 102100}
            });  //baia mare

            /*      initExtent = new   Extent({ "xmin": 2885488.8505723616,
                    "ymin":5657091.345195206, "xmax":2889943.6961272247,
                    "ymax":5659348.626186812,"spatialReference":{"wkid":102100}}); //Slanic */

            var strCond = "<%=cond%>";

            /*           let vectorTileLayer = new VectorTileLayer(
                              //"https://webadaptor02.gisapp.ro/servergis/rest/services/Hosted/Basemap_/VectorTileServer"
                              //"https://tiles.arcgis.com/tiles/FSlhQ9l4bxg9WcHR/arcgis/rest/services/Basemap_/VectorTileServer"
                              "https://tiles.arcgis.com/tiles/FSlhQ9l4bxg9WcHR/arcgis/rest/services/Basemap_20230220/VectorTileServer"
                            );
                      vectorTileLayer.opacity = 0.5;     */
            /*  const vectorTileLayer = new VectorTileLayer({
                 url: "https://webadaptor02.gisapp.ro/servergis/rest/services/Hosted/Basemap_2/VectorTileServer"
               }); */
            //
            const layerTombFeat = new FeatureLayer({
              url: "https://webadaptortaz.gisapp.ro/arcgismm/rest/services/GIS/TomberoaneSlanic/MapServer/0",
              definitionExpression: strCond,
              outFields: ["objectid", "capacity", "bar_code"]
            });

            const layerTombMap = new MapImageLayer({
              url: "https://webadaptortaz.gisapp.ro/arcgismm/rest/services/GIS/TomberoaneSlanic/MapServer",
              sublayers: [
                {
                  id: 0,
                  visible: true,
                  definitionExpression: strCond
                }
              ]
            });
            const map = new Map({
              basemap: "topo-vector",
              layers: [layerTombFeat, layerTombMap]
            });

            view = new MapView({
              container: "viewDiv",
              map: map,
              // zoom: 4,
              extent: initExtent,
              minScale: 150
              //center: [15, 65] // longitude, latitude
            });

            layerTombFeat.when(() => {
              return layerTombFeat.queryExtent();

            }).then((response) => {
              if (response.count > 0) {
                view.goTo(response.extent);
                view.zoom = 19;
              }
              // window.parent.hideLoading();
            });

          });
    </script>
</head>

<body>
<div id="viewDiv"></div>
</body>
</html>
