function colorByMarkers(polygon, markersInside){
            if(markersInside == 0)
            {
                polygon.setOptions({fillColor: "#33FFFF"})
            }
            else if(markersInside < 3)
            {
                polygon.setOptions({fillColor: "#33FF33"});
            }
            else if(markersInside < 5)
            {
                polygon.setOptions({fillColor: "#FFFF33"});
            }
            else if(markersInside < 8)
            {
                polygon.setOptions({fillColor: "#FF9933"});
            }
            else if(markersInside < 10)
            {
                polygon.setOptions({fillColor: "#FF3333"});
            }
            else
            {
               polygon.setOptions({fillColor: "#FF0000"}); 
            }
        }
