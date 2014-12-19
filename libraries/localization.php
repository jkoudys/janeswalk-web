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
        return self::getActiveTranslateResourceURL('json');
    }

    /**
     * For client-side translations that can use the MO
     *
     * @return string 
     * @example '/languages/de/LC_MESSAGES/messages.mo'
     */
    public static function getActiveTranslateMoURL()
    {
        return self::getActiveTranslateResourceURL('mo');
    }

    private static function getActiveTranslateResourceURL($extension)
    {
        $locale = self::activeLocale();
        $filename = '/' . $locale . '/messages.' . $extension;

        if (file_exists(DIR_LANGUAGES)) {
            if (is_dir(DIR_LANGUAGES . '/' . $locale) &&
                file_exists(DIR_LANGUAGES . $filename)) {
                return BASE_URL . DIR_REL . '/languages' . $filename;
            }
        }

        return null;
    }
}
