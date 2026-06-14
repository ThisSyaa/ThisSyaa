<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Syaaxi · Fullstack Developer') }}</title>

        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <script>try{document.documentElement.dataset.intensity=localStorage.getItem('syaaxi-intensity')||'balanced'}catch(e){document.documentElement.dataset.intensity='balanced'}</script>

        <!-- Fonts: UnifrakturCook + Grenze Gotisch (blackletter display) + Outfit (body) -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=grenze-gotisch:400,600,700,900|unifrakturcook:700|outfit:300,400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
