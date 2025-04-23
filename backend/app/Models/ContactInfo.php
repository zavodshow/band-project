<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    use HasFactory;

    protected $table = 'contact_infos';

    protected $fillable = [
        'sections'
    ];

    protected $casts = [
        'sections' => 'array',
    ];
}
