var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

	mix.copy('node_modules/sweetalert2/dist/sweetalert2.min.js', 'resources/assets/js/libs')
	   .copy('node_modules/sweetalert2/dist/sweetalert2.min.css', 'resources/assets/css/libs')
       

       .sass('app.scss')
       
       

       .scripts([
       		'libs/sweetalert2.min.js'
       	],
       		 'public/js/nodeModules.js')
       
       .styles([
       		'libs/sweetalert2.min.css'
       		],
       		'public/css/nodeModules.css')
       .babel([
       		'setOnMap.js',
       		'getPolygonsBy.js',
       		'colorByMarkers.js',
       		'countMarkersInside.js',
                     'getAreaBy.js',
                     'getAllAreas.js',
                     'fillSelectWithAreas.js',
       	]);
});
