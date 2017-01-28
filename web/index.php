<?php
header('x-content-type: application/x-bemjson');

$header = <<<HEADER
<!DOCTYPE html>
<html>
<head>
<title>bem-components with page generation on php</title>
<meta charset="utf-8">
<link rel="stylesheet" href="/static/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
HEADER;

$footer = <<<FOOTER
<script src="/static/desktop/bem-components.js+bemhtml.js"></script>
FOOTER;

echo json_encode([
    $header,
    [ 'block' => 'button', 'mods' => [ 'theme' => 'islands', 'size' => 'xl' ], 'text' => 'Аз есмь кнопка!' ],
    $footer
]);

