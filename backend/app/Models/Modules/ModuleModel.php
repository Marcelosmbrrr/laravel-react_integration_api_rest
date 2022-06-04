<?php

namespace App\Models\Modules;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Models
use App\Models\Pivot\ModuleRoleModel;

class ModuleModel extends Model
{
    use HasFactory;

    public $table = "modules";
    protected $guarded = [];

    /**
    * Relationship with modules_roles table
    */
    function modules_roles(){
        return $this->hasMany(ModuleRoleModel::class, "module_id", "id");
    }

}
