<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategoryModel;
use Illuminate\Http\Request;

class CategoryPageController extends Controller
{
    public function FetchCardsByCategory($categoryId){

      $productIds = ProductCategoryModel::where('category_id', $categoryId)->get(['product_id'])->unique('product_id');
      
      $cards = [];
      foreach($productIds as $productId){
        $card = Product::where('id', $productId['product_id'])->first();
        $cards[] = $card;
      }
      return $cards;
    }
}
