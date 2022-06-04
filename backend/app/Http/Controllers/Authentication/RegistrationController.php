<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Models
use App\Models\Users\UserModel;
// Form Request
use App\Http\Requests\Authentication\RegistrationFormRequest;

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
        try{

            DB::transaction(function () use ($request) {

                $new_user = UserModel::create([
                    "name" => $request->name,
                    "email" => $request->email,
                    "sex" => $request->sex,
                    "role_id" => 2,
                    "password" => Hash::make($request->password)
                ]);
    
                $new_user->telephone()->create([
                    "user_id" => $new_user->id
                ]);

            });

            return response(["message" => "Success!"], 201);

        }catch(\Exception $e){

            return response(["error" => $e->getMessage()], 500);

        }

    }
}
