<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel Ecom') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen bg-gray-100">
        @include('layouts.navigation')

        <!-- Page Content -->
        <main>
            <div class="py-4">
                <div class="sm:px-6 lg:px-8">
                    <div class="bg-white p-4 overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="flex w-full">
                            <div class="w-1/4">
                                @include('components.admin-sidenav')
                            </div>

                            <div class="w-3/4">
                                <div class="py-3">
                                    @yield('title')
                                </div>
                                @yield('content')
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>

        <footer class="bg-white py-6 px-4 sm:px-6 lg:px-8">
            <p class="text-center">&copy; 2025 | GreenShop - All rights reserved.</p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <script>
        var deleteButtons = document.querySelectorAll("a.delete-btn");

        if (deleteButtons.length) {
            deleteButtons.forEach(function(button, i) {
                button.addEventListener("click", function(e) {
                    e.preventDefault();

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        confirmButtonColor: '#d33',
                        cancelButtonText: 'No, Keep it.',
                        cancelButtonColor: '#3085d6',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = e.target.href;
                        }
                    });
                });
            });
        }
    </script>
</body>

</html>