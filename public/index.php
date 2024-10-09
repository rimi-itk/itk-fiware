<?php
function buildUrl(?string $subdomain = null, ?string $path = null, ?array $query = null): string {
    return ('on' === ($_SERVER['HTTPS'] ?? '') ? 'https' : 'http').'://'
          .($subdomain ? $subdomain.'.' : '')
          .$_SERVER['SERVER_NAME']
          .($path ? '/'.ltrim($path, '/') : '')
          .($query ? '?'.http_build_query($query) : '');
}

$title = 'ITK FIWARE';
$links = [
    'Scorpio (/ngsi-ld/v1/types)' => buildUrl(subdomain: 'scorpio', path: '/ngsi-ld/v1/types'),
];
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $title ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
      <div class="container-fluid">
          <h1><?php echo $title ?></h1>

          <ul>
              <?php foreach ($links as $text => $url): ?>
                  <li><a href="<?php echo $url ?>"><?php echo $text ?></a></li>
              <?php endforeach ?>
          </ul>
      </div>
  </body>
</html>
