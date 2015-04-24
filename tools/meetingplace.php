<?php
/**
 * Tools for updating meeting places. Useful for batch updates of invalid data.
 */

namespace JanesWalk\Tools;

use \Page;
use \Permissions;
use \Exception;
use \RuntimeException;

class MeetingPlace
{
    // Couplets [URL, meeting place title]
    protected $updates;

    public function __construct(array $updates)
    {
        $this->updates = $updates;
    }

    /**
     * Batch-update the walks set in updates
     */
    public function update()
    {
        foreach ($this->updates as list($url, $meetingPlace)) {
            try {
                $c = Page::getByPath(parse_url($url)['path']);
                $cp = new Permissions($c);

                // Only allow updates if this user can edit
                if ($cp->canEditPageProperties()) {
                    $currentCollectionVersion = $c->getVersionObject();

                    $map = json_decode($c->getAttribute('gmap'), true);

                    // Check that we have a map marker
                    if (!empty($map['markers'])) {
                        $newCollectionVersion = $currentCollectionVersion->createNew('Updated via meetingplaceupdate script');
                        $c->loadVersionObject($newCollectionVersion->getVersionID());
                        // Set the first marker to the new meeting place
                        $map['markers'][0]['title'] = $meetingPlace;
                        $c->setAttribute('gmap', json_encode($map));

                        $newCollectionVersion->approve();
                        echo 'Updated walk ' . $url . ' to ' . $meetingPlace . PHP_EOL;
                    } else {
                        echo 'No map found for: ' . $url . PHP_EOL;
                    }
                } else {
                    throw new RuntimeException('Insufficient permissions to update');
                }
            } catch (Exception $e) {
                echo $e->getMessage() . ' URL: ' . $url . PHP_EOL;
            }
        }
    }
}

// Run from here since it's a tool.
// TODO: move to a job
$mp = new MeetingPlace([
    ['http://janeswalk.org/canada/toronto/graffiti-toronto/', 'HUG Tree at Queen and Spadina'],
    ['http://janeswalk.org/canada/toronto/getting-know-mimico-creek/', 'Montgomery’s Inn Museum parking lot'],
    ['http://janeswalk.org/canada/toronto/neighbourhood-transformation-through-adaptive-reuse/', 'Trinity Bellwoods Park, Queen and Bathurst'],
    ['http://janeswalk.org/canada/toronto/urban-school-food-gardens/', 'Sherbourne subway station'],
    ['http://janeswalk.org/canada/toronto/fitness-our-public-spaces/', 'Broadview Espresso Cafe, 817 Broadview ave'],
    ['http://janeswalk.org/canada/toronto/denisons-mount-dennis/', 'Portage Trail School, 100 Sidney Belsey Cr, Jane and Weston'],
    ['http://janeswalk.org/canada/toronto/under-rainbow-don-mills-rainbow-tunnel-and-east-don/', 'Meet at Shops at Donmills across from Salomon Sports store'],
    ['http://janeswalk.org/canada/toronto/offline-stories-fort-york/', 'Bathurst St Bridge, near the entrance to the fort'],
    ['http://janeswalk.org/canada/toronto/spaghetti-junction/', 'the Starbucks Next to Kipling'],
    ['http://janeswalk.org/canada/toronto/artwalk-1500-square-feet-art-and-history-see-torontos-village-murals/', 'The parking lot of Mongomery’s Inn'],
    ['http://janeswalk.org/canada/toronto/brunswick-avenue-19th-century-21st/', 'Beside the Brunswick house on Brunswick avenue and Bloor St. W.'],
    ['http://janeswalk.org/canada/toronto/revitalization-or-displacement-critical-look-idea-mixed-neighbourhoods/', 'All Saints Church at Dundas St. E and Sherbourne St'],
    ['http://janeswalk.org/canada/toronto/weston-village-past-and-future/', 'Weston GO station parking lot'],
    ['http://janeswalk.org/canada/toronto/shadow-side-sunnyside/', 'Beaty Parkette at foot of Roncy beside pedestrian bridge'],
    ['http://janeswalk.org/canada/toronto/dawn-chorus-walk/', 'High Park Nature Centre'],
    ['http://janeswalk.org/canada/toronto/dont-wear-black-g20-walk-revisited/', 'Southwest corner of King and Bay'],
    ['http://janeswalk.org/canada/toronto/radical-history-allan-gardens/', 'Allan Gardens at Carlton and Sherbourne St'],
    ['http://janeswalk.org/canada/toronto/three-centuries-corktown/', 'Enoch Turner Schoolhouse, 106 Trinity St'],
    ['http://janeswalk.org/canada/toronto/walk-green-line/', '18 Foundry Ave, near St. Claire and Bathurst'],
    ['http://janeswalk.org/canada/toronto/fresh-perspectives-thorncliffe-flemingdon-public-spaces/', 'Tim Horton’s at 751 Don Mills Rd'],
    ['http://janeswalk.org/canada/toronto/healing-landscapes-rouge/', 'Outside Rouge Valley Conservation Centre, 1749 Meadowvale Rd'],
    ['http://janeswalk.org/canada/toronto/hidden-plain-sight-dundas-west/', 'Northwest Corner of Queen and Ossington'],
    ['http://janeswalk.org/canada/toronto/wild-plant-medicine-riverside/', 'Queen & Saulter Library, 765 Queen St. E'],
    ['http://janeswalk.org/canada/toronto/torontos-artistic-past/', 'The North-West corner of Bloor and Park Rd'],
    ['http://janeswalk.org/canada/toronto/mix-it-taylor-massey/', 'United Way Community Hub, 3079 Danforth Ave']
]);
$mp->update();
