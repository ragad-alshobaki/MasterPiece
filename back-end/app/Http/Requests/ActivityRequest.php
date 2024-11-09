<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
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
                'title' => 'required|string',
                'description' => 'required|string|max:255',
                'activity_date' => 'required|date',
                'activity_time' => 'required|date_format:H:i', // HH:mm format
                'activity_image' => 'nullable|image|mimes:jpeg,png,jpg'
            ];
        } else {
            return [
                'title' => 'sometimes|string',
                'description' => 'sometimes|string|max:255',
                'activity_date' => 'sometimes|date',
                'activity_time' => 'sometimes|date_format:H:i',
                'activity_image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg'
            ];
        }
    }

    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'title.required' => 'Activity Title is required!',
                'description.required' => 'Activity Description is required!',
                'activity_date.required' => 'Activity Date is required!',
                'activity_date.date' => 'Please enter a valid date for Date of Activity!',
                'activity_time.required' => 'Time of activity is required!',
                'activity_time.date_format' => 'Please enter a valid time (HH:mm) for Activity!',
                'activity_image.mimes' => 'The image must be a file of type: jpeg, png, jpg .'
            ];
        } else {
            return [
                'title.filled' => 'Activity Title cannot be empty!',
                'description.filled' => 'Activityts Description cannot be empty!',
                'activity_date.filled' => 'Date of Activityt cannot be empty!',
                'activity_date.date' => 'Please enter a valid date for Date of Activityt!',
                'activity_time.filled' => 'Time of Activityts cannot be empty!',
                'activity_time.date_format' => 'Please enter a valid time (HH:mm) for Activityt!',
                'activity_image.mimes' => 'The image must be a file of type: jpeg, png, jpg .'
            ];   
        }
    }
}
