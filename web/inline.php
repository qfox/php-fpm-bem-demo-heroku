<?php
isset($_GET['raw']) || header('x-content-type: application/x-bemjson-inline');
const BEM_DELIM = "\x07"; // '\u0007'
function bem($bemjson) {
    return BEM_DELIM . (is_string($bemjson) ? trim($bemjson) : json_encode($bemjson)) . BEM_DELIM;
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
    'mods' => [ 'theme' => 'islands', 'size' => 'xl', 'custom' => 'modifier' ],
    'text' => 'Аз есмь кнопка!'
])?>
<br/>
<?=bem("
({
    block : 'dropdown',
    mods : { switcher : 'button', theme : 'islands', size : 'm' },
    switcher : {
        block : 'button',
        mods : { togglable : 'check' },
        text : 'Узнать об акциях на сайте'
    },
    popup : 'Скидка 30% на новую коллекцию. Для активации акции нужно ввести промокод.'
})
")?>
<script src="/static/desktop/bem-components.js+bemhtml.js"></script>
</body>
</html>
