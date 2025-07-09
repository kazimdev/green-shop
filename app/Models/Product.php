<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'price', 'stock', 'status'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';


    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
