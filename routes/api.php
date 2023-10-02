<?php

use App\Http\Controllers\SearchCarouselCardsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarouselProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryNameController;
use App\Http\Controllers\CategoryPageController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FetchOrdersController;
use App\Http\Controllers\FetchProductsByCategoryController;
use App\Http\Controllers\FilterProductsController;
use App\Http\Controllers\FindCategoryIdController;
use App\Http\Controllers\NewsletterSubscriptionController;
use App\Http\Controllers\ordersController;
use App\Http\Controllers\OrdersController as ControllersOrdersController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\ProductGalleryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SearchProductsController;
use App\Http\Controllers\SubCategoryNameController;
use App\Http\Controllers\TagliaController;
use Database\Factories\CategoryFactory;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->group(function() {
  Route::get('/user', function (Request $request) {
      return $request->user();
  });
  Route::post('/logout', [AuthController::class, 'logout']);
});


// Route::group(['middleware' => 'api', 'prefix' => 'auth'], function($router){
    // Route::post('/register', 'App\Http\Controllers\AuthController@register');
    Route::post('/signup',[AuthController::class,'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/search', [SearchProductsController::class, 'search']);
    Route::get('/carouselProduct',[CarouselProductController::class, 'index']);
    Route::post('/sendMail', [EmailController::class, 'index']);
    Route::get('/products/{productId}',[ProductDetailsController::class, 'index']);
    Route::get('/products/{productId}/images', [ProductDetailsController::class, 'show']);
    Route::get('/products/{parentId}/{productTaglia}', [TagliaController::class, 'index']);
    Route::get('/products/{productId}/{productImage}/{productTitle}/{tagliaPrice}/{taglia}', [OrdersController::class, 'index'])
    ->where('productTitle', '.*')->where('productImage', '.*');
    Route::get('/orders', [FetchOrdersController::class, 'FetchOrders']);
    Route::get('/categories',[CategoryController::class, 'index']);
    Route::get('/categories/{categoryName}', [CategoryNameController::class, 'index']);
    Route::get('/colore/{coloreOption}', [FilterProductsController::class, 'filterColore']);
    Route::get('/marche/{marcheOption}', [FilterProductsController::class, 'filterMarche']);
    Route::get('/price/{priceOption}', [FilterProductsController::class, 'filterPrice']);
    Route::get('/searchCarousel', [SearchCarouselCardsController::class, 'SearchCarousel']);
    Route::get('/category/{categoryId}', [CategoryPageController::class, 'FetchCardsByCategory']);
    Route::get('/categoryProducts/category/{categoryRoute}', [FetchProductsByCategoryController::class, 'FetchProductsFromCategory']);
// });