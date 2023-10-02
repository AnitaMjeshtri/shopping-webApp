<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SearchProductsController extends Controller
{
    public function search(Request $request){
      $query = $request->input('query');

      $productsQuery = Product::query();
      if($query){
        $productsQuery->where('title','LIKE', '%' . $query . '%');
      }

      $filtered = $productsQuery->whereRaw('product_id = parent_id')->get();

      $filteredChildProducts = [];
      foreach($filtered as $product){
        if($product->price === null){
          $childProduct = Product::where('parent_id', $product->parent_id)
          ->whereRaw('product_id != parent_id')->get()->first();
          $filteredChildProducts[] = $childProduct;
        }
      }
      return response()->json([
        'filtered' => $filtered,
        'filteredChildrens'=>$filteredChildProducts
        ]);
    }
}
