<?php
/**
 * City Exporter
 *
 * Export spreadsheets for a City's Walks
 */
namespace JanesWalk\Models\Exporters;

use Loader;

class Walk
{
    public static function renderAllWalksCSV(array $options = [])
    {
        $start = (int) $options['start'] ?? null;
        $end = (int) $options['end'] ?? null;

        $db = Loader::db();

        $columns = ['id', 'published', 'name', 'start', 'end', 'city'];

        // Set header so it d/l's as a CSV file
        // header('Content-Type: text/csv');
        // header('Content-Disposition: attachment;filename=AllWalks.csv');

        echo join(',', $columns);

        // TODO get all the walk names, time, and if they're published
        $outings = $db->GetAll(<<<EOT
SELECT
    cv.cID AS {$columns[0]},
    atb.value AS {$columns[1]},
    cv.cvName AS {$columns[2]},
    atet.start AS {$columns[3]},
    atet.end AS {$columns[4]},
    cvParent.cvName AS {$columns[5]}

-- Join the latest, saved version of a Walk
FROM CollectionVersions cv
INNER JOIN PageTypes pt ON
    cv.cvIsApproved = 1 AND
    pt.ctHandle = 'walk' AND
    cv.ctID = pt.ctID AND
    cv.cvName != ''

-- The time it's scheduled for
LEFT JOIN CollectionAttributeValues cavA ON
    cavA.cvID = cv.cvID AND
    cavA.cID = cv.cID
INNER JOIN atSchedule ats ON
    cavA.avID = ats.avID
INNER JOIN atEventTime atet ON
    ats.avID = atet.atScheduleID

LEFT JOIN CollectionAttributeValues cavB ON
    cavB.cvID = cv.cvID AND
    cavB.cID = cv.cID AND
    -- 6 is the published flag.
    -- TODO load from handle instead
    cavB.akID = 6

-- Get the 'published' flag
INNER JOIN atBoolean atb ON
    atb.avID = cavB.avID

-- Grab the parent's name
INNER JOIN Pages p ON
    p.cID = cv.cID
LEFT JOIN CollectionVersions cvParent ON
    cvParent.cID = p.cParentID AND
    cvParent.cvIsApproved = 1

ORDER BY cvParent.cvName, atet.start
;
EOT
        );

        foreach ($outings as $outing) {
            echo PHP_EOL;
            foreach ($outing as $column) {
                echo '"', addslashes(str_replace(["\n", "\r"], '', $column)), '",';
            }
        }
        exit;
    }
}
