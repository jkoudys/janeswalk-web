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

class Interest
{
    protected $city;
    protected $cityID;

    protected static function getColumn($col, $walk)
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
                return $walk->meetingPlace['title'];
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
            case 'Attendees':
                return implode($walk->attendees, ', ');
            default:
                return '';
        }
    }

    public function __construct(Page $city)
    {
        $this->cityID = $city->getCollectionID();
        $this->city = $city;
    }

    public function renderCSV()
    {
        $columns = ['Name', 'Walk Date', 'Start', 'End', 'Attendees'];
        // Check that you have edit permissions on city
        if ((new Permissions($this->city))->canWrite()) {
            // Set header so it d/l's as a CSV file
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment;filename=' . preg_replace("/[^A-Za-z0-9 ]/", '', $this->city->getCollectionName()) . ' Walks.csv');
            echo join(',', $columns);
            // Load basic data for all the walks
            $walks = new PageList();
            $walks->filterByParentID($this->cityID);
            $walks->filterByCollectionTypeHandle('walk');

            foreach ($walks->get() as $page) {
                $walk = new Walk($page);
                echo PHP_EOL;
                foreach ($columns as $column) {
                    echo '"', addslashes(str_replace(["\n", "\r"], '', self::getColumn($column, $walk))), '",';
                }
            }
            exit;
        } else {
            throw new \RuntimeException('Attempted to export city walks without sufficient permissions.');
        }
    }
}
