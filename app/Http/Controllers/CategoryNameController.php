<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ProductCategoryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryNameController extends Controller
{
    public function index($categoryName){
      $rows = Category::where('name', $categoryName)->where('parent_id', null)->get()->unique('name');

      $secondCategories = [];
      $thirdCategories = [];
      foreach($rows as $row){
        $secondCategory = Category::where('parent_id', $row['category_id'])->get()->unique('name')->toArray();
        $secondCategories = array_merge($secondCategories, $secondCategory);

        foreach($secondCategory as $second){
        $thirdCategory = Category::where('parent_id', $second['category_id'])->get()->unique('name')->toArray();
        $thirdCategories = array_merge($thirdCategories, $thirdCategory);
      }
      }

      $mainCategoryId = Category::where('name', $categoryName)->first();
      $route = ProductCategoryModel::where('category_id', $mainCategoryId['id'])->get(['route'])->first();

      
      return response()->json([
        'secondRows' =>$secondCategories,
        'thirdRows' => $thirdCategories,
        'route' => $route
      ]);
    }
}
