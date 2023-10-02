<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Test;
use Redirect,Response;
use Illuminate\Http\Request;
use Database\Seeders\xmlToJson;
class JsonController extends Controller
{
  public function index()
    {
      $seeders_instance = new xmlToJson();
      $xmlFile = realpath(__DIR__ . '/first-task-xml-file.xml');

      $parsedData= $seeders_instance->XMLtoJSON($xmlFile);
        
        $item = Product::create($parsedData);
  
        dd($item->data);
  
    }
}
