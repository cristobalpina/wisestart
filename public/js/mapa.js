var map;
var markers = [];
var activePolygons = [];
var activeArea;
var infowindow;
var typeSelect = $('#type');
var areaSelect = $('#area');
var trafficSelect = $('#traffic');

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.4857978, lng: -70.5487625},
        zoom: 13,
        scrollwheel: false
    });

    infowindow = new google.maps.InfoWindow();

    areaSelect.on('change', function(){
        let area = this.value;
        let areaName = $(this).find('option:selected').text();

        if(area != null)
        {   
            typeSelect.prop('disabled', false);
            typeSelect.val("0");
        }

        for(let polygon of activePolygons)
        {
            polygon.setMap(null);
        }

        activePolygons = [];

        $.ajax({
            url: "/area/"+area,
            success: function(result){
                activeArea = result;
                map.panTo(result);
            }
        });

        $.ajax({
            url: "/area/"+area+"/polygons",
            success: function(result){
                for(let polygon of result){

                    let polyData = polygon;

                    polygon = new google.maps.Polygon({
                        paths: polygon.coordinates,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#33FFFF',
                        fillOpacity: 0.35,
                        editable: false
                      });

                    polygon.addListener('click', function(event) {

                        infowindow.close();

                        if(typeSelect.val() && areaSelect.val()) {

                            let lat = event.latLng.lat();
                            let lng = event.latLng.lng();

                            let latLng = {'lat': lat, 'lng': lng};

                            let workType = typeSelect.find('option:selected').text();

                            var strVar = '<div id="content">';
                            strVar += '<h3 id="firstHeading" class="firstHeading" style="text-align: center">Zona '+polyData.name+'</h3>';
                            strVar += '<h6 style="text-align: center">('+areaName+')</h6><br>';
                            strVar += '<h6 style="text-align: center">('+workType+')</h6><br>';
                            strVar += '<div id="bodyContent" style="text-align: center">';
                            strVar += '<a class="waves-effect waves-light btn" style="color: white" id="openModal1">Obtener Informe</a>';
                            strVar += '</div>';
                            strVar += '</div>';

                            infowindow = new google.maps.InfoWindow({
                                content: strVar,
                                position: latLng
                            });

                            infowindow.open(map, polygon);

                            $('#openModal1').on('click', function() {
                                generateReport(polyData, polygon, areaSelect, typeSelect, trafficSelect);
                            });
                        }
                    });

                    activePolygons.push(polygon);

                }
                setOnMap(activePolygons, map);
            }
        });
    });


    typeSelect.on('change', function(){
        var type = this.value;

        deleteMarkers();

        var request = {
            location: {lat: activeArea.lat, lng: activeArea.lng},
            radius: '3000',
            types: [type]
        };

        var search = new google.maps.places.PlacesService(map);
        search.nearbySearch(request, callback);
    });

    
    var bikeLayer = new google.maps.BicyclingLayer();
    var trafficLayer = new google.maps.TrafficLayer();
    
    trafficSelect.on('change', function(){
        let type = this.value;

        switch (type) {
            case "auto":
                bikeLayer.setMap(null);
                trafficLayer.setMap(map);
                break;

            case "bici":
                trafficLayer.setMap(null);
                bikeLayer.setMap(map);
                break;

            default:
                trafficLayer.setMap(null);
                bikeLayer.setMap(null);
                break;
        }
    });
    

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
           content: place.name
        });
        marker.addListener('click', function() {
        infowindow.open(map, marker);

        });
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for(let polygon of activePolygons)
            {
                for (var i = 0; i < results.length; i++)
                {
                    var place = results[i];
                    if(google.maps.geometry.poly.containsLocation(place.geometry.location, polygon))
                    {
                        createMarker(place);
                    }
                } 

                let markersInside = countMarkersInside(polygon, markers);
                colorByMarkers(polygon, markersInside);
            }
             
        } else {
            for(let polygon of activePolygons) {
                colorByMarkers(polygon, 0);
            }
        }
    }
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}