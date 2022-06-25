<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
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
     
        if(Auth::attempt($request->only(["email", "password"]))){

            $user = UserModel::findOrFail(Auth::user()->id);

            // The sanctum token is created with a value that will be hashed
            $role = Auth::user()->isAdmin ? "admin" : "user";
            $sanctum_token = $user->createToken(Str::random(10), ["role" => $role])->plainTextToken;

            return response(
                ["message" => "Acesso autorizado!", 
                "user" => Auth::user()->id,
                "isAdmin" => Auth::user()->isAdmin,
                "token" => $sanctum_token
                ]
            , 200);

        }else{

            return response(["message" => "Email ou senha incorretos!"], 401);

        }

    }
}
