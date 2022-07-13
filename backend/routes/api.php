<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Controllers
use App\Http\Controllers\Administration\AdminController;
use App\Http\Controllers\Authentication\LoginController;
use App\Http\Controllers\Authentication\LogoutController;
use App\Http\Controllers\Authentication\RegistrationController;
use App\Http\Controllers\Authentication\ForgotPasswordController;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\Actions\LoadAuthenticatedUserData;


Route::middleware(["auth:sanctum"])->group(function(){
    Route::apiResource('/admin', AdminController::class);
    Route::apiResource('/my-profile', ProfileController::class);
    Route::post('/load-user-data', LoadAuthenticatedUserData::class);
    Route::post('/logout', [LogoutController::class, 'logout']);
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/change-password-token', [ForgotPasswordController::class, 'getToken']);
Route::post('/change-password', [ForgotPasswordController::class, 'changePassword']);
    


