<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Site;
use App\Models\Equipment;
use App\Models\Three;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function getBlogs()
    {
        try {
            $blogs = Blog::orderBy('queue', 'desc')->get();

            return response()->json($blogs->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'name' => $blog->name,
                    'blog_type' => $blog->blog_type,
                    'startDate' => $blog->startDate,
                    'endDate' => $blog->endDate,
                    'guests' => $blog->guests,
                    'venue' => $blog->venue,
                    'video' => $blog->video,
                    'images' => $blog->images,
                    'tags' => $blog->tags,
                    'checkbox' => $blog->checkbox,
                    'cities' => $blog->cities,
                    'features' => $blog->features,
                    'queue' => $blog->queue,
                    'solution' => $blog->solution,
                    'title' => $blog->title,
                    'description' => $blog->description,
                    'keyword' => $blog->keyword,
                    'three_id' => $blog->three_id,
                    'site_id' => $blog->site_id,
                    'checked' => $blog->checked,
                    'eventTitle' => $blog->eventTitle,
                    'site_type' => $blog->site_type,
                    'equipment_type' => $blog->equipment_type
                ];
            }), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching data'], 400);
        }
    }

    public function getBlogByID($id)
    {
        try {
            $blog = Blog::with(['site', 'three'])->findOrFail($id);
            return response()->json($blog, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching data'], 400);
        }
    }

    public function insertBlog(Request $request)
    {
        // Check if blog with same name exists
        $existingBlog = Blog::where('name', $request->name)->first();
        if ($existingBlog) {
            return response()->json([
                'status' => 'error',
                'message' => 'Name already exists'
            ], 400);
        }

        $data = $request->all();

        // Handle video upload
        $data['video'] = $request->hasFile('video')
            ? uploadVideoOrImage($request->file('video'), 'blog')
            : null;

        // Handle images upload
        if ($request->hasFile('images')) {
            $filePath = [];
            foreach ($request->file('images') as $file) {
                $filePath[] = url('storage/' . $file->store('uploads/blog', 'public'));
            }
            $data['images'] = $filePath;
        } else {
            $data['images'] = [];
        }

        try {
            $blog = Blog::create($data);

            // Handle equipment relationship
            // if ($request->has('equipment') && is_array($request->input('equipment'))) {
            //     $blog->equipment()->attach($request->input('equipment'));
            // }

            $blog->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully saved!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error saving data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateBlog(Request $request, $id)
    {
        try {
            $blog = Blog::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $data = $request->all();
        $data['solution'] = $blog['solution'];

        if ($request->hasFile('images')) {
            if ($blog->images) {
                foreach ($blog->images as $oldImage) {
                    \Storage::disk('public')->delete(str_replace(url('storage') . '/', '', $oldImage));
                }
            }
            $filePaths = [];
            foreach ($request->file('images') as $file) {
                $filePaths[] = url('storage/' . $file->store('uploads/blog', 'public'));
            }
            $data['images'] = $filePaths;
        } else {
            $data['images'] = $blog->images;
        }

        if ($request->hasFile('video')) {
            if ($blog->video) {
                \Storage::disk('public')->delete(str_replace(url('storage') . '/', '', $blog->video));
            }
            $data['video'] = uploadVideoOrImage($request->file('video'), 'blog');
        } else {
            $data['video'] = $blog->video;
        }

        try {
            $blog->update($data);

            $blog->save();

            // if ($request->input('equipment')) {
            //     $oldEquipments = $blog->equipment;
            //     foreach ($oldEquipments as $oldEquip) {
            //         $oldEquip->blogs()->detach($blog->id);
            //     }
            //     foreach ($request->input('equipment') as $equipId) {
            //         $equipment = Equipment::find($equipId);
            //         if ($equipment) {
            //             $equipment->blogs()->attach($blog->id);
            //         }
            //     }
            // }

            return response()->json(['message' => 'Blog successfully updated!', 'blog' => $blog], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating blog data: ' . $e->getMessage()], 400);
        }
    }
    public function updateTagBlog(Request $request, $id)
    {
        try {
            $blog = Blog::findOrFail($id);

            // Validate the request
            // $request->validate([
            //     'tags' => 'required|array|[]',
            //     'tags.*' => 'string|""'
            // ]);

            // Update the tags
            $blog->tags = $request->tags;
            $blog->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Blog tags updated successfully',
                'data' => $blog
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Blog not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating blog tags'
            ], 500);
        }
    }

    public function deleteTagBlog(Request $request, $id)
    {
        try {
            $blog = Blog::findOrFail($id);

            // Validate the request
            $request->validate([
                'tags' => 'required|array',
                'tags.*' => 'string'
            ]);

            // Get current tags
            $currentTags = $blog->tags ?? [];

            // Remove the specified tags
            $updatedTags = array_values(array_diff($currentTags, $request->tags));

            // Update the blog with the new tags array
            $blog->tags = $updatedTags;
            $blog->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Tags removed successfully',
                'data' => $blog
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Blog not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting blog tags'
            ], 500);
        }
    }


    public function deleteBlog($id)
    {
        try {
            $blog = Blog::find($id);
            if (!$blog) {
                return response()->json(['error' => 'Blog not found'], 404);
            }

            // Detach equipment relationships
            // $blog->equipment()->detach();

            // Delete blog images
            if ($blog->images) {
                foreach (($blog->images) as $oldFile) {
                    \Storage::disk('public')->delete(str_replace(url('storage') . '/', '', $oldFile));
                }
            }

            // Delete video
            if ($blog->video) {
                \Storage::disk('public')->delete(str_replace(url('storage') . '/', '', $blog->video));
            }

            // Delete solution images
            if ($blog->solution) {
                foreach ($blog->solution as $block) {
                    if (isset($block['images']) && is_array($block['images'])) {
                        foreach ($block['images'] as $image) {
                            if (isset($image['image']) && !empty($image['image'])) {
                                \Storage::disk('public')->delete(
                                    str_replace(url('storage') . '/', '', $image['image'])
                                );
                            }
                        }
                    }
                }
            }

            // Delete the blog
            $blog->delete();
            return response()->json(Blog::all(), 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error deleting blog',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function insertSolution(Request $request, $id)
    {
        try {
            $blog = Blog::findOrFail($id);
            $solutionsArray = [];
            $serverUrl = url('/'); // Get server URL (http://localhost:8000)

            foreach ($request->solution as $blockIndex => $block) {
                $processedImages = [];

                if (isset($block['images']) && is_array($block['images'])) {
                    foreach ($block['images'] as $imageData) {
                        $imageInfo = [];

                        if (isset($imageData['image'])) {
                            if (is_file($imageData['image'])) {
                                $file = $imageData['image'];
                                $fileName = time() . '_' . $file->getClientOriginalName();

                                // Store the file
                                $file->storeAs('public/uploads/blog/solution', $fileName);
                                // Store full URL path including server URL
                                $imageInfo['image'] = $serverUrl . '/storage/uploads/blog/solution/' . $fileName;
                            } else {
                                // Keep existing URL as is
                                $imageInfo['image'] = $imageData['image'];
                            }
                        }

                        if ($blockIndex < 2 && isset($imageData['title'])) {
                            $imageInfo['title'] = $imageData['title'];
                        }

                        $processedImages[] = $imageInfo;
                    }
                }

                $solutionsArray[] = [
                    'content' => $block['content'] ?? '',
                    'images' => $processedImages
                ];
            }

            $blog->solution = $solutionsArray;
            $blog->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Solution inserted successfully',
                'data' => $blog->fresh()->solution  // No need to modify the URLs as they're already complete
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function swapBlogsQueue(Request $request)
    {
        DB::beginTransaction(); // Start a database transaction

        try {
            // Validate the request
            $request->validate([
                'firstBlogId' => 'required|exists:blogs,id',
                'secondBlogId' => 'required|exists:blogs,id'
            ]);

            // Get the two blogs
            $firstBlog = Blog::findOrFail($request->firstBlogId);
            $secondBlog = Blog::findOrFail($request->secondBlogId);

            // Temporarily disable foreign key checks (if needed)
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');

            // Generate a temporary ID that is guaranteed not to conflict
            $tempId = Blog::max('id') + 1; // Use the highest ID + 1 as a temporary ID

            // Swap the IDs
            $firstBlogId = $firstBlog->id;
            $secondBlogId = $secondBlog->id;

            // Update the first blog to the temporary ID
            $firstBlog->id = $tempId;
            $firstBlog->save();

            // Update the second blog to the first blog's ID
            $secondBlog->id = $firstBlogId;
            $secondBlog->save();

            // Update the first blog to the second blog's ID
            $firstBlog->id = $secondBlogId;
            $firstBlog->save();

            // Re-enable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            DB::commit(); // Commit the transaction

            return response()->json([
                'message' => 'Blog IDs swapped successfully',
                'blogs' => [
                    'first' => $firstBlog->fresh(),
                    'second' => $secondBlog->fresh()
                ]
            ]);
        } catch (\Exception $error) {
            DB::rollBack(); // Roll back the transaction on error
            \Log::error('Error swapping blog IDs: ' . $error->getMessage());
            return response()->json([
                'error' => 'Server error',
                'message' => $error->getMessage()
            ], 500);
        }
    }

    // public function insertSolution(Request $request, $id)
    // {
    //     try {
    //         $blog = Blog::findOrFail($id);

    //         // Delete existing solution images
    //         if ($blog->solution) {
    //             foreach ($blog->solution as $block) {
    //                 if (isset($block['images']) && is_array($block['images'])) {
    //                     foreach ($block['images'] as $image) {
    //                         if (isset($image['image']) && !empty($image['image'])) {
    //                             \Storage::disk('public')->delete(
    //                                 str_replace(url('storage') . '/', '', $image['image'])
    //                             );
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         // Process new solution
    //         $solutionsArray = [];
    //         $serverUrl = url('/');

    //         foreach ($request->solution as $blockIndex => $block) {
    //             $processedImages = [];

    //             if (isset($block['images']) && is_array($block['images'])) {
    //                 foreach ($block['images'] as $imageData) {
    //                     $imageInfo = [];

    //                     if (isset($imageData['image'])) {
    //                         if (is_file($imageData['image'])) {
    //                             $file = $imageData['image'];
    //                             $fileName = time() . '_' . $file->getClientOriginalName();
    //                             $file->storeAs('public/uploads/blog/solution', $fileName);
    //                             $imageInfo['image'] = $serverUrl . '/storage/uploads/blog/solution/' . $fileName;
    //                         } else {
    //                             $imageInfo['image'] = $imageData['image'];
    //                         }
    //                     }

    //                     if ($blockIndex < 2 && isset($imageData['title']) && !empty(trim($imageData['title']))) {
    //                         $imageInfo['title'] = $imageData['title'];
    //                     }

    //                     $processedImages[] = $imageInfo;
    //                 }
    //             }

    //             $solutionsArray[] = [
    //                 'content' => $block['content'] ?? '',
    //                 'images' => $processedImages
    //             ];
    //         }

    //         $blog->solution = $solutionsArray;
    //         $blog->save();

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Solution inserted successfully',
    //             'data' => $blog->fresh()->solution
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }


    public function getBlogsWithTags(Request $request)
    {
        $tagsValue = $request->query('tagsValue');
        $casesNum = $request->query('casesNum');
        // return($tagsValue);
        if (!$tagsValue) {
            return response()->json(['error' => 'tags value is required'], 400);
        }

        try {
            $blogs = Blog::whereJsonContains('tags', $tagsValue)->select('video', 'name', 'venue', 'id')->orderBy('queue', 'desc')->limit($casesNum)->get();
            return response()->json($blogs);
        } catch (\Exception $error) {
            \Log::error('Error fetching blogs: ', [$error]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function getBlogsWithCheckbox(Request $request)
    {
        $checkboxValue = $request->query('checkboxValue');
        $casesNum = $request->query('casesNum');

        if (!$checkboxValue) {
            return response()->json(['error' => 'Checkbox value is required'], 400);
        }

        try {
            $blogs = Blog::whereJsonContains('checkbox', $checkboxValue)->select('video', 'name', 'venue', 'id')->orderBy('queue', 'desc')->limit($casesNum)->get();
            return response()->json($blogs);
        } catch (\Exception $error) {
            \Log::error('Error fetching blogs: ', [$error]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function getBlogByType(Request $request)
    {
        $caseType = $request->query('caseType');
        try {
            $data = Blog::where('blog_type', $caseType)->select('video', 'name', 'venue')->limit(1)->get();
            return response()->json($data);
        } catch (\Exception $error) {
            return response()->json(['error' => 'Error fetching data'], 400);
        }
    }

    public function getBlogByBest(Request $request)
    {
        try {
            $data = Blog::where('checked', true)->orderBy('queue', 'desc')->get();
            return response()->json($data, 200);
        } catch (\Exception $error) {
            return response()->json(['error' => 'Error fetching data'], 400);
        }
    }
}
