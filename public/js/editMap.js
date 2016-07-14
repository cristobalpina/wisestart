var addPolyBtn = $('#add_polygon_btn');
var deletePolyBtn = $('#delete_polygon_btn');
var savePolyBtn = $('#save_polygon_btn');
var areaPolySelect = $('#area_polygon_select');
var addAreaBtn = $('#add_area_btn');
var userPolygon;
var activePolygons = [];
var activeArea;
var userArea;
var infowindow;

function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.4857978, lng: -70.5487625},
        zoom: 13,
        scrollwheel: false
    });

    infowindow = new google.maps.InfoWindow();

	$.when(getAllAreas()).done(function(areas){
		areaPolySelect.find('option').remove();
		fillSelectWithAreas(areas, areaPolySelect);
	});
	addPolyBtn.on('click', function(){

		$(this).hide();
		deletePolyBtn.show();
		savePolyBtn.show();
		addAreaBtn.hide();

	
		let polyCoords = [
     	 {lat: -33.488000 , lng: -70.550000 },
     	 {lat: -33.486000, lng: -70.557000}
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
		if(activeArea){
			activeArea.setMap(null);
		}
		activeArea = null;
		if(userArea){
			userArea.setMap(null);
		}
		userArea = null;
		setOnMap(activePolygons, null);
		activePolygons = [];
		if($(this).val() == 0){
			return;
		}
		$.when(getAreaBy(area)).done(function(result){
			map.panTo(result);
			activeArea = new google.maps.Marker({
    			position: map.getCenter(),
    			draggable: true
			});
			activeArea.setMap(map);
			infowindow = new google.maps.InfoWindow({
           		content: 'Centro de '+result.name
        	});
			activeArea.addListener('click', function() {
		        infowindow.open(map, activeArea);
			});
			activeArea.addListener('dragend', function() {
				swal({
					title: 'Centro Modificado',
					 text: '¿Desea guardar esta ubicación como el nuevo centro de la comuna?',
					 type: 'question'
					});
			});
		});

		$.when(getPolygonsBy(area)).done(function(polygons){
			for(let polygon of polygons)
			{
				console.log(polygon);
				let id = polygon.id;
				polygon = new google.maps.Polygon({
                        paths: polygon.coordinates,
                        strokeColor: '#000000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#33FFFF',
                        fillOpacity: 0.35,
                        editable: false
                      });
				   polygon.addListener('click', function(event) {

                        infowindow.close(); 

                        let lat = event.latLng.lat();
                        let lng = event.latLng.lng();
                        let latLng = {'lat': lat, 'lng': lng};
                        let content = '<a href="/polygons/'+id+'/edit" class="waves-effect waves-light btn blue"';
                        	content+=' style="color: white">';
                        	content+='Editar <i class="material-icons right">mode_edit</i></a>';
	                    infowindow = new google.maps.InfoWindow({
	                        content: content,
	                        position: latLng
	                    });

	                    infowindow.open(map, polygon);
	              
                    });
				activePolygons.push(polygon);
			}
			setOnMap(activePolygons, map);
			
		});
	});

	deletePolyBtn.on('click', function(){
		if(userPolygon != null)
		{
			userPolygon.setMap(null);
		}
		userPolygon = null;
		if(userArea != null)
		{
			userArea.setMap(null);
		}
		activePolygons = [];
		areaPolySelect.val(0);
		userArea = null;
		addPolyBtn.show();
		addAreaBtn.show();
		deletePolyBtn.hide();
		savePolyBtn.hide();
	});
	addAreaBtn.on('click', function(){
		$(this).hide();
		addPolyBtn.hide();
		savePolyBtn.show();
		deletePolyBtn.show();
		if(userArea != null)
			{
				userArea.setMap(null);
			}
		swal(
			'Crear nueva Comuna',
		 	'Para crear una comuna debe indicar con el marcador '+
		 	'que se acaba de crear donde estará el centro de la comuna.',
		 	'info');

		userArea = new google.maps.Marker({
    		position: map.getCenter(),
    		draggable: true
		});
		console.log(userArea);
		userArea.setMap(map);
	});

	savePolyBtn.on('click', function(){
		if(userArea == null && userPolygon != null)
		{
			if(areaPolySelect.val() == 0){
				swal("Rechazado",
				 	 "Es necesario seleccionar una comuna antes "+
				 	 "de poder guardar el polígono.",
				 	 "warning");
				return;
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
					activeArea.setMap(null);
					activeArea = null;
					areaPolySelect.val(0);
				},
			});
		}
		else if(userArea != null && userPolygon == null)
		{
			swal({
			  title: 'Ingrese el nombre de la nueva comuna',
			  input: 'text',
			  showCancelButton: true,
			  inputValidator: function(value) {
			    return new Promise(function(resolve, reject) {
			      if (value.length > 2) {
			        resolve();
			      } else {
			        reject('Nombre muy corto!');
			      }
			    });
			  }
			}).then(function(result) {
				let token = $('input[name=_token]').val();
				$.ajax({
					url: "/areas",
					type: "POST",
					data: {
						_token: token,
						name: result,
						lat: userArea.position.lat(),
						lng: userArea.position.lng(),
					},
					success: function(result){
						swal('Comuna creada con éxito!',
							 'Ahora aparecera en sus futuras busquedas',
							  'success');
						$.when(getAllAreas()).done(function(areas){
							areaPolySelect.find('option').remove();
							fillSelectWithAreas(areas, areaPolySelect);
						});
						userArea.setMap(null);
						userArea = null;
					}
				});
			});
		}
		else if(userArea != null && userPolygon != null)
		{
			swal('Error',
				 'La applicación no encontro nueva comuna ni un nuevo polygono, '+
				 'si el problema persiste, contacte con un supervisor.',
				 'error');
			return;
		}
		savePolyBtn.hide();
		deletePolyBtn.hide();
		addPolyBtn.show();
		addAreaBtn.show();
	});
}