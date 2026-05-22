<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LinhaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $linhas = [
            'Geladeira',
            'Máquina de Lavar',
            'TV',
            'Ar-Condicionado'
        ];

        foreach ($linhas as $linha) {
            $produzida = rand(100, 1000);
            $defeituosa = rand(1, $produzida);

            DB::table('linhas')->insert([
                'linha' => $linha,
                'unidade_id' => 1,
                'quantidade_produzida' => $produzida,
                'quantidade_defeituosa' => $defeituosa,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
