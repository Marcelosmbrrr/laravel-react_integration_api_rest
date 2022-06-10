<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
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
