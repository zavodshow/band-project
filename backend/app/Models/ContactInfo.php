<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    use HasFactory;

    protected $table = 'contact_infos';

    protected $fillable = [
        'team_office_address',
        'team_office_contact1',
        'team_office_contact2',
        'team_office_contact3',
        'project_manager_contact1',
        'project_manager_contact2',
        'project_manager_contact3',
        'account_manager_contact1',
        'account_manager_contact2',
        'account_manager_contact3',
        'delivery_manager_contact1',
        'delivery_manager_contact2',
        'delivery_manager_contact3',
        'warehouse_address',
        'warehouse_contact1',
        'warehouse_contact2',
        'warehouse_contact3',
        'travel_manager_contact1',
        'travel_manager_contact2',
        'travel_manager_contact3',
        'rental_hall_manager_contact1',
        'rental_hall_manager_contact2',
        'rental_hall_manager_contact3',
        'advertising_manager_contact1',
        'advertising_manager_contact2',
        'advertising_manager_contact3',
    ];

    protected $casts = [
        'team_office_contact1' => 'array',
        'team_office_contact2' => 'array',
        'team_office_contact3' => 'array',
        'project_manager_contact1' => 'array',
        'project_manager_contact2' => 'array',
        'project_manager_contact3' => 'array',
        'account_manager_contact1' => 'array',
        'account_manager_contact2' => 'array',
        'account_manager_contact3' => 'array',
        'delivery_manager_contact1' => 'array',
        'delivery_manager_contact2' => 'array',
        'delivery_manager_contact3' => 'array',
        'warehouse_contact1' => 'array',
        'warehouse_contact2' => 'array',
        'warehouse_contact3' => 'array',
        'travel_manager_contact1' => 'array',
        'travel_manager_contact2' => 'array',
        'travel_manager_contact3' => 'array',
        'rental_hall_manager_contact1' => 'array',
        'rental_hall_manager_contact2' => 'array',
        'rental_hall_manager_contact3' => 'array',
        'advertising_manager_contact1' => 'array',
        'advertising_manager_contact2' => 'array',
        'advertising_manager_contact3' => 'array',
    ];
}