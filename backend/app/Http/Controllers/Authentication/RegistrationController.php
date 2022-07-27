<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
// Models
use App\Models\Users\UserModel;
// Form Request
use App\Http\Requests\Authentication\RegistrationFormRequest;
// Notification
use App\Notifications\Authentication\RegistrationNotification;

class RegistrationController extends Controller
{
    /**
     * Registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(RegistrationFormRequest $request) : \Illuminate\Http\Response 
    {

        DB::transaction(function () use ($request) {

            $new_user = UserModel::create([
                "name" => $request->name,
                "email" => $request->email,
                "sex" => $request->sex,
                "is_admin" => false,
                "password" => Hash::make($request->password)
            ]);

            $new_user->telephone()->create([
                "user_id" => $new_user->id
            ]);

            $new_user->notify(new RegistrationNotification($new_user));

        });

        return response(["message" => "Success!"], 201); 

    }
}
