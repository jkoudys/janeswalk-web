<?php
/**
 * Grab the tokens to access the twitter API, as authorized by the JWMap app
 */

class ApiTwitterController extends Controller
{
    private $accessToken;

    /**
     * Thin client for simply retrieving token for application-only requests
     */
    public function on_start()
    {
        header('Content-Type: application/json');
        // TODO: cache this server-side for the length of the session timeout
        try {
            $this->accessToken = $this->getToken();
            echo json_encode($this->getSearch($_GET['q']));
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e]);
        }
        exit;
    }

    protected function getSearch($query)
    {
        $points = [];

        try {
            $ch = curl_init();
            curl_setopt_array(
                $ch,
                [
                    CURLOPT_URL => 'https://api.twitter.com/1.1/search/tweets.json?geocode=43.7,-79.4,9999999999km&q=' . $query,
                    CURLOPT_RETURNTRANSFER => true,
                    // TODO: use a const for some of these
                    CURLOPT_TIMEOUT => 20,
                    CURLOPT_HTTPHEADER => [
                        'Authorization: Bearer ' . $this->accessToken
                    ],
                ]
            );
            $res = json_decode(curl_exec($ch), true);
        } catch (Exception $e) {
            throw new Exception('Error loading Twitter search results.');
        }
        foreach ((array)$res['statuses'] as $status) {
            $geo = $status['geo'];
            if ($geo['type'] === 'Point') {
                $points[] = [
                    'lat' => $geo['coordinates'][0],
                    'lng' => $geo['coordinates'][1],
                    'title' => $status['text']
                ];
            }
        }

        return $points;
    }

    protected function getToken()
    {
        $ch = curl_init();
        curl_setopt_array(
            $ch,
            [
                CURLOPT_URL => 'https://api.twitter.com/oauth2/token',
                CURLOPT_POST => 1,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 20,
                CURLOPT_HTTPHEADER => [
                    'Authorization: Basic ' . base64_encode(TWITTER_CONSUMER_KEY . ':' . TWITTER_CONSUMER_SECRET),
                    'Content-type: application/x-www-form-urlencoded;charset=UTF-8'
                ],
                CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
            ]
        );
        $res = json_decode(curl_exec($ch), true);
        
        // Verify we successfully authorized
        if (!$res || count($res['errors'])) {
            throw new Exception('Error connecting to twitter API');
        } else {
            return $res['access_token'];
        }
    }
}

