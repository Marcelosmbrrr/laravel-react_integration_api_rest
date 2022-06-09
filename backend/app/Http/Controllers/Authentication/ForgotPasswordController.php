<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\UserModel;
use App\Models\Tokens\TokenModel;

class ForgotPasswordController extends Controller
{

    /**
     * Get Token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getToken(Request $request) : \Illuminate\Http\Response {

        dd("getToken");

        $user = UserModel::where('email', $request->email)->firstOrFail();

        // Checar se já existe um token
        // Se existir, fazer updateOrCreate
        // Enviar email para o usuário com o Token

    }

    /**
     * Change Password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request) : \Illuminate\Http\Response {

        dd("changePassword");

        $token = TokenModel::firstOrFail($request->code);

        $token->user()->update($request->only["new_password"]);

        // Checar se existe o token 
        // Atualizar a senha do usuário vinculado ao token

    }
}
