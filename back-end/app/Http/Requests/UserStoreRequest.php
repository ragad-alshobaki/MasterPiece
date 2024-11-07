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
                'nat_id' => 'required|string|unique:users,nat_id|size:10',
                'full_name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                // 'password' => 'required|string|min:8|confirmed',
                'password' => 'required|string|min:8',
                'role' => 'required|string',
                'user_image' => 'nullable|image|mimes:jpeg,png,jpg',
                'dob' => 'required|date',
                'gender' => 'required|string'
            ];
        } else {
            return [
                'nat_id' => 'sometimes|string|size:10',
                'full_name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email',
                'password' => 'sometimes|string|min:8',
                'role' => 'sometimes|string',
                'user_image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg',
                'dob' => 'sometimes|date',
                'gender' => 'sometimes|string',
            ];
        }
    }
     
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'nat_id.required' => 'National ID is required!',
                'nat_id.regex' => 'National ID must contain only digits!',
                'nat_id.size' => 'National ID must be exactly 10 Numbers!',
                'full_name.required' => 'Full Name is required!',
                'email.required' => 'Email is required!',
                'email.email' => 'Please provide a valid email address!',
                'email.unique' => 'This email is already taken!',
                'password.required' => 'password is required!',
                'password.min' => 'Password must be at least 8 characters long!',
                // 'password.confirmed' => 'Passwords do not match!',
                'role.required' => 'Role field is required!',
                'user_image.mimes' => 'The image must be a file of type: jpeg, png, jpg .',
                'dob.required' => 'Date of birth is required!',
                'dob.date' => 'Please enter a valid date for Date of Birth!',
                'gender.required' => 'Select gender is required!'
            ];
        } else {
            return [
                'nat_id.filled' => 'National ID cannot be empty!',
                'nat_id.regex' => 'National ID must contain only digits!',
                'nat_id.size' => 'National ID must be exactly 10 Numbers!',
                'full_name.filled' => 'Full Name cannot be empty!',
                'full_name.max' => 'Full Name cannot be longer than 255 characters!',
                'email.filled' => 'Email cannot be empty!',
                'email.email' => 'Please provide a valid email address!',
                'password.min' => 'Password must be at least 8 characters long!',
                'role.filled' => 'Role cannot be empty!',
                'user_image.mimes' => 'The image must be a file of type: jpeg, png, jpg .',
                'dob.filled' => 'Date of birth cannot be empty!',
                'dob.date' => 'Please enter a valid date for Date of Birth!',
                'gender.filled' => 'Gender cannot be empty!',
            ];   
        }
    }
}
