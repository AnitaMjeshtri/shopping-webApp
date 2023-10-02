<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\ProductCategoryModel;
use Illuminate\Database\Seeder;
use Database\Seeders\xmlToJson;
use Illuminate\Support\Carbon;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(5)->create();

        $seeders_instance = new xmlToJson();
        $xmlFile = realpath(__DIR__ . '/first-task-xml-file.xml');

        $parsedData= $seeders_instance->XMLtoJSON($xmlFile);
        foreach ($parsedData['channel']['item'] as $itemData) {
          $product = Product::create([
              'product_id' =>(int) $itemData['id'],
              'mpn' => is_numeric($itemData['mpn']) ? (int)$itemData['mpn'] : null,
              'price' => (is_array($itemData['price']) ? null : (float)$itemData['price']),
              'sale_price' => (is_array($itemData['sale_price']) ? null : (float)$itemData['sale_price']),
              'vip_price' => (is_array($itemData['vip_price']) ? null : (float)$itemData['vip_price']),
              'stock' => (is_array($itemData['stock']) ? 0 : (int)$itemData['stock']),
              'availability' => (is_array($itemData['availability']) ? '' : $itemData['availability']),
              'taglia' => (is_array($itemData['taglia']) ? implode(', ', $itemData['taglia']) : $itemData['taglia']),
              'parent_id' => (int)$itemData['parent_id'],
              'title' => (is_array($itemData['title']) ? '' : $itemData['title']),
              'description' => (is_array($itemData['description']) ? '' : $itemData['description']),
              'link' => (is_array($itemData['link']) ? '' : $itemData['link']),
              'image_link' => (is_array($itemData['image_link']) ? '' : $itemData['image_link']),
              'product_type' => (is_array($itemData['product_type']) ? '' : $itemData['product_type']),
              'eta' => (is_array($itemData['eta']) ? implode(', ', $itemData['eta']) : $itemData['eta']),
              'marche' => (is_array($itemData['marche']) ? '' : $itemData['marche']),
              'genere' => (is_array($itemData['genere']) ? '' : $itemData['genere']),
              'colore' => (is_array($itemData['colore']) ? '' : $itemData['colore']),
          ]);
          if (isset($itemData['categories']) && is_array($itemData['categories']['list'])) {
            $now = Carbon::now();
            foreach ($itemData['categories']['list'] as $categoryLevels) {
              $prevCategory = null;
              foreach(['category1', 'category2', 'category3'] as $categoryKey){
                
                if(!empty($categoryLevels[$categoryKey])){
                  $categoryId = (int)($categoryLevels[$categoryKey]['id']);
                  $categoryName = $categoryLevels[$categoryKey]['name'];
                    $category = Category::firstOrCreate([
                      'category_id' => $categoryId,
                      'name' => $categoryName,
                      'parent_id'=>$prevCategory ? $prevCategory->category_id : null,
                      'created_at' => $now,
                      'updated_at' => $now,
                  ]);

                    ProductCategoryModel::firstOrCreate([
                      
                      'product_id' => $product['id'],
                      'category_id' => $category['id'],
                      'route' => "/category/{$category['name']}"
                    ]);
                  
                  // }
                  $prevCategory = $category;
                  
                  
                  $product->category()->attach($category->id);
                }
              }
            }
        }
        
        if (isset($itemData['gallery']['image']) && is_array($itemData['gallery']['image'])) {
          foreach($itemData['gallery']['image'] as $imageData){

            $galleryImage = new Gallery([
              'image_link' => $imageData,
              'created_at' => now(),
              'updated_at' => now(),
            ]);
            $product->gallery()->save($galleryImage);
          }
        }

}
        // --------I AM USING A FACTORY INSTEAD---------------
        // Product::factory(6)->create();

    }
}
