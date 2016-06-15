var addPolyBtn = $('#add_polygon_btn');
var deletePolyBtn = $('#delete_polygon_btn');
var savePolyBtn = $('#save_polygon_btn');
var areaPolySelect = $('#area_polygon_select');
var userPolygon;
var activePolygons = [];
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.4857978, lng: -70.5487625},
        zoom: 13,
        scrollwheel: false
    });

	addPolyBtn.on('click', function(){

		$(this).prop('disabled', true);
		deletePolyBtn.prop('disabled', false);
		savePolyBtn.prop('disabled', false);	
	
		let polyCoords = [
     	 {lat: -33.488879 , lng: -70.549700 },
     	 {lat: -33.486364, lng: -70.557789}
  		];
  		
  		 userPolygon = new google.maps.Polygon({
		    paths: polyCoords,
		    strokeColor: '#FF0000',
		    strokeOpacity: 0.8,
		    strokeWeight: 3,
		    fillColor: '#FF0000',
		    fillOpacity: 0.35,
		    draggable: true,
		    editable: true
		  });
  		  activePolygons.push(userPolygon);
		  setOnMap(activePolygons, map);
	});

	areaPolySelect.on('change', function(){
		let area = $(this).val();
		$.when(getPolygonsBy(area)).done(function(polygons){
			for(let polygon of polygons)
			{
				polygon = new google.maps.Polygon({
                        paths: polygon.coordinates,
                        strokeColor: '#000000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#33FFFF',
                        fillOpacity: 0.35,
                        editable: false
                      });
				activePolygons.push(polygon);
			}
			setOnMap(activePolygons, map);
			
		});
	});

	deletePolyBtn.on('click', function(){
		polygon.setMap(null);
		polygon = null;
		$(this).prop('disabled', true);
		addPolyBtn.prop('disabled', false);
		savePolyBtn.prop('disabled', true);
	});

	savePolyBtn.on('click', function(){
		if(areaPolySelect.val() == null){
			swal("selecciona una comuna!!!  Aweonao.");
			return
		}
		var polygonPath = userPolygon.getPath();
		let path = [];
		for(let i = 0; i < polygonPath.getLength(); i++){
			let vertex = polygonPath.getAt(i);
			let coordinate = {lat: vertex.lat(), lng: vertex.lng()};
			path.push(coordinate);
		}
		let token = $('input[name=_token]').val();
		let area = areaPolySelect.val();
		$.ajax({
			url: "/polygons",
			type: "POST",
			data: {
				_token: token,
				path: path,
				area: area
			},
			success: function(result){
				swal('Sector creado con éxito!',
					 'Ahora aparecera en sus futuras busquedas',
					  'success');
				setOnMap(activePolygons, null);
				activePolygons = [];
				userPolygon = null;
			},
		});
	});
}