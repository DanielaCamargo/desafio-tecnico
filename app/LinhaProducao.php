<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LinhaProducao extends Model
{
    protected $table = 'linha_producoes';

    protected $fillable = [
        'linha_id',
        'mes',
        'ano',
        'quantidade_produzida',
        'quantidade_defeituosa',
    ];

    protected $appends = [
        'produtividade'
    ];

    public function linha()
    {
        return $this->belongsTo(Linha::class);
    }

    public function getProdutividadeAttribute()
    {
        if ($this->quantidade_produzida <= 0) {
            return 0;
        }

        return round(
            (
                ($this->quantidade_produzida - $this->quantidade_defeituosa)
                / $this->quantidade_produzida
            ) * 100,
            2
        );
    }
}