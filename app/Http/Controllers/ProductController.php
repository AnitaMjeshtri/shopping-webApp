<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function index(){
      $cards = Product::whereRaw('product_id = parent_id')->paginate(8);
      
      $childProducts = [];
      foreach($cards as $product){
        if($product->price === null){
          $childProduct = Product::where('parent_id', $product->parent_id)
          ->whereRaw('product_id != parent_id')->get()->first();
          $childProducts[] = $childProduct;
        }
      }

      return response()->json([
        'cards'=>$cards,
        'childrens'=>$childProducts,
        ]);
    }
}
