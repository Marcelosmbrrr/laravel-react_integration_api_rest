<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
// Models
use App\Models\Users\UserModel;
// Form Request
use App\Http\Requests\Authentication\LoginFormRequest;

class AuthController extends Controller
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

    /**
     * Logout.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request) : \Illuminate\Http\Response 
    {
        dd("logout");

        try{

            $request->user()->tokens()->delete();

            return response(["message" => "Logout successfully!"], 200);

        }catch(\Exception $e){

            return response(["error" => $e->getMessage()], 500);

        }

    }
}
