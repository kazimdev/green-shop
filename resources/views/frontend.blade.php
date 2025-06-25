<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Green Shop</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <header class="relative bg-gray-100 dark:bg-gray-900 py-2">
        <div class="container mx-auto flex items-top justify-between sm:items-center sm:pt-0">
            <div class="logo">
                <h1> Green Shop </h1>
            </div>

            <form class="search w-1/3" method="GET">
                <input type="text" name="shop_search" id="shop_search" placeholder="Search..." class="block border rounded border-gray-300 w-full">
            </form>

            @if (Route::has('login'))
            <div class="hidden px-6 py-4 sm:block">
                @auth
                <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline">Dashboard</a>
                @else
                <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>

                @if (Route::has('register'))
                <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                @endif
                @endauth
            </div>
            @endif
        </div>
    </header>

    <div class="flex justify-center items-center max-w-6xl mx-auto min-h-[80vh] sm:px-6 lg:px-8 sm:py-8 lg:py-16">
        <div class="w-1/2">
            <h1 class="text-4xl uppercase mb-3">Shop With Confidence</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus labore sequi nesciunt culpa aperiam quasi dolor odit cumque quibusdam reprehenderit tempore id minima accusamus, praesentium rerum vero tenetur numquam eligendi.</p>

            <a href="/shop" class="inline-block mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Shop Now</a>
        </div>

        <div class="w-1/2">
            <img src="https://picsum.photos/600/600" alt="" srcset="" width="600" class="mx-auto rounded-lg">
        </div>
    </div>

    <footer>
        <div class="flex justify-center my-2 sm:items-center sm:justify-center">
            <div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
            </div>
        </div>
    </footer>
</body>

</html>