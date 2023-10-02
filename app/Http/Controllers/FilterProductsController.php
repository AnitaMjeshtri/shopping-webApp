<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FilterProductsController extends Controller
{
  
    public function filterColore($coloreOption){
        $products = Product::where('colore', $coloreOption)->whereRaw('product_id = parent_id');
        $product = $products->paginate(8);

        $childProducts = [];
        foreach($product as $card){
          if($card->price === null){
            $childProduct = Product::where('parent_id', $card->parent_id)
            ->whereRaw('product_id != parent_id')->get()->first();
            $childProducts[] = $childProduct;
          }
        
        }
        return response()->json([
          'product' => $product,
          'children' => $childProducts
        ]);
    }

    public function filterMarche($marcheOption){
      $products = Product::where('marche', $marcheOption)->whereRaw('product_id = parent_id');
      $product = $products->paginate(8);

      $childProducts = [];
      foreach($product as $card){
        if($card->price === null){
          $childProduct = Product::where('parent_id', $card->parent_id)
          ->whereRaw('product_id != parent_id')->get()->first();
          $childProducts[] = $childProduct;
        }
      
      }
      return response()->json([
        'product' => $product,
        'children' => $childProducts
      ]);
      
    }

    public function filterPrice($priceOption){
      $products = Product::whereRaw("price <= {$priceOption}")->whereRaw('product_id = parent_id');
      $product = $products->paginate(8);
      $childProducts = [];
      foreach($product as $card){
        if($card->price === null){
          $childProduct = Product::where('parent_id', $card->parent_id)
          ->whereRaw('product_id != parent_id')->get()->first();
          $childProducts[] = $childProduct;
        }
      
      }
      return response()->json([
        'product' => $product,
        'children' => $childProducts
      ]);
    }
}
