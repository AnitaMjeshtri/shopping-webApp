<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ProductCategoryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
  public function index(){
  
  $rows = Category::where('parent_id', null)->take(9)->get()->unique('name');

  // $routePaths = [];
  // foreach($rows as $row){
  //   $routePath = ProductCategoryModel::where('category_id', $row->id)->get(['route'])->unique('route');

  //   $routePaths[] = $routePath;
  // }
  
      return response()->json([
        'categories'=>$rows,
        // 'routePath' => $routePaths
      ]);
  }
}
