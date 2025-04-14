<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactInfoController extends Controller
{
    public function getContactInfo()
    {
        try {
            $contactInfo = ContactInfo::latest()->first();

            if (!$contactInfo) {
                // Return empty record with proper structure
                return response()->json(new ContactInfo(), 200);
            }

            return response()->json($contactInfo, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching contact info: ' . $e->getMessage());
            return response()->json([
                'error' => 'Error fetching contact information',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function createOrUpdateContactInfo(Request $request)
    {
        try {
            // Validate the request data if needed
            // $validated = $request->validate([...]);
            
            $contactInfo = ContactInfo::latest()->first();

            if ($contactInfo) {
                // Pass the validated data as an array to update()
                $contactInfo->update($request->all());
                return response()->json([
                    'message' => 'Contact info updated successfully',
                    'data' => $contactInfo
                ], 200);
            }

            // Create a new record with the request data
            $newContactInfo = ContactInfo::create($request->all());
            return response()->json([
                'message' => 'Contact info created successfully',
                'data' => $newContactInfo
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error saving contact info: ' . $e->getMessage());
            return response()->json([
                'error' => 'Error saving contact information',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}