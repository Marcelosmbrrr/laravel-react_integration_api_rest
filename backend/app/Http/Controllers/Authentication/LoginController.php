<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
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
     
        $user = UserModel::where("email", $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){

            return response(["message" => "Invalid credentials!"], 401);

        }

        $role = $user->is_admin ? "admin" : "customer";

        $api_token = $user->createToken("token", ["role:{$role}"])->plainTextToken;

        return response([
            "user" => $user->name,
            "email" => $user->email,
            "role" => $role,
            "token" => $api_token
        ], 200);

    }
}
