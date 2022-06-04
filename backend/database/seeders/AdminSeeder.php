<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Users\UserModel;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = UserModel::create([
            "name" => "Admin",
            "email" => "admin@gmail.com",
            "sex" => "M",
            "is_admin" => true,
            "password" => Hash::make(env('ADMIN_PASSWORD'))
        ]);

        $admin->telephone()->create([
            "user_id" => $admin->id
        ]);
    }
}
