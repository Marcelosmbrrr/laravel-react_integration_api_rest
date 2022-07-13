<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * Logout.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Redirect
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response("", 200);

    }
}
