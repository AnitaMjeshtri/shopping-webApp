<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function index($productId,$productImage, $productTitle, $tagliaPrice, $taglia){

      $member = Orders::where('product_id', $productId)->first();

      $decodeTitle = urldecode($productTitle);
      var_dump('taglia-controller', $taglia);

      if($member){
        return response()->json('error');
      }
      $card = Orders::create([
        'product_id' =>(int)$productId,
        'image_link' => $productImage,
        'title' => $decodeTitle,
        'price' =>(float) $tagliaPrice,
        'taglia' =>$taglia,
      ]);

      if($card){
        return response()->json(['message'=>'successfully registered'],200);
      }else{
        return response()->json(['error'=>'couldnt register'], 422);
      }

      
    }
}
