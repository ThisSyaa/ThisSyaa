<?php
// Melonggarkan waktu eksekusi
set_time_limit(60);

$storagePath = '/tmp/storage';
if (!is_dir($storagePath)) {
    mkdir($storagePath, 0777, true);
    mkdir("$storagePath/framework/views", 0777, true);
    mkdir("$storagePath/framework/cache", 0777, true);
    mkdir("$storagePath/framework/sessions", 0777, true);
    mkdir("$storagePath/bootstrap/cache", 0777, true);
    mkdir("$storagePath/logs", 0777, true);
}

touch('/tmp/database.sqlite');

// Beritahu Laravel jalur folder Vercel
$_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;
$_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);