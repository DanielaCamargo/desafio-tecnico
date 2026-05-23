<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Desafio Técnico') }}</title>
        
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="bg-gray-200 h-screen antialiased leading-none">
        @include('components.navbar')
        <div class="grid grid-cols-1 lg:grid-cols-10 gap-4">
            <div class="lg:col-span-12 space-y-4">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 bg-gray-300 rounded-lg p-8 m-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Unidade
                        </label>
                        <select id="unidade_id" class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-300 focus:outline-none">
                            <option value="">Selecione</option>
                            @foreach ($unidades as $unidade)
                                <option value="{{ $unidade->id }}">
                                    {{ $unidade->unidade }}
                                </option>
                            @endforeach
                        </select>
                        <div id="warning-message"></div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2"> 
                            Mês
                        </label>
                        <select id="mes" class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-300 focus:outline-none">
                            @for ($mes = 1; $mes <= 12; $mes++)
                                <option value="{{ $mes }}" {{ $mes == now()->month ? 'selected' : '' }} >
                                    {{ \Carbon\Carbon::create()->locale('pt_BR')->month($mes)->translatedFormat('F') }}
                                </option>
                            @endfor
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Ano
                        </label>
                        <select id="ano" class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-300 focus:outline-none">
                            @for ($ano = 2024; $ano <= now()->year; $ano++)
                                <option value="{{ $ano }}" {{ $ano == now()->year ? 'selected' : '' }} >
                                    {{ $ano }}
                                </option>
                            @endfor
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Linha
                        </label>

                        <select id="linha_id" class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-300 focus:outline-none">
                            <option value="">
                                Selecione uma linha
                            </option>
                        </select>
                        <div>
                            <p class="text-sm text-gray-500 mt-1">
                                Selecione a unidade para carregar as linhas
                            </p>
                        </div>
                    </div>
                    <div>
                        <div class="block items-end justify-end mt-5">
                            <button id="btn-filtrar" class="w-full rounded-lg bg-gray-800 px-4 py-3 pb-4 text-white font-medium hover:bg-gray-700 transition duration-200">
                                Filtrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-5 bg-white rounded-2xl shadow-md border border-gray-200 p-6 m-4">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">
                        Linha
                    </h2>
                    <p class="text-sm text-gray-500 mt-1">
                        Produção, perdas e produtividade
                    </p>
                </div>
                <div id="dashboard-lista" class="mt-4"></div>
            </div>
            <div class="lg:col-span-7 bg-white rounded-2xl shadow-md border border-gray-200 p-6 m-4">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">
                            Eficiência por Linha
                        </h2>
                        <p class="text-sm text-gray-500 mt-1">
                            Comparativo de produtividade
                        </p>
                    </div>
                </div>
                <canvas id="graficoProdutividade"></canvas>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="{{ asset('js/dashboard.js') }}"></script>
    </body>
</html>
