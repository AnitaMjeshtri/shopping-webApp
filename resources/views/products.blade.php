@extends('layout')

@section('content')
{{-- <h1>{{$heading}}</h1> --}}

<div class="lg:grid lg:grid-cols-3 gap-4 space-y-4 md:space-y-0 mx-4 my-8 bg-custom-color p-5">

@if(count($products) == 0)
  <p>No products found</p>
@endif
@php $i = 0 @endphp
@foreach($products as $product)
 <div class="product-container relative bg-white transition transform hover:-translate-y-2 hover:shadow-lg md:my-8">
  <div class="product-card flex justify-center items-center ">
    <div class="object-cover mx-4 md:py-5">
      <a href="/products/{{$product['id']}}">
          <img class="hidden h-auto max-w-full md:block w-auto" src="{{$product['image_link']}}" alt="">
      </a>
    </div>
      <div class="product-card-content pt-4 overflow-hidden">
        <h2 class="text-2xl font-bold text-red-500">{{$product['price']}}</h2>
        <h2 class="text-2xl font-bold">{{$product['title']}}</h2>
    </div>
  </div>
    <div class="description-container overflow-hidden m-5 ">
          <p class="semi-bold text-red-500">{{$product['product_type']}}</p>
          <p class="overflow-hidden">{{$product['description']}}</p>
      </div>
</div>
  @if($i == 7)
    @break
  @else
    @php $i++ @endphp
@endif
@endforeach

</div>
@endsection