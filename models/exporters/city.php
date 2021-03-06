<?php
/**
 * City Exporter
 *
 * Export spreadsheets for a City's Walks
 */
namespace JanesWalk\Models\Exporters;

use Concrete\Core\Legacy\NavigationHelper;
use Concrete\Core\Legacy\AvatarHelper;
use Concrete\Core\Legacy\TextHelper;
use Concrete\Core\Legacy\ImageHelper;
use Page;
use Permissions;
use PageList;
use UserInfo;
use JanesWalk\Models\PageTypes\Walk;

class City
{
    protected $city;
    protected $cityID;

    protected static function getColumn(string $col, Walk $walk)
    {
        switch ($col) {
            case 'Name':
                return (string) $walk;
            case 'Status':
                return $walk->published ? 'live' : 'draft';
            case 'Walk Date':
                if ($walk->time['slots']) {
                    return date('Y-m-d', $walk->time['slots'][0][0]);
                }
                return '';
            case 'Start':
                if ($walk->time['slots']) {
                    return date('H:i', $walk->time['slots'][0][0]);
                }
                return '';
            case 'End':
                if ($walk->time['slots']) {
                    return date('H:i', $walk->time['slots'][0][1]);
                }
                return '';
            case 'Meeting Place':
                list($meetingPlace) = $walk->features;
                return isset($meetingPlace) ?:
                    isset($meetingPlace['properties']) ?
                    $meetingPlace['properties']['title'] :
                    '';
            case 'Walk Owner Name':
                $owner = UserInfo::getByID($walk->getPage()->getCollectionUserID());
                $name = trim($owner->getAttribute('first_name') . ' ' . $owner->getAttribute('last_name')) ?: $owner->getUserName();
                return $name;
            case 'Walk Owner email':
                $owner = UserInfo::getByID($walk->getPage()->getCollectionUserID());
                return $owner->getUserEmail();
            case 'Published Date':
                return $walk->publishDate;
            case 'URL':
                $nh = new NavigationHelper();
                return $nh->getCollectionURL($walk->getPage());
            default:
                return '';
        }
    }

    public function __construct(Page $city)
    {
        $this->cityID = $city->getCollectionID();
        $this->city = $city;
    }

    public function renderWalkCSV(array $options = [])
    {
        $excludePast = $options['excludePast'] ?? false;

        $columns = ['Name','Status','Walk Date', 'Published Date', 'Start', 'End','Meeting Place','Walk Owner Name','Walk Owner email','URL'];
        // Set header so it d/l's as a CSV file
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename=' . preg_replace("/[^A-Za-z0-9 ]/", '', $this->city->getCollectionName()) . ' Walks.csv');
        echo join(',', $columns);
        // Load basic data for all the walks
        $walks = new PageList();
        $walks->filterByParentID($this->cityID);
        $walks->filterByCollectionTypeHandle('walk');
        $walks->displayUnapprovedPages();
        if ($excludePast) {
            $walks->filterByDateLastModified(date('Y-m-d', strtotime('-6 months')), '>');
        }

        // An 'outing' is one scheduled walk date
        $outings = [];
        foreach ($walks->get(0xFFFF) as $page) {
            $walk = new Walk($page);

            // If no time set, put it in as-is
            if (count($walk->time['slots'])) {
                foreach ((array) $walk->time['slots'] as $slot) {
                    $dateWalk = clone $walk;
                    $dateWalk->time['slots'] = [$slot];
                    $outings[] = $dateWalk;
                }
            } else {
                $outings[] = $walk;
            }
        }
        usort($outings, function ($a, $b) {
            $ta = $a->time['slots'][0][0];
            $tb = $b->time['slots'][0][0];
            return $ta - $tb;
        });

        foreach ($outings as $outing) {
            echo PHP_EOL;
            foreach ($columns as $column) {
                echo '"', addslashes(str_replace(["\n", "\r"], '', self::getColumn($column, $outing))), '",';
            }
        }
        exit;
    }
}
