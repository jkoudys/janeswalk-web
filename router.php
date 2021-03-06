<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true,
        'addContentLengthHeader' => false,
    ],
]);

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/macon[/]', function (Request $req, Response $res) {
    return $res->withStatus(302)->withHeader('Location', '/united-states/macon-ga');
}); 

$app->get('/canada/oshawa[/]', function (Request $req, Response $res) {
    return $res->withStatus(302)->withHeader('Location', '/canada/durham-region');
}); 

$app->get('/canada/whitby[/]', function (Request $req, Response $res) {
    return $res->withStatus(302)->withHeader('Location', '/canada/durham-region');
}); 

$app->any('/[{path:.*}]', function(Request $req, Response $res) {
    ob_start();
    // Loads the c5 Environment and Template
    require_once __DIR__ . '/concrete5/web/router.php';
    return $res->getBody()->write(ob_get_clean());
} );

$app->run();
