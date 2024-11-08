<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event = Event::all();

        return response()->json([
            'result' => $event
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
    public function store(EventRequest $request)
    {
        try {
            if ($request->hasFile('event_image')) {
                $imageName = Str::random(10) . "." . $request->event_image->getClientOriginalExtension();
                Storage::disk('public')->put('events_images/' . $imageName, file_get_contents($request->event_image));
            }

            // dd($request->all());
            Event::create([
                'title' => $request->title,
                'description' => $request->description,
                'event_date' => $request->event_date,
                'event_time' => $request->event_time,
                'event_image' => $imageName,
            ]);

            return response()->json([
                'message' => "Event successfully created."
            ],200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => "Something went really wrong!"
                ],500);
            }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                'message' => 'This Event Not Found.'
            ], 404);
        }

        return response()->json([
            'event' => $event
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
    public function update(EventRequest $request, $id)
    {
        try {
            $event = Event::findOrFail($id);

              //echo "request : $request->name";
              $event->title = $request->title;
              $event->description = $request->description;
              $event->event_date = $request->event_date;
              $event->event_time = $request->event_time;
              if($request->event_image) {
                  $storage = Storage::disk('public');
                  if($storage->exists('events_images/' . $event->event_image))
                      $storage->delete('events_images/' . $event->event_image);

                  $imageName = Str::random(10). "." .$request->event_image->getClientOriginalExtension();
                  $event->event_image = $imageName;
                  $storage->put('events_images/'.$imageName, file_get_contents($request->event_image));
              }
        
              $event->save();
        
              return response()->json([
                  'message' => "Event successfully updated."
              ],200);
          } catch (\Exception $e) {
              return response()->json([
                  'message' => "Something went really wrong!"
              ],500);
          }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                'message' => 'This User Not Found.'
            ], 404);
        }

        $storage = Storage::disk('public');
        if($storage->exists('events_images/'.$event->user_image))
           $storage->delete('events_images/'.$event->user_image);

        $event->delete();

        return response()->json([
            'message' => "successfully deleted."
        ], 200);
    }
}
