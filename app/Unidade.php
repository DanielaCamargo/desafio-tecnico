<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    protected $table = 'unidades';

    protected $fillable = [
        'unidade',
    ];

    public function linhas()
    {
        return $this->hasMany(Linha::class);
    }
}
