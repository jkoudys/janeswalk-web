<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->any( '/[{path:.*}]', function( Request $req, Response $res ) {
    // Loads the c5 Environment and Template
    require_once __DIR__ . '/concrete5/web/router.php';
} );

$app->run();
