<?php

namespace App\Http\Requests\Authentication;

use Illuminate\Foundation\Http\FormRequest;

class LoginFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

   /**
    * Get the validation rules that apply to the request.
    *
    * @return array
    */
    public function rules() : array
    {
        return [
                'email' => 'bail|required|email',
                'password' => 'bail|required'
            ];  
    }

    /**
    * Get the error messages for the defined validation rules.
    *
    * @return array
    */
    public function messages() : array
    {
        return [
            'email.required' => 'O email precisa ser informado',
            'email.email' => 'Digite um endereço de e-mail válido',
            'password.required' => 'A senha precisa ser informada'
        ];
    }
}
