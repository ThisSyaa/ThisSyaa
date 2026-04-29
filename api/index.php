<?php

// 1. Buat folder sementara khusus untuk hasil render View/React
$compiledViewPath = '/tmp/storage/framework/views';
if (!is_dir($compiledViewPath)) {
    mkdir($compiledViewPath, 0777, true);
}

// 2. Beritahu sistem Laravel untuk menaruh hasil render ke folder /tmp tersebut
putenv("VIEW_COMPILED_PATH={$compiledViewPath}");
$_ENV['VIEW_COMPILED_PATH'] = $compiledViewPath;
$_SERVER['VIEW_COMPILED_PATH'] = $compiledViewPath;

// 3. Panggil pintu masuk utama asli bawaan Laravel!
require __DIR__ . '/../public/index.php';