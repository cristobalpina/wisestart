@extends('layouts.app')
@section('scripts')
<script src="min/plugin-min.js"></script>
<script src="min/custom-min.js"></script>
<script src="js/gmaps.js"></script>
<script src="js/editMap.js"></script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDa8MJk2VV9QBkzjnEratB11lpuxkcxgyE&libraries=places&callback=initMap">
</script>
@endsection
@section('body')
<div id="map-section" class="section scrollspy">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <div class="container">
        <h2 class="header text_b">Editar Mapa</h2>
        <div class="row">
            <div class="col s12 m12">
                <div class="card" style="height: 400px">
                    <div id="map" class="card-content" style="height: 400px"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s3 m3">
                <select class="browser-default" id="area_polygon_select">
                </select>
            </div>
        </div>
    </div><!-- /container -->   
</div><!--/section-->
<div class="parallax-container">
    <div class="parallax"><img src="img/parallax1.png"></div>
</div>
<div class="section scrollspy">
    <div class="container">
        
    </div>
</div>
<div class="fixed-action-btn click-to-toggle" style="bottom: 45px; right: 24px;">
    <a class="btn-floating btn-large red">
        <i class="large material-icons">menu</i>
    </a>
    <ul>
        <li><button class="btn-floating green" id="save_polygon_btn" href="#map-section" style="display: none"><i class="material-icons">done</i></button></li>
        <li><a class="btn-floating red" id="delete_polygon_btn" href="#map-section" style="display: none"><i class="material-icons">delete</i></a></li>
        <li><a class="btn-floating yellow darken-1" id="add_area_btn" href="#map-section"><i class="material-icons">input</i></a></li>
        <li><a class="btn-floating blue"  id="add_polygon_btn" href="#map-section"><i class="material-icons">mode_edit</i></a></li>
    </ul>
</div>
@endsection