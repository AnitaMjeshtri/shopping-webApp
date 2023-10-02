<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class CarouselProductController extends Controller
{
    public function index(){

      $user = Product::whereRaw('product_id != parent_id')->limit(5)->get()->unique('title');

      return response()->json($user);
    }
}
