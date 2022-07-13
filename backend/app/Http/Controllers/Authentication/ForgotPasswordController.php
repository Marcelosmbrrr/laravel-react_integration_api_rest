<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\UserModel;
use App\Models\Tokens\TokenModel;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
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

        $token = Str::random(10);

        $user->token()->create(["token" => $token]);

        // Send email to user with the token

        return response(["message" => "Success! Check your email!"], 200);

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

        $token->delete();

       // Send email to user about the password change confirmation

        return response(["message" => "Success! Your password has been changed!"], 200);

    }
}
