<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Linha extends Model
{
    protected $table = 'linhas';

    protected $fillable = [
        'unidade_id',
        'linha',
    ];

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }

    public function producoes()
    {
        return $this->hasMany(LinhaProducao::class);
    }

    public function getProducaoAtualAttribute()
    {
        return $this->producoes()
            ->where('mes', now()->month)
            ->where('ano', now()->year)
            ->first();
    }

    public function getUltimaProducaoAttribute()
    {
        return $this->producoes()
            ->orderByDesc('ano')
            ->orderByDesc('mes')
            ->first();
    }
}