<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class TagliaController extends Controller
{
    public function index($parentId, $productTaglia){
      
      $decodedProductTaglia = urldecode($productTaglia);
      // var_dump($decodedProductTaglia);

      $card = Product::where('parent_id', $parentId)
      ->where('product_id', '!=', $parentId)
      ->whereRaw('REPLACE(LOWER(taglia), " ", "") LIKE ?', ["%" . str_replace(" ", "", strtolower($decodedProductTaglia)) . "%"])
      ->get();
  

    return response()->json($card);
    }
}
