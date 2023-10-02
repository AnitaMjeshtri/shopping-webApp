<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
  
  //I need to explicitely dictate this, since laravel by defualt takes the plural of a name
  protected $table = 'product';
  
    use HasFactory;
    public function category(){
      return $this->belongsToMany(Category::class);
    }

    public function gallery(){
      return $this->hasMany(Gallery::class);
    }
}
