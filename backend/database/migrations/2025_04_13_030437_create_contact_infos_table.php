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
        Schema::table('contact_infos', function (Blueprint $table) {
            // Order manager contacts
            $table->json('order_manager_contact1');
            $table->json('order_manager_contact2')->nullable();
            $table->json('order_manager_contact3')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('contact_infos', function (Blueprint $table) {
            // Drop the columns if they exist
            $table->dropColumn('order_manager_contact1');
            $table->dropColumn('order_manager_contact2');
            $table->dropColumn('order_manager_contact3');
        });
    }
};
