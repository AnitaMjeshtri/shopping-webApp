<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SearchCarouselCardsController extends Controller
{
    public function SearchCarousel(){
      $cards = Product::whereRaw('product_id = parent_id')->take(10)->get();

      $childrens = [];

      foreach($cards as $card){
        if($card->price === null){
          $children = Product::where('parent_id', $card->product_id)->
          whereRaw('product_id != parent_id')->get()->first();

          $childrens[] = $children;
        }
        
      }

      return response()->json([
        'cards'=>$cards,
        'childrens'=>$childrens
      ]);
    }
}
