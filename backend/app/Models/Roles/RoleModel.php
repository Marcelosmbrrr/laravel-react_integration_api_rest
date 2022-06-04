<?php

namespace App\Models\Roles;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Models
use App\Models\Pivot\ModuleRoleModel;
use App\Models\Users\UserModel;

class RoleModel extends Model
{
    use HasFactory;

    public $table = "roles";
    protected $guarded = [];

    /**
    * Relationship with user table
    */
    function user(){
        return $this->hasOne(TelephoneModel::class, "user_id", "id");
    }

    /**
    * Relationship with modules_roles table
    */
    function modules_roles(){
        return $this->hasMany(ModuleRoleModel::class, "role_id", "id");
    }
}
