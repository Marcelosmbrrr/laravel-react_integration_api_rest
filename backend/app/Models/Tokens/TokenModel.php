<?php

namespace App\Models\Tokens;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
// Models
use App\Models\Users\UserModel;

class TokenModel extends Model
{
    use HasFactory, Notifiable;

    public $table = "tokens";
    protected $primaryKey = 'user_id';
    public $timestamps = false;
    protected $guarded = [];

    /**
    * Relationship with user table
    */
    public function user(){
        return $this->belongsTo(UserModel::class, "user_id", "id");
    }

}
