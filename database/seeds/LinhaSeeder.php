<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LinhaSeeder extends Seeder
{
    public function run()
    {
        $linhas = [
            [
                'linha' => 'Geladeira',
                'cor' => '#3B82F6'
            ],
            [
                'linha' => 'Máquina de Lavar',
                'cor' => '#22C55E'
            ],
            [
                'linha' => 'TV',
                'cor' => '#F59E0B'
            ],
            [
                'linha' => 'Ar-Condicionado',
                'cor' => '#EF4444'
            ]
        ];

        foreach ($linhas as $linha) {
            DB::table('linhas')->insert([
                'linha' => $linha['linha'],
                'cor' => $linha['cor'],
                'unidade_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
