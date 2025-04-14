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
            $contactInfo = ContactInfo::latest()->first();

            if ($contactInfo) {
                $contactInfo->update($validatedData);
                return response()->json([
                    'message' => 'Contact info updated successfully',
                    'data' => $contactInfo
                ], 200);
            }

            $newContactInfo = ContactInfo::create($validatedData);
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
