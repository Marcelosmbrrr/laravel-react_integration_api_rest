<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// Models
use App\Models\Telephones\TelephoneModel;
use App\Models\Roles\RoleModel;
use App\Models\Tokens\TokenModel;

class UserModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $table = "users";
    protected $guarded = [];
    protected $hidden = ['password','remember_token'];
    protected $casts = ['email_verified_at' => 'datetime'];

    /**
    * Relationship with telephone table
    */
    function telephone(){
        return $this->hasOne(TelephoneModel::class, "user_id", "id");
    }

    /**
    * Relationship with roles table
    */
    function role(){
        return $this->belongsTo(RoleModel::class, "role_id", "id");
    }

    /**
    * Relationship with token table
    */
    function token(){
        return $this->hasOne(TokenModel::class, "user_id", "id");
    }
}
