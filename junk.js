<script>
    am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    chart.homeZoomLevel = 1;
    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;
    chart.homeGeoPoint = {
        latitude: 25,
        longitude: -2
    };
    
    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.exclude = ["AQ"];
    
    // Add line bullets
    var cities = chart.series.push(new am4maps.MapImageSeries());
    cities.mapImages.template.nonScaling = true;

    var map = null;         

     function GetMap()
     {
        // Initialize the map
        map = new Microsoft.Maps.Map(document.getElementById("myMap"),
        {credentials:"Ao8E3Nx8O0JkzoD7wvQc4LwoA2OuMXACZXYv2SxR8xxmiohl_n3-YexqN9MmUv6_"}); 

        // Retrieve the location of the map center 
        var center = map.getCenter();
        
        // Add a pin to the center of the map, using a custom icon
        var pin = new Microsoft.Maps.Pushpin(center, {icon: 'http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/24/Maps-Pin-Place-icon.png', width: 50, height: 50, draggable: true}); 

        map.entities.push(pin);
     }
    
    var city = cities.mapImages.template.createChild(am4core.Circle);
    city.radius = 6;
    city.fill = chart.colors.getIndex(0).brighten(-0.2);
    city.strokeWidth = 2;
    city.stroke = am4core.color("#fff");
    
    function addCity(coords, title) {
        var city = cities.mapImages.create();
        city.latitude = coords.latitude;
        city.longitude = coords.longitude;
        city.tooltipText = title;
        return city;
    }
    
    var Singapore = addCity({ "latitude": 1.332696, "longitude": 103.893375 }, "Singapore");
    var Hongkong = addCity({ "latitude": 22.318020, "longitude": 114.215460 }, "Hong Kong");
    var India = addCity({ "latitude": 19.111250, "longitude": 72.853970 }, "India");
    var Japan = addCity({ "latitude": 35.689532, "longitude": 139.712837 }, "Japan");
    var Korea = addCity({ "latitude": 35.110603, "longitude": 129.037676 }, "Korea");
    var Taiwan = addCity({ "latitude": 24.994160, "longitude": 121.460980 }, "Taiwan");
    var Australia = addCity({ "latitude": -33.872540236091886, "longitude": 151.092908453968 }, "Australia");
    var UK = addCity({ "latitude": 51.51504722788067, "longitude": -0.12360565935777981 }, "UK");

    // Add lines
    var lineSeries = chart.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.line.strokeWidth = 2;
    lineSeries.mapLines.template.line.strokeOpacity = 0.5;
    lineSeries.mapLines.template.line.stroke = city.fill;
    lineSeries.mapLines.template.line.nonScalingStroke = true;
    lineSeries.mapLines.template.line.strokeDasharray = "1,1";
    lineSeries.zIndex = 10;
    
    var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
    shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
    shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
    shadowLineSeries.mapLines.template.shortestDistance = false;
    shadowLineSeries.zIndex = 5;
    
    function addLine(from, to) {
        var line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = -0.2;
    
        var shadowLine = shadowLineSeries.mapLines.create();
        shadowLine.imagesToConnect = [from, to];
    
        return line;
    }
    
    addLine(Singapore, Hongkong);
    addLine(Hongkong, India);
    addLine(India, Japan);
    addLine(Japan, Korea);
    addLine(Korea, Taiwan);
    addLine(Taiwan, Australia);
    addLine(Australia, UK);
    
    // // Add plane
    // var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    // plane.position = 0;
    // plane.width = 48;
    // plane.height = 48;
    
    // plane.adapter.add("scale", function(scale, target) {
    //     return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    // })
    
    // var planeImage = plane.createChild(am4core.Sprite);
    // planeImage.scale = 0.08;
    // planeImage.horizontalCenter = "middle";
    // planeImage.verticalCenter = "middle";
    // planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    // planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
    // planeImage.strokeOpacity = 0;
    
    // var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
    // shadowPlane.position = 0;
    // shadowPlane.width = 48;
    // shadowPlane.height = 48;
    
    // var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
    // shadowPlaneImage.scale = 0.05;
    // shadowPlaneImage.horizontalCenter = "middle";
    // shadowPlaneImage.verticalCenter = "middle";
    // shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    // shadowPlaneImage.fill = am4core.color("#000");
    // shadowPlaneImage.strokeOpacity = 0;
    
    // shadowPlane.adapter.add("scale", function(scale, target) {
    //     target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
    //     return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
    // })
    
    // // Plane animation
    // var currentLine = 0;
    // var direction = 1;
    // function flyPlane() {
    
    //     // Get current line to attach plane to
    //     plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
    //     plane.parent = lineSeries;
    //     shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
    //     shadowPlane.parent = shadowLineSeries;
    //     shadowPlaneImage.rotation = planeImage.rotation;
    
    //     // Set up animation
    //     var from, to;
    //     var numLines = lineSeries.mapLines.length;
    //     if (direction == 1) {
    //         from = 0
    //         to = 1;
    //         if (planeImage.rotation != 0) {
    //             planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
    //             return;
    //         }
    //     }
    //     else {
    //         from = 1;
    //         to = 0;
    //         if (planeImage.rotation != 180) {
    //             planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
    //             return;
    //         }
    //     }
    
    //     // Start the animation
    //     var animation = plane.animate({
    //         from: from,
    //         to: to,
    //         property: "position"
    //     }, 5000, am4core.ease.sinInOut);
    //     animation.events.on("animationended", flyPlane)
    //     /*animation.events.on("animationprogress", function(ev) {
    //       var progress = Math.abs(ev.progress - 0.5);
    //       //console.log(progress);
    //       //planeImage.scale += 0.2;
    //     });*/
    
    //     shadowPlane.animate({
    //         from: from,
    //         to: to,
    //         property: "position"
    //     }, 5000, am4core.ease.sinInOut);
    
    //     // Increment line, or reverse the direction
    //     currentLine += direction;
    //     if (currentLine < 0) {
    //         currentLine = 0;
    //         direction = 1;
    //     }
    //     else if ((currentLine + 1) > numLines) {
    //         currentLine = numLines - 1;
    //         direction = -1;
    //     }
    
    // }
    
    // // Go!
    // flyPlane();
    
    }); // end am4core.ready()
    </script>



<script>
    am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    
    // Set map definition
    chart.geodata = am4geodata_worldLow;
    
    // Set projection
    chart.projection = new am4maps.projections.Miller();
    
    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    
    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];
    
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    
    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.polygon.fillOpacity = 0.6;
    
    
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);
    
    // Add image series
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "{title}";
    imageSeries.mapImages.template.propertyFields.url = "url";
    
    var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 3;
    circle.propertyFields.fill = "color";
    circle.nonScaling = true;
    
    var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 3;
    circle2.propertyFields.fill = "color";
    
    
    circle2.events.on("inited", function(event){
      animateBullet(event.target);
    })
    
    
    function animateBullet(circle) {
        var animation = circle.animate([{ property: "scale", from: 1 / chart.zoomLevel, to: 5 / chart.zoomLevel }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function(event){
          animateBullet(event.target.object);
        })
    }
    
    var colorSet = new am4core.ColorSet();
    
    imageSeries.data = [ {
      "title": "Brussels",
      "latitude": 50.8371,
      "longitude": 4.3676,
      "color":colorSet.next()
    }, {
      "title": "Copenhagen",
      "latitude": 55.6763,
      "longitude": 12.5681,
      "color":colorSet.next()
    }, {
      "title": "Singapore",
      "latitude": 48.8567,
      "longitude": 2.3510,
      "color":colorSet.next()
    }, {
      "title": "Reykjavik",
      "latitude": 64.1353,
      "longitude": -21.8952,
      "color":colorSet.next()
    }, {
      "title": "Moscow",
      "latitude": 55.7558,
      "longitude": 37.6176,
      "color":colorSet.next()
    }, {
      "title": "Madrid",
      "latitude": 40.4167,
      "longitude": -3.7033,
      "color":colorSet.next()
    }, {
      "title": "London",
      "latitude": 51.5002,
      "longitude": -0.1262,
      "url": "http://www.google.co.uk",
      "color":colorSet.next()
    }, {
      "title": "Peking",
      "latitude": 39.9056,
      "longitude": 116.3958,
      "color":colorSet.next()
    }, {
      "title": "New Delhi",
      "latitude": 28.6353,
      "longitude": 77.2250,
      "color":colorSet.next()
    } ];
    }); // end am4core.ready()
    </script>