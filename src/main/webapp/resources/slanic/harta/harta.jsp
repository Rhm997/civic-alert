<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    Cookie cookie = new Cookie("JSESSIONID", session.getId());
    response.addCookie(cookie);

    String paramCond = request.getParameter("cond");
    String cond = " and 1=1";
    if (paramCond != null && !paramCond.isEmpty() && !paramCond.equals("1")) {
        cond = " and cod_zona in (" + paramCond + ") ";
    }
%>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta
            name="viewport"
            content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
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

      var view, map;
      var isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function () {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
      };
      require(["esri/Map", "esri/views/MapView", "esri/geometry/Extent", "esri/layers/MapImageLayer", "esri/layers/VectorTileLayer",
            "esri/layers/FeatureLayer", "esri/widgets/Search", "esri/Viewpoint", "esri/widgets/Legend", "esri/widgets/Expand", "esri/widgets/Home", "esri/core/urlUtils"
          ],
          (Map, MapView, Extent, MapImageLayer, VectorTileLayer, FeatureLayer, Search, Viewpoint, Legend, Expand, Home, urlUtils) => {

            initExtent = new Extent({
              "xmin": 2608480.4726307276,
              "ymin": 6040333.447977691, "xmax": 2644119.2370686433,
              "ymax": 6058850.31807975, "spatialReference": {"wkid": 102100}
            });  //baia mare

            /*      initExtent = new   Extent({ "xmin": 2885488.8505723616,
                          "ymin":5657091.345195206, "xmax":2889943.6961272247,
                          "ymax":5659348.626186812,"spatialReference":{"wkid":102100}});  //SLANIC
             */

            const layerTomb = new MapImageLayer({
              url: "https://webadaptortaz.gisapp.ro/arcgismm/rest/services/GIS/TomberoaneSlanic/MapServer",
              sublayers: [
                {
                  id: 0,
                  visible: true,
                  /*  definitionExpression: "status_valid=1" */
                }
              ]
            });

            const layerColectari = new MapImageLayer({
              url: "https://webadaptortaz.gisapp.ro/arcgismm/rest/services/GIS/TomberoaneSlanic/MapServer",
              sublayers: [
                {
                  id: 1,
                  visible: true,
                  /*    definitionExpression: strCond */
                }
              ]
            });

            const template = {
              // autocasts as new PopupTemplate()
              title: "Cod tomberon: {bar_code}",
              content: "capacitate:{capacity}"
            };

            const layerTombFeat = new FeatureLayer({
              url: "https://webadaptortaz.gisapp.ro/arcgismm/rest/services/GIS/TomberoaneSlanic/MapServer/0",
              /* definitionExpression: "", */
              outFields: ["capacity", "bar_code"],
              legendEnabled: false,
              popupTemplate: template
            });

            const map = new Map({
              basemap: "topo-vector",
              layers: [layerTomb, layerColectari, layerTombFeat],
              extent: initExtent
            });
            // map.add(vectorTileLayer);
            // map.add(layerParcariMapServer);
            // map.add(layerParcariMapServerZone);
            // map.add(layerParcariMapServerAdresa);

            view = new MapView({
              container: "viewDiv",
              map: map,
              // zoom: 4,
              minScale: 150,
              extent: initExtent
              /*    extent:initExtent  */
              //center: [15, 65] // longitude, latitude
            });
            // view.goTo(initExtent);

            /*    const sources=[{
                       layer: new FeatureLayer({
                         url: "https://gis.primariagalati.ro/server/rest/services/Fida/ParcariGalati/FeatureServer/0",
                         outFields: ["cod_zona", "nr_loc", "tip_parcare"]
                       }),
                       searchFields: ["cod_zona", "nr_loc", "tip_parcare"],
                       displayField: "nr_loc",
                       exactMatch: false,
                       outFields: ["*"],
                       name: "Loc parcare",
                       placeholder: "exemplu: 1B033",
                       maxResults: 6,
                       maxSuggestions: 6,
                       suggestionsEnabled: true,
                       minSuggestCharacters: 0
                     }] ;
                     */

            const searchWidget = new Search({
              view: view, allPlaceholder: "Introduceti adresa",
              placeholder: "Numar loc",
              /*  sources: sources,  */

            });

            var extins = true;
            if (isMobile.any()) {
              extins = false;
            }
            // Adds the search widget below other elements in
            // the top left corner of the view
            view.ui.add(searchWidget, {
              position: "top-left",
              index: 0
            });
            searchWidget.focus();

            var vp = new Viewpoint({
              targetGeometry: initExtent
            });

            const homeBtn = new Home({
              view: view,
              viewpoint: vp
            });

            view.ui.add(homeBtn, "top-left");

            for (var index in map.layers.items)
              map.layers.items[index].title = "";

            const legend = new Expand({
              content: new Legend({
                view: view,

                //style: "card" // other styles include 'classic'
              }),
              view: view,
              expanded: extins
            });
            view.ui.add(legend, "bottom-right");

            layerTomb.when(() => {
              // window.parent.hideLoading();
            });

          });
    </script>
</head>

<body>
<div id="viewDiv"></div>
</body>
</html>
