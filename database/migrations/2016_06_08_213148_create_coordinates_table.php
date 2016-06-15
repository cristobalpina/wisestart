<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoordinatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coordinates', function(Blueprint $table){
            $table->increments('id');
            $table->double('lat');
            $table->double('lng');
            $table->timestamps();
            $table->integer('polygon_id')->unsigned();
            $table->foreign('polygon_id')->references('id')->on('polygons');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
         Schema::table('coordinates', function($table){
            $table->dropForeign('coordinates_polygon_id_foreign');
            $table->drop('id');
        });
    }
}
