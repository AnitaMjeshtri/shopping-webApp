<?php

namespace Database\Seeders;
use App\Models\Product;
use Exception;

class xmlToJson{
function XMLtoJSON($xmlFile):array{
  header('Content-type: application/json');

  $xmlFileContent = simplexml_load_file($xmlFile, 'SimpleXMLElement', LIBXML_NOCDATA);
  
    $json_encoded = json_encode($xmlFileContent, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $array = json_decode($json_encoded,true);
    
    return $array;
}


function call(){
  $jsonOutput = $this->XMLtoJSON(realpath(__DIR__ . '/first-task-xml-file.xml'));
  if($jsonOutput !== false){
  // var_dump($jsonOutput);
}
}
}

$xmlToJsonInstance = new xmlToJson();
$xmlToJsonInstance->call();