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


Route::middleware(["auth:sanctum"])->group(function(){
    Route::apiResource('/lvreact/admin', AdminController::class);
    Route::apiResource('/lvreact/my-profile', ProfileController::class);
    Route::post('/lvreact/logout', [LogoutController::class, 'logout']);
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/change-password-token', [ForgotPasswordController::class, 'getToken']);
Route::post('/change-password', [ForgotPasswordController::class, 'changePassword']);
    


