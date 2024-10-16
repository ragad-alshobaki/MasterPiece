<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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
        ],200);
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
            // if ($request->user_image) {
            //     $file = $request->user_image;
            //     $extension = $request->user_image->getClientOriginalExtension();
            //     $user_imageFileName = time() . '.' . $extension;
            //     $path = 'uploads/user_image';
            //     $file->move($path, $user_imageFileName);
            // }
            User::create([
                'nat_id' => $request->nat_id,
                'full_name' => $request->full_name,
                'email' => $request->email,
                // 'password' => $request->password,
                'password' => Hash::make($request->password),
                // 'password' => Hash::make($request->input('password')),
                // 'password' => bcrypt($request->password),
                'role' => $request->role,
                'user_image' => $request->user_image,
                // 'user_image' => 'uploads/user_image' . $user_imageFileName,
                'dob' => $request->dob,
                'gender' => $request->gender,
            ]);
            return response()->json([
                'message' => "User successfully created."
            ],200);
        } catch (\Exception $e) {
            Log::error($e->getMessage()); // Log the exception
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
       $users = User::find($id);
       if(!$users){
         return response()->json([
            'message'=>'This User Not Found.'
         ],404);
       }
       
       return response()->json([
          'users' => $users
       ],200);
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
            $users = User::find($id);
            if(!$users){
              return response()->json([
                'message'=>'This User Not Found.'
              ],404);
            }
       
            //echo "request : $request->image";
            $users->nat_id = $request->nat_id;
            $users->full_name = $request->full_name;
            $users->email = $request->email;
            // $users->password = $request->password;
            $users->password = Hash::make($request->password);
            $users->role = $request->role;
            $users->dob = $request->dob;
            $users->gender = $request->gender;

            // Handle image upload and replace old image
            // $user_imageFileName = $this->uploadFile($request->file('user_image'), 'user_image');

            $users->save();
       
            return response()->json([
                'message' => "successfully updated."
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!",
                "exception" => $e
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $users = User::find($id);
        if(!$users){
          return response()->json([
             'message'=>'This User Not Found.'
          ],404);
        }
         
        $users->delete();
        
        return response()->json([
            'message' => "successfully deleted."
        ],200);
    }
}
