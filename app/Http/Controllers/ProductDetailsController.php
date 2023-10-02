<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Gallery;
use App\Models\Product;
use App\Models\ProductCategoryModel;
use Illuminate\Http\Request;

class ProductDetailsController extends Controller
{
    public function index($productId){
      $product = Product::find($productId);

      $productImages = Gallery::where('product_id', $productId)->get();

      $productCategory = ProductCategoryModel::where('product_id', $productId)->get();
      if(!$product && $productImages->empty() && $productCategory->empty()){
        return response()->json(['error'=>'product not found'], 404);
      }
      return response()->json([
        'product' => $product,
        'gallery' => $productImages,
        'category' => $productCategory
      ]);
    }

    public function show($productId){

      $productImages = Gallery::where('product_id', $productId)->get();

      if(!$productImages->empty()){
        return response()->json(['error'=>'product not found'], 404);
      }
      return response()->json([
        
        'gallery' => $productImages
      ]);
    }
}
