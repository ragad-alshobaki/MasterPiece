<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class  UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return response()->json([
            'result' => $users
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
    public function store(UserStoreRequest $request)
    {
        try {
            if ($request->hasFile('user_image')) {
                $imageName = Str::random(10) . "." . $request->user_image->getClientOriginalExtension();
                Storage::disk('public')->put('users_images/' . $imageName, file_get_contents($request->user_image));
            }

            // dd($request->all());
            User::create([
                'nat_id' => $request->nat_id,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                // 'user_image' => $imageName,
                'user_image' => $imageName ?? null,
                'dob' => $request->dob,
                'gender' => $request->gender
            ]);

            return response()->json([
                'message' => "User successfully created."
            ],200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => "Something went really wrong!"
                ],500);
            }

            // $userData = $request->validated();
            // $userData['password'] = Hash::make($request->password);

            // if ($request->hasFile('user_image')) {
            //     $imagePath = $request->file('user_image')->store('users_images', 'public');
            //     $userData['user_image'] = $imagePath;
            // }

            // if ($request->hasFile('user_image')) {
            //     $filename = time() . '.' . $request->file('user_image')->getClientOriginalExtension();
            //     $path = $request->file('user_image')->storeAs('users_images', $filename, 'public');
            // }
            
            // User::create($userData);

        //     return response()->json([
        //         'message' => "User successfully created."
        //     ], 200);
        // } catch (\Exception $e) {
        //     Log::error($e->getMessage());
        //     return response()->json([
        //         'message' => "Something went really wrong!"
        //     ], 500);
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $users = User::find($id);
        if (!$users) {
            return response()->json([
                'message' => 'This User Not Found.'
            ], 404);
        }

        return response()->json([
            'users' => $users
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
    public function update(UserStoreRequest $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            // $user = User::find($id);
            // if(!$user){
            //     return response()->json([
            //       'message'=>'This User Not Found.'
            //     ],404);
            //   }

              //echo "request : $request->name";
              $user->nat_id = $request->nat_id;
              $user->full_name = $request->full_name;
              $user->email = $request->email;
              if (!empty($request->password)) {
                $user->password = Hash::make($request->password);
            }
            
            //   $user->password = Hash::make($request->password);
              $user->role = $request->role;
              $user->dob = $request->dob;
              $user->gender = $request->gender;
        
              if($request->user_image) {
                  $storage = Storage::disk('public');
                  if($storage->exists('users_images/' . $user->user_image))
                      $storage->delete('users_images/' . $user->user_image);

                  $imageName = Str::random(10). "." .$request->user_image->getClientOriginalExtension();
                  $user->user_image = $imageName;
                  $storage->put('users_images/'.$imageName, file_get_contents($request->user_image));
              }
        
              $user->save();
        
              return response()->json([
                  'message' => "Data successfully updated."
              ],200);
          } catch (\Exception $e) {
              return response()->json([
                  'message' => "Something went really wrong!"
              ],500);
          }


            // $userData = $request->validated();
    
            // Hash the password only if it's provided in the request
            // if (!empty($userData['password'])) {
            //     $userData['password'] = Hash::make($request->password);
            // } else {
            //     unset($userData['password']);
            // }
    
            // Update image if a new file is provided
            // if ($request->hasFile('user_image')) {
                // Delete the old image if it exists
                // if ($user->user_image) {
                //     Storage::disk('public')->delete($user->user_image);
                // }
    
                // Store the new image
            //     $imagePath = $request->file('user_image')->store('users_images', 'public');
            //     $userData['user_image'] = $imagePath;
            // }
    
            // Update the user data
            // $user->update($userData);
    
        //     return response()->json([
        //         'message' => "User successfully updated."
        //     ], 200);
        // } catch (\Exception $e) {
        //     Log::error($e->getMessage());
        //     return response()->json([
        //         'message' => "Something went really wrong!"
        //     ], 500);
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'This User Not Found.'
            ], 404);
        }

        $storage = Storage::disk('public');
        if($storage->exists('users_images/'.$user->user_image))
           $storage->delete('users_images/'.$user->user_image);

        // if ($user->user_image) {
        //     Storage::disk('public')->delete($user->user_image);
        // }

        $user->delete();

        return response()->json([
            'message' => "successfully deleted."
        ], 200);
    }
}
