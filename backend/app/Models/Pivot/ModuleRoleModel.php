<?php

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuleRoleModel extends Model
{
    use HasFactory;

    public $table = "modules_roles";
    protected $guarded = [];
    
}
