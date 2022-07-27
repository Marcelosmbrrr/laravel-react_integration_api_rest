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
// Notification
use App\Notifications\Authentication\SendTokenNotification;
use App\Notifications\Authentication\ChangePasswordNotification;

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

        $user = UserModel::where('email', $request->email)->firstOrFail();

        $token = Str::random(10);

        TokenModel::create(["user_id" => $user->id, "token" => $token]);

        $user->notify(new SendTokenNotification($user));

        return response(["message" => "Success! Check your email!"], 200);

    }

    /**
     * Change Password.
     *
     * @param \App\Http\Requests\Authentication\ChangePasswordByCodeRequest $request
     * @return \Illuminate\Http\Response
     */
    public function changePassword(ChangePasswordByCodeRequest $request) : \Illuminate\Http\Response {

        // Eager loading
        $user = TokenModel::with(["user" => function($query) {
            $query->get();
        }]);

        $user->update(["password" => $request->new_password]);

        $user->token()->delete();

        $user->notify(new ChangePasswordNotification($user));

        return response(["message" => "Success! Your password has been changed!"], 200);

    }
}
