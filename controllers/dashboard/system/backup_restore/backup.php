<?php
use Concrete\Core\Legacy\FileHelper;

class DashboardSystemBackupRestoreBackupController extends Concrete5_Controller_Dashboard_System_BackupRestore_Backup
{
    public function view(): null
    {
        $tp = new TaskPermission();
        if ($tp->canBackup()) {
            $fh = new FileHelper();
            $arr_bckups = @$fh->getDirectoryContents(DIR_FILES_BACKUPS);
            $arr_backupfileinfo = [];
            if (count($arr_bckups) > 0) {
                foreach ($arr_bckups as $bkupfile) {
                    // This will ignore files that do not match the created backup pattern of including a timestamp in the filename
                    if (preg_match("/_([\d]{10,})/", $bkupfile, $timestamp)) {
                        $arr_backupfileinfo[] = [
                            'file' => $bkupfile,
                            'date' =>  date('Y-m-d H:i:s', $timestamp[1]),
                        ];
                    }
                }
                // The whole reason this file's overriden - sort these backups chronologically
                uasort($arr_backupfileinfo, function ($a, $b) {
                    return strcmp($b['date'], $a['date']);
                });
                $this->set('backups', $arr_backupfileinfo);
            }
        }
    }
}
