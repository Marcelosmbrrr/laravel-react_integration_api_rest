<?php

namespace App\Http\Controllers\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoadAuthenticatedUserData extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return response([
            "name" => Auth::user()->name,
            "email" => Auth::user()->email,
            "isAdmin" => Auth::user()->is_admin
        ], 200);
    }
}
