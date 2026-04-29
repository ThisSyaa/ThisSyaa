<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// 1. Konfigurasi dan langsung CREATE aplikasinya di sini
$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create(); // <--- CREATE DI SINI

// 2. --- JURUS PAMUNGKAS VERCEL ---
// Karena aplikasi sudah di-create, fungsi useStoragePath() sekarang ADA!
if (isset($_ENV['VERCEL']) || isset($_SERVER['VERCEL'])) {
    $app->useStoragePath('/tmp/storage');
}
// ------------------------------

// 3. Kembalikan aplikasi yang sudah jadi
return $app;