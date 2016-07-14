@extends('layouts.app')
@section('scripts')


<script src="js/gmaps.js"></script>
<script src="js/area.js"></script>
<script src="js/generateReport.js"></script>
<script src="js/mapa.js"></script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDa8MJk2VV9QBkzjnEratB11lpuxkcxgyE&libraries=places&callback=initMap">
</script>

@endsection

@section('body')
<body id="top" class="scrollspy">

<!-- Pre Loader -->
<div id="loader-wrapper">
    <div id="loader"></div>

    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>

</div>

<!--Hero-->
<div class="section no-pad-bot" id="index-banner">
    <div class="container">
        <h1 class="text_h center header cd-headline letters type">
            <span>Me encanta</span>
            <span class="cd-words-wrapper waiting">
                <b class="is-visible">Innovar</b>
                <b>poner mi negocio</b>
                <b>Peñalolén</b>
                <b>EmprendeYA!</b>
            </span>
        </h1>
    </div>
</div>

<!--Intro and service-->
<div id="intro" class="section scrollspy">
    <div class="container">
        <div class="row">
            <div class="col s12">
                <h2 class="center header text_h2"> Con EmprendeYA! encontrarás toda la <span
                            class="span_h2"> información</span> territorial que <span class="span_h2"> necesitas</span>
                    antes de <span class="span_h2"> comenzar </span> con tu negocio. </h2>
            </div>

            <div class="col s12 m4 l4">
                <div class="center promo promo-example">
                    <i class="mdi-social-public"></i>
                    <h5 class="promo-caption">Información Sectorizada</h5>
                    <p class="light center">Obtén la información por sectores de terreno. Nivel de competencia,
                        regulación actual, etc..</p>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="center promo promo-example">
                    <i class="mdi-social-group"></i>
                    <h5 class="promo-caption"> Diseñado para emprendedores</h5>
                    <p class="light center">Nustro objetivo es darle a nuevos emprendedores con ganas de instalar algún
                        tipo de negocio toda la información importante que deberían saber antes de tomar alguna
                        decisión..</p>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="center promo promo-example">
                    <i class="mdi-hardware-desktop-windows"></i>
                    <h5 class="promo-caption">Totalmente Web</h5>
                    <p class="light center">Sin instalaciones de programas difíciles de usar. Diseñado para que el
                        usuario pueda usarlo sin ayuda de terceros.</p>
                </div>
            </div>
        </div>
    </div>
</div>



<!--Work-->
<div class="section scrollspy" id="work">
    <div class="container">
        <h2 class="header text_b">Mapa</h2>
        <div class="row">
             <div class="col s12 m4">
                <h4 class="header text_b">Comuna</h4>
                <select class="browser-default" id="area">
                    <option disabled selected>Elige una opción</option>
                    @foreach($areas as $area)
                        <option value="{{$area->id}}">{{$area->name}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col s12 m4">
                <h4 class="header text_b">Elige tu rubro</h4>
                <div class="input-field">
                    <select disabled class="browser-default" id="type">
                        <option value="0" disabled selected>Elige una opción</option>
                        <option value="bank">Banco</option>
                        <option value="store">Tienda de servicio</option>
                        <option value="car_rental">Car Rental</option>
                        <option value="gym">Gimnasio</option>
                        <option value="pharmacy">Farmacia</option>
                    </select>
                </div>
            </div>
            <div class="col s12 m4">
                <h4 class="header text_b">Tráfico</h4>
                <select class="browser-default" id="traffic">
                    <option value="0" selected>Ninguno</option>
                    <option value="auto">Automóviles</option>
                    <option value="bici">Bicicletas</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m12">
                <div class="card" style="height: 400px">
                    <div id="map" class="card-content" style="height: 400px"></div>
                </div>
            </div>
        </div>
            <!-- Plan regulador => http://transparencia.penalolen.cl/06_Actos_y_Resoluciones_con_Efectos_Sobre_Terceros/08_Plan_Regulador/plan_regulador.html -->
    </div>
</div><!--/section-->



<!--Parallax-->
<div class="parallax-container">
    <div class="parallax"><img src="img/parallax1.png"></div>
</div>

@include('partials.team')
@include('modals.report_modal')

</body>
@endsection