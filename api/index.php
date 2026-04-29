<?php

// Melonggarkan batas waktu eksekusi Vercel
set_time_limit(60);

// 1. Buat folder sementara di /tmp yang diizinkan oleh sistem Vercel
$storagePath = '/tmp/storage';
if (!is_dir($storagePath)) {
    mkdir($storagePath, 0777, true);
    mkdir("$storagePath/framework/views", 0777, true);
    mkdir("$storagePath/framework/cache", 0777, true);
    mkdir("$storagePath/framework/sessions", 0777, true);
    mkdir("$storagePath/bootstrap/cache", 0777, true);
    mkdir("$storagePath/logs", 0777, true);
}

// 2. Buat file database SQLite kosong di dalam /tmp
touch('/tmp/database.sqlite');

// 3. Muat aplikasi Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 4. KUNCI LARAVEL 11: Wajib secara eksplisit mengubah jalur Storage
$app->useStoragePath($storagePath);

// 5. Tangkap dan kirimkan balasan ke browser
$app->handleRequest(Illuminate\Http\Request::capture());