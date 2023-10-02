<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Prenatal</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

  <script type="module" src="{{ asset('/js/app.js') }}" defer></script>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/products.css') }}">
  <style>
    /* @tailwind base;
    @tailwind components;
    @tailwind utilities; */
    /* .bg-custom-color {
      background-color: #cbd5e1;
    }

    .product-card{
      position: relative;
    }
    .hover:shadow-lg {
      transition: box-shadow 0.3s;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    }
  .description-container {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.product-container:hover .description-container {
  height: auto;
  white-space: normal;
} */
  </style>
</head>
<body>

  <header>
  <div class="head flex justify-between m-4 ">
    <img src="{{ asset('images/prenatalIcon.png') }}" alt="profileIcon">
    <div class="input-group">
      <div class="form-outline">
        <input type="search" id="form1" class="form-control" />
        <label class="form-label" for="form1">Search</label>
      </div>
      <button type="button" class="btn btn-primary">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
  @yield('content')
  </header>
</body>
</html>