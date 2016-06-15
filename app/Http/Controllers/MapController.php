<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Coordinate;
use App\Polygon;
use App\Area;
use App\Http\Requests;


class MapController extends Controller
{
    public function index(){
    	$areas = Area::all();
    	return view('index', compact('areas'));
    }

    public function getPolygons($id){
    	$polygons = Area::find($id)->polygons;

    	foreach ($polygons as $key => $polygon) {
    		$coordinates = Polygon::find($polygon->id)->coordinates;
            //$areaName = Polygon::find($polygon->id)
    		$polygon->coordinates = $coordinates;
    	}
    	
    	
    	return $polygons;
    }

    public function getArea($id){
        $area = Area::find($id);

        return $area;
    }

    public function edit(){
        $areas = Area::all();
        return view('edit', compact('areas'));
    }

    public function savePolygon(){
        return "retornado";
    }
}
