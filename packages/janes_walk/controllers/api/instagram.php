<?php

class ApiInstagramController extends Controller
{
    const API_URL = 'https://api.instagram.com/v1/';
    const API_OAUTH_URL = 'https://api.instagram.com/oauth/authorize';

    public function on_start()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $request = split('/', substr($_SERVER['PATH_INFO'], 1));

        header('Content-Type: application/json');

        switch ($method) {
        case 'POST':
            exit;
            break;
        case 'PUT':
            parse_str(file_get_contents('php://input'), $put_vars);
            exit;
            break;
        case 'GET':
            echo json_encode(
                $this->getMediaByTag(
                    $_REQUEST['tag-name'] ?: null,
                    $_REQUEST['count'] ?: null
                )
            );
            exit;
            break;
        case 'DELETE':
            exit;
            break;
        }
    }

    /**
     * Pull a list of media and build a walk map from it
     *
     * @param string $tagName The tag to search on
     * @param int $count The maximum number of images to load
     * @return array
     */
    public function getMediaByTag($tagName = null, $count = 50)
    {
        $ch = curl_init();
        curl_setopt(
            $ch,
            CURLOPT_URL,
            self::API_OAUTH_URL
        );
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt(
            $ch,
            CURLOPT_POSTFIELDS,
            http_build_query([
                'client_id' => INSTAGRAM_CLIENT_ID,
                'redirect_uri' => 'http://janeswalk.org/profile'
            ])
        );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 90);
        $jsonData = curl_exec($ch);

        var_dump($jsonData);

        return $jsonData;
    }
}
