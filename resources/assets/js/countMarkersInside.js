function countMarkersInside(polygon, markers){
	let markersInside = 0;
        for(let value of markers)
        {
            if(google.maps.geometry.poly.containsLocation(value.position, polygon))
            {
                markersInside++;
            }
        }
        return markersInside;
   }