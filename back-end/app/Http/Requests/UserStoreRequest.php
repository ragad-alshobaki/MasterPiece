<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if(request()->isMethod('post')) {
            return [
                'nat_id' => 'required|string|unique:users,nat_id|max:10',
                'full_name' => 'required|string|max:258',
                'email' => 'required|string',
                'password' => 'required|string',
                'role' => 'required|string',
                'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'dob' => 'required|date',
                'gender' => 'required|string'
            ];
        } else {
            return [
                'nat_id' => 'required|string|max:10',
                'full_name' => 'required|string|max:258',
                'email' => 'required|string',
                'password' => 'required|string',
                'role' => 'required|string',
                'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'dob' => 'required|string',
                'gender' => 'required|string'
            ];
        }
    }
     
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'nat_id.required' => 'National ID is required!',
                'full_name.required' => 'Full Name is required!',
                'email.required' => 'Email is required!',
                'password.required' => 'password is required!',
                'role.required' => 'Role field is required!',
                'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'dob.required' => 'Date of birth is required!',
                'gender.required' => 'Select gender is required!'
            ];
        } else {
            return [
                'nat_id.required' => 'National ID is required!',
                'full_name.required' => 'Full Name is required!',
                'email.required' => 'Email is required!',
                'password.required' => 'password is required!',
                'role.required' => 'Role field is required!',
                'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'dob.required' => 'Date of birth is required!',
                'gender.required' => 'Select gender is required!'
            ];   
        }
    }
}
