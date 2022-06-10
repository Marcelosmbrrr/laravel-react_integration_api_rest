<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\UserModel;
use App\Models\Tokens\TokenModel;
use Illuminate\Support\Str;
// Form Request
use App\Http\Requests\Authentication\ChangePasswordByCodeRequest;

class ForgotPasswordController extends Controller
{

    /**
     * Get Token.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function getToken(Request $request) : \Illuminate\Http\Response {

        $validated = $request->validate([
            'email' => 'required|exists:users,email'
        ]);

        $user = UserModel::where('email', $request->email)->first();

        $user->token()->updateOrCreate(["token" => Str::random(5)]);

        // Enviar email para o usuário com o Token

        return response("", 200);

    }

    /**
     * Change Password.
     *
     * @param \App\Http\Requests\Authentication\ChangePasswordByCodeRequest $request
     * @return \Illuminate\Http\Response
     */
    public function changePassword(ChangePasswordByCodeRequest $request) : \Illuminate\Http\Response {

        $token = TokenModel::firstOrFail($request->code);

        $token->user()->update(["password" => $request->new_password]);

        // Enviar email para o usuário confirmando a alteração

        return response("", 200);

    }
}
