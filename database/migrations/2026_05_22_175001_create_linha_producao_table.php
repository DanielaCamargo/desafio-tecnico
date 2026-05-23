<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinhaProducaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('linha_producoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('linha_id');
            $table->integer('mes');
            $table->integer('ano');
            $table->integer('quantidade_produzida')->default(0);
            $table->integer('quantidade_defeituosa')->default(0);
            $table->timestamps();

            $table->foreign('linha_id')
                ->references('id')
                ->on('linhas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('linha_producao');
    }
}
