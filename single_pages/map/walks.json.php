<?php
defined('C5_EXECUTE') or die("Access Denied.");

$pl = new PageList();
$nh = Loader::helper('navigation');
$pl->filterByCollectionTypeHandle('Walk');
$pages = $pl->get();
$geo = [
  'type' => 'FeatureCollection',
  'features' => []
  ];
foreach ($pages as $walk) {
  $parent = Page::getByID($walk->getCollectionParentID());
  $walk_owner = UserInfo::getByID($walk->getCollectionUserID());
  $city = t($city_name = $parent->getCollectionName());
  foreach ((array) json_decode((string) $walk->getAttribute('gmap'), true)['markers'] as $marker) {
    $geo['features'][] = [
      'type' => 'feature',
      'geometry' => [
        'type' => 'Point',
        'coordinates' => [ $marker['lat'], $marker['lng'] ]
      ]
    ];
    break;
  }
}
echo json_encode($geo);
exit;

/*
{
              "type": "FeatureCollection",
              "features": [
                {"geometry": {
                    "type": "GeometryCollection",
                    "geometries": [
                        {
                            "type": "LineString",
                            "coordinates":
                                [[11.0878902207, 45.1602390564],
                                [15.01953125, 48.1298828125]]
                        },
                        {
                            "type": "Polygon",
                            "coordinates":
                                [[[11.0878902207, 45.1602390564],
                                  [14.931640625, 40.9228515625],
                                  [0.8251953125, 41.0986328125],
                                  [7.63671875, 48.96484375],
                                  [11.0878902207, 45.1602390564]]]
                        },
                        {
                            "type":"Point",
                            "coordinates":[15.87646484375, 44.1748046875]
                        }
                    ]
                },
                "type": "Feature",
                "properties": {}}
              ]
}
 */
