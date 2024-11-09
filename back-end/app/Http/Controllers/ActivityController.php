<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activity = Activity::all();

        return response()->json([
            'result' => $activity
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            if ($request->hasFile('activity_image')) {
                $imageName = Str::random(10) . "." . $request->activity_image->getClientOriginalExtension();
                Storage::disk('public')->put('activities_images/' . $imageName, file_get_contents($request->activity_image));
            }

            // dd($request->all());
            Activity::create([
                'title' => $request->title,
                'description' => $request->description,
                'activity_date' => $request->activity_date,
                'activity_time' => $request->activity_time,
                // 'activity_image' => $imageName,
                'activity_image' => $imageName ?? null,
            ]);

            return response()->json([
                'message' => "Activity successfully created."
            ],200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => "Something went really wrong!",
                    'error' => $e->getMessage()
                ],500);
            }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json([
                'message' => 'This Activity Not Found.'
            ], 404);
        }

        return response()->json([
            'activity' => $activity
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $activity = Activity::findOrFail($id);

              $activity->title = $request->title;
              $activity->description = $request->description;
              $activity->activity_date = $request->activity_date;
              $activity->activity_time = $request->activity_time;

        if ($request->hasFile('activity_image')) {
            $storage = Storage::disk('public');

            if ($storage->exists('activities_images/' . $activity->activity_image)) {
                $storage->delete('activities_images/' . $activity->activity_image);
            }

            $imageName = Str::random(10) . "." . $request->activity_image->getClientOriginalExtension();
            $activity->activity_image = $imageName;
            $storage->put('activities_images/' . $imageName, file_get_contents($request->activity_image));
        }
        $activity->save();
        
        return response()->json([
            'message' => "Activity successfully updated."
        ],200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => "Something went really wrong!",
            'error' => $e->getMessage()
        ],500);
    }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json([
                'message' => 'This Activity Not Found.'
            ], 404);
        }

        $storage = Storage::disk('public');
        if($storage->exists('activities_images/' . $activity->activity_image))
           $storage->delete('activities_images/' . $activity->activity_image);

        $activity->delete();

        return response()->json([
            'message' => "successfully deleted."
        ], 200);
    }
}
