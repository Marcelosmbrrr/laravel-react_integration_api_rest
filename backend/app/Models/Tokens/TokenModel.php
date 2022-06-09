<?php

namespace App\Models\Tokens;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Models
use App\Models\Users\UserModel;

class TokenModel extends Model
{
    use HasFactory;

    public $table = "tokens";
    protected $timestamps = false;

    /**
    * Relationship with user table
    */
    public function user(){
        return $this->belongsTo(UserModel::class, "user_id", "id");
    }

}
