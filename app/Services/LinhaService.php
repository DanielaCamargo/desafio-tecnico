<?php

namespace App\Services;

use App\Linha;

class LinhaService
{
    public static function getByUnidade($unidadeId, $mes, $ano, $linhaId = null) 
    {
        $query = Linha::where('unidade_id', $unidadeId);

        if ($linhaId) {
            $query->where('id', $linhaId);
        }

        return $query
            ->with([
                'unidade',
                'producoes' => function ($query) use (
                    $mes,
                    $ano
                ) {
                    $query
                        ->where('mes', $mes)
                        ->where('ano', $ano);
                }
            ])
            ->get();
    }
}