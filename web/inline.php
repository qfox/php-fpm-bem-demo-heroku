<?php
isset($_GET['raw']) || header('x-content-type: application/x-bemjson-inline');
const BEM_DELIM = "\x07"; // '\u0007'
function bem($bemjson) {
    return BEM_DELIM . json_encode($bemjson) . BEM_DELIM;
}
?>
<!DOCTYPE html>
<html>
<head>
<title>bem-components with page generation on php</title>
<meta charset="utf-8">
<link rel="stylesheet" href="/static/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
<?=bem([
    'block' => 'button',
    'mods' => [ 'theme' => 'islands', 'size' => 'xl' ],
    'text' => 'Аз есмь кнопка!'
])?>
<script src="/static/desktop/bem-components.js+bemhtml.js"></script>
</body>
</html>
