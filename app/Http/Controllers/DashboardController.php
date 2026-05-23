<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Unidade;
use App\Linha;
use App\Services\LinhaService;

class DashboardController extends Controller
{
    public function index()
    {
        $unidades = Unidade::all();

        return view('dashboard', compact('unidades'));
    }

    public function buscarLinhas($unidadeId)
    {
        $linhas = Linha::where('unidade_id', $unidadeId)->get();

        return response()->json($linhas);
    }

    public function filtrarLinhas(Request $request, $unidadeId) 
    {
        try {
            $mes = $request->mes;
            $ano = $request->ano;
            $linhaId = $request->linha_id;

            $linhas = LinhaService::getByUnidade(
                $unidadeId,
                $mes,
                $ano,
                $linhaId
            );

            return response()->json($linhas);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function graficoLinhas(Request $request, $unidadeId) 
    {
        try {
            $mes = $request->mes;
            $ano = $request->ano;
            $linhaId = $request->linha_id;

            $linhas = LinhaService::getByUnidade(
                $unidadeId,
                $mes,
                $ano,
                $linhaId
            );

            $dados = $linhas->map(function ($linha) {
                $producao = $linha->producoes->first();

                return [
                    'linha' => $linha->linha,
                    'cor' => $linha->cor,
                    'produtividade' => $producao
                        ? $producao->produtividade
                        : 0
                ];
            });

            return response()->json($dados);

        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage()
            ], 500);

        }
    }
}
