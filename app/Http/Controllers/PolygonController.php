<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Coordinate;
use App\Polygon;
use App\Area;
use App\Http\Requests;

class PolygonController extends Controller
{
    public function store(Request $request){
    	$path = $request->input('path');
    	$area_id = $request->input('area');
    	$area = Area::find($area_id);


    	$polygon = new Polygon;
    	$polygon->area()->associate($area);
    	$polygon->save();
    	
    	foreach ($path as $key => $vertex) {
	    	$coordinate = new Coordinate;
	 		$coordinate->lat = $vertex['lat'];
	 		$coordinate->lng = $vertex['lng'];
	 		
	 		$coordinate->polygon()->associate($polygon);
	 		$coordinate->save();
    	}
    }
}
