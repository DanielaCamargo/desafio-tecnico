<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Linha;

class LinhaProducaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $linhas = Linha::all();

        $anoInicial = 2024;
        $anoAtual = now()->year;
        $mesAtual = now()->month;

        foreach ($linhas as $linha) {

            for ($ano = $anoInicial; $ano <= $anoAtual; $ano++) {

                $limiteMes = ($ano == $anoAtual)
                    ? $mesAtual
                    : 12;

                for ($mes = 1; $mes <= $limiteMes; $mes++) {

                    $quantidadeProduzida = rand(100, 1000);

                    DB::table('linha_producoes')->insert([
                        'linha_id' => $linha->id,
                        'mes' => $mes,
                        'ano' => $ano,

                        'quantidade_produzida' => $quantidadeProduzida,

                        'quantidade_defeituosa' => rand(
                            1,
                            $quantidadeProduzida
                        ),

                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}