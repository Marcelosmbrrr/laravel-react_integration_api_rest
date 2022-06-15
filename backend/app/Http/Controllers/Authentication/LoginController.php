<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Models
use App\Models\Users\UserModel;
// Form Request
use App\Http\Requests\Authentication\LoginFormRequest;

class LoginController extends Controller
{
    /**
     * Login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginFormRequest $request) : \Illuminate\Http\Response 
    {
        dd("login");
     
        if($user = Auth::attempt($request->only(["email", "password"]))){

            if(!empty(Auth::user()->email_confirmed_at)){
                return response(["message" => "O email precisa ser confirmado!"], 401);
            }

             // The sanctum token is created with a value that will be hashed
            $sanctum_token = $user->createToken(Str::random(10), ["isAdmin" => Auth::user()->isAdmin])->plainTextToken;

            return response(
                ["message" => "Acesso autorizado!", 
                "user" => UserModel::find(Auth::user()->id),
                "token" => $sanctum_token
                ]
            , 200);

        }else{

            return response(["message" => "Email ou senha incorretos!"], 401);

        }

    }
}