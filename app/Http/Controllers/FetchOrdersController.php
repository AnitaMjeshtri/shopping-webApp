<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class FetchOrdersController extends Controller
{
    public function FetchOrders(){


      $orders = Orders::all();
      
      if($orders){
        return response()->json([
          'orders'=>$orders
          ]);
      }else{
        return response()->json(['error'=>'error occurred']);
      }
    }
    
}
