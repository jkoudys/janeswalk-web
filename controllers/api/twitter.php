<?php
/**
 * Grab the tokens to access the twitter API, as authorized by the JWMap app
 */

class ApiTwitterController extends Controller
{
    // Only state necessary should be the accessToken
    private $accessToken;

    /**
     * Thin client for simply retrieving token for application-only requests
     */
    public function on_start()
    {
        header('Content-Type: application/json');
        try {
            // Twitter's FAQ states they don't expire the access token, but
            // let's cache 2h in case it ever gets rejected, it'll reset soon
            $this->accessToken = Cache::get('accessToken', 'twitter');
            if (!$this->accessToken) {
                $this->accessToken = $this->getToken();
                Cache::set('accessToken', 'twitter', $this->accessToken, 7200);
            }
            echo json_encode($this->getSearch($_GET['q'], $_GET['coords']));
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e]);
        }
        exit;
    }

    /**
     * Run a basic twitter search and get the results. Same as twitter.com/search
     *
     * @param string $query The search query
     * @param string $coords The lat + lng to centre the search on
     * @return array The points from the search, with their coordinates and text
     */
    protected function getSearch($query, $coords = null): array
    {
        $points = [];

        $ch = curl_init();
        curl_setopt_array(
            $ch,
            [
                CURLOPT_URL => 'https://api.twitter.com/1.1/search/tweets.json?geocode=' . $coords . ',180km&q=' . urlencode($query),
                CURLOPT_RETURNTRANSFER => true,
                // TODO: use a const for some of these
                CURLOPT_TIMEOUT => 20,
                CURLOPT_HTTPHEADER => [
                    'Authorization: Bearer ' . $this->accessToken
                ],
            ]
        );
        $res = json_decode(curl_exec($ch), true);
        foreach ((array) $res['statuses'] as $status) {
            $geo = $status['geo'];
            if ($geo['type'] === 'Point') {
                $points[] = [
                    'lat' => $geo['coordinates'][0],
                    'lng' => $geo['coordinates'][1],
                    'description' => $status['text']
                ];
            }
        }

        return $points;
    }

    /**
     * Authenticate with twitter's oauth2. Takes no params by design, as we use
     * app-only authentication and the key/secret come from server config.
     *
     * @return string The base64 encoded access token to twitter
     */
    protected function getToken(): string
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
