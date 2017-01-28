<?php
isset($_GET['raw']) || header('x-content-type: application/x-bemjson-inline');
const BEM_DELIM = "\x07"; // '\u0007'
const BEM_TEMPLATES_DELIM = "\x08"; // '\u0008'
function bem($bemjson) {
    return BEM_DELIM . (is_string($bemjson) ? trim($bemjson) : json_encode($bemjson)) . BEM_DELIM;
}
function bemTemplates($str) {
    return BEM_TEMPLATES_DELIM . $str . BEM_TEMPLATES_DELIM;
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
<?php if (isset($_GET['APPENDTEMPLATES'])): ?>
<?=bemTemplates(file_get_contents('./templates.bemhtml.js'))?>
<?php endif; ?>
<?=bem("
({
    block : 'select',
    mods : { mode : 'check', theme : 'islands', size : 'm' },
    name : 'select1',
    val : [2, 3],
    text : 'Программа конференции',
    options : [
        { val : 1, text : 'Доклад' },
        { val : 2, text : 'Мастер-класс' },
        { val : 3, text : 'Круглый стол' }
    ]
})
")?>
<script src="/static/desktop/bem-components.js+bemhtml.js"></script>
</body>
</html>
