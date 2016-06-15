<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePolygonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('polygons', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
            $table->integer('area_id')->unsigned();
            $table->foreign('area_id')->references('id')->on('areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('polygons', function($table){
            $table->dropForeign('polygons_area_id_foreign');
            $table->drop('id');
        });
    }
}
