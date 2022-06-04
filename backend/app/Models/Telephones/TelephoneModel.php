<?php

namespace App\Models\Telephones;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Models
use App\Models\Users\UserModel;

class TelephoneModel extends Model
{
    use HasFactory;

    public $table = "telephones";
    protected $fillable = ["*"];

    /**
    * Relationship with user table
    */
    function user(){
        return $this->belongsTo(UserModel::class, "user_id", "id");
    }
}
