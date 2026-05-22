<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUnidadeIdToLinhasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('linhas', function (Blueprint $table) {
            $table->unsignedBigInteger('unidade_id')->after('id');

            $table->foreign('unidade_id')
                ->references('id')
                ->on('unidades')
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
        Schema::table('linhas', function (Blueprint $table) {
            $table->dropForeign(['unidade_id']);
            $table->dropColumn('unidade_id');
        });
    }
}
