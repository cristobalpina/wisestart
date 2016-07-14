@extends('layouts.app')
@section('scripts')
@endsection
@section('body')
<div id="map-section" class="section scrollspy">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <div class="container">
        <h2 class="header text_b">Editar Poligono</h2>
        Contenido en próximas versiones.
     </div><!-- /container -->   
</div><!--/section-->
@include('partials.parallax')
<div class="section scrollspy">
    <div class="container">
        
    </div>
</div>
@endsection