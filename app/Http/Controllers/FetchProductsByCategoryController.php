<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductCategoryModel;
use Illuminate\Http\Request;

class FetchProductsByCategoryController extends Controller
{
    public function FetchProductsFromCategory($categoryRoute){
      
      $route = ('/category/').($categoryRoute);

      $categories = ProductCategoryModel::where('route', $route)->paginate(8);

      $products = [];
      foreach($categories as $category){
        $product = Product::where('id', $category->product_id)
        ->whereRaw('product_id = parent_id')->first();
        if($product!==null && !in_array($product, $products)){
          $products[] = $product;
        }
        
      }


      $childrens = [];
      foreach($products as $product){
        if($product->price === null){
          $children = Product::where('parent_id', $product->parent_id)->whereRaw('product_id != parent_id')->first();
          $childrens[] = $children;
        }
        
      }

      
      return response()->json([
        'childrens' => $childrens,
        'categories' => $categories,
        'products' => $products
      ]);
    }
}
