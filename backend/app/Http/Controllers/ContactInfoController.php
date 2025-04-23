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
                // Return empty array when no data exists
                return response()->json([], 200);
            }

            // Return the sections data directly
            return response()->json($contactInfo->sections, 200);
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
            // Validate the request data
            $request->validate([
                'sections' => 'required|array',
            ]);

            $data = [
                'sections' => $request->all()
            ];

            $contactInfo = ContactInfo::latest()->first();

            if ($contactInfo) {
                $contactInfo->update($data);
                return response()->json([
                    'message' => 'Contact info updated successfully',
                    'data' => $contactInfo->sections
                ], 200);
            }

            // Create a new record with the request data
            $newContactInfo = ContactInfo::create($data);
            return response()->json([
                'message' => 'Contact info created successfully',
                'data' => $newContactInfo->sections
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
