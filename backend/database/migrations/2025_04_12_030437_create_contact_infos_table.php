<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('contact_infos', function (Blueprint $table) {
            $table->id();

            // Address fields
            $table->text('team_office_address');
            $table->text('warehouse_address');

            // Office contacts (stored as JSON)
            $table->json('team_office_contact1');
            $table->json('team_office_contact2')->nullable();
            $table->json('team_office_contact3')->nullable();

            // Project manager contacts
            $table->json('project_manager_contact1');
            $table->json('project_manager_contact2')->nullable();
            $table->json('project_manager_contact3')->nullable();

            // Account manager contacts
            $table->json('account_manager_contact1');
            $table->json('account_manager_contact2')->nullable();
            $table->json('account_manager_contact3')->nullable();

            // Delivery manager contacts
            $table->json('delivery_manager_contact1');
            $table->json('delivery_manager_contact2')->nullable();
            $table->json('delivery_manager_contact3')->nullable();

            // Warehouse contacts
            $table->json('warehouse_contact1');
            $table->json('warehouse_contact2')->nullable();
            $table->json('warehouse_contact3')->nullable();

            // Travel manager contacts
            $table->json('travel_manager_contact1');
            $table->json('travel_manager_contact2')->nullable();
            $table->json('travel_manager_contact3')->nullable();

            // Rental hall manager contacts
            $table->json('rental_hall_manager_contact1');
            $table->json('rental_hall_manager_contact2')->nullable();
            $table->json('rental_hall_manager_contact3')->nullable();

            // Advertising manager contacts
            $table->json('advertising_manager_contact1');
            $table->json('advertising_manager_contact2')->nullable();
            $table->json('advertising_manager_contact3')->nullable();

            $table->timestamps(); // created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('contact_infos');
    }
};
