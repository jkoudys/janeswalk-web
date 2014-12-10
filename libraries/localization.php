<?php
defined('C5_EXECUTE') || die('Access Denied.');
class Localization extends Concrete5_Library_Localization
{
    /**
     * For client-side translations, we need to supply a JSON file.
     *
     * @return string 
     * @example '/languages/de/LC_MESSAGES/messages.json'
     */
    public static function getActiveTranslateJsonURL()
    {
        $locale = self::activeLocale();
        $filename = '/' . $locale . '/LC_MESSAGES/messages.json';

        if (file_exists(DIR_LANGUAGES)) {
            if (is_dir(DIR_LANGUAGES . '/' . $locale) && file_exists(DIR_LANGUAGES . $filename)) {
                return BASE_URL . '/languages' . $filename;
            }
        }

        return null;
    }
}
