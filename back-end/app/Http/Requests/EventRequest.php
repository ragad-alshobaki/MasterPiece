<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
                'event_date' => 'required|date',
                'event_time' => 'required|date_format:H:i', // HH:mm format
                'event_image' => 'nullable|image|mimes:jpeg,png,jpg'
            ];
        } else {
            return [
                'title' => 'sometimes|string',
                'description' => 'sometimes|string|max:255',
                'event_date' => 'sometimes|date',
                'event_time' => 'sometimes|time',
                'event_image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg'
            ];
        }
    }

    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'title.required' => 'Events Title is required!',
                'description.required' => 'Events Description is required!',
                'event_date.required' => 'Date of Event is required!',
                'event_date.date' => 'Please enter a valid date for Date of Event!',
                'event_time.required' => 'Time of Events is required!',
                'event_time.date_format' => 'Please enter a valid time (HH:mm) for Event!',
                'user_image.mimes' => 'The image must be a file of type: jpeg, png, jpg .'
            ];
        } else {
            return [
                'title.filled' => 'Events Title cannot be empty!',
                'description.filled' => 'Events Description cannot be empty!',
                'event_date.filled' => 'Date of Event cannot be empty!',
                'event_date.date' => 'Please enter a valid date for Date of Event!',
                'event_time.filled' => 'Time of Events cannot be empty!',
                'event_time.date_format' => 'Please enter a valid time (HH:mm) for Event!',
                'user_image.mimes' => 'The image must be a file of type: jpeg, png, jpg .'
            ];   
        }
    }
}
