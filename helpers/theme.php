<?php 
/**
 * @package Helpers
 * @author Joshua Koudys <jkoudys@gmail.com>
 * @copyright  Copyright (c) 2013
 * @license    http://www.concrete5.org/license/     MIT License
 * Not quite true to its name, this helper is for modelling 'select' type attribute options, including theme and accessible
 */

class ThemeHelper
{
    private static $attributeIconMap = [
        'nature-naturelover' => 'bug',
        'nature-greenthumb' => 'leaf',
        'nature-petlover' => 'heart',
        'urban-suburbanexplorer' => 'home',
        'urban-architecturalenthusiast' => 'building',
        'urban-moversandshakers' => 'truck',
        'culture-historybuff' => 'archive',
        'culture-artist' => 'picture-o',
        'culture-aesthete' => 'pencil',
        'culture-bookworm' => 'book',
        'culture-foodie' => 'cutlery',
        'culture-nightowl' => 'glass',
        'culture-techie' => 'gears',
        'culture-writer' => 'edit',
        'civic-activist' => 'bullhorn',
        'civic-truecitizen' => 'flag-o',
        'civic-goodneighbour' => 'group',

        'urban-sports' => 'trophy',
        'urban-play' => 'puzzle-piece',
        'urban-water' => 'tint',
        'urban-film' => 'video-camera',
        'urban-music' => 'music',
        'civic-international' => 'globe',
        'civic-military' => 'fighter-jet',
        'civic-commerce' => 'shopping-cart',
        'civic-religion' => 'bell',
        'civic-health' => 'medkit',
        'civic-nativeissues' => 'sun-o',
        'civic-gender' => 'unlock-alt'
    ];

    private static $attributeNameMap = [
        'nature-naturelover' => 'Nature',
        'nature-greenthumb' => 'Gardening',
        'nature-petlover' => 'Animals',
        'urban-suburbanexplorer' => 'Suburbs',
        'urban-architecturalenthusiast' => 'Architecture',
        'urban-moversandshakers' => 'Transportation',
        'culture-historybuff' => 'Heritage',
        'culture-artist' => 'Art',
        'culture-aesthete' => 'Design',
        'culture-bookworm' => 'Literature',
        'culture-foodie' => 'Food',
        'culture-nightowl' => 'Night Life',
        'culture-techie' => 'Technology',
        'culture-writer' => 'Storytelling',
        'civic-activist' => 'Activism',
        'civic-truecitizen' => 'Citizenry',
        'civic-goodneighbour' => 'Community',

        //
        'urban-sports' => 'Sports',
        'urban-play' => 'Play',
        'urban-film' => 'Film',
        'urban-water' => 'Water',
        'urban-music' => 'Music',
        'civic-international' => 'International Issues',
        'civic-military' => 'Military',
        'civic-commerce' => 'Commerce',
        'civic-religion' => 'Religion',
        'civic-health' => 'Health',
        'civic-nativeissues' => 'Native Issues',
        'civic-gender' => 'Gender',

        // Accessibility
        'familyfriendly' => 'Family friendly',
        'wheelchair' => 'Wheelchair accessible',
        'dogs' => 'Dogs welcome',
        'strollers' => 'Strollers welcome',
        'bicycles' => 'Bicycles welcome',
        'steephills' => 'Steep hills',
        'uneven' => 'Uneven terrain',
        'busy' => 'Busy sidewalks',
        'bicyclesonly' => 'Bicycles only',
        'lowlight' => 'Low light or nighttime',
        'seniors' => 'Senior Friendly'
    ];

    public static function getAll(string $type = 'all'): array
    {
        if ($type === 'all') {
            return self::$attributeNameMap;
        }
        if ($type === 'themes') {
            $themes = array();
            foreach (self::$attributeNameMap as $key => $theme) {
                if (preg_match('/\-/', $key)) {
                    $themes[$key] = $theme;
                }
            }
            return $themes;
        }
        if ($type === 'accessibilities') {
            $accessibilities = array();
            foreach (self::$attributeNameMap as $key => $accessibility) {
                if (!preg_match('/\-/', $key)) {
                    $accessibilities[$key] = $accessibility;
                }
            }
            return $accessibilities;
        }
    }

    /**
     * Looks up the list of options from the DB
     * This is the only place where themes are 'categorized', which is purely for presentation in the walk create form
     *
     * @param string $type Which type of tag to return (e.g. theme, accessible)
     * @return array
     */ 
    public static function getSelectOptions(string $type = 'all'): array
    {
        $options = array(); 
        $satc = new SelectAttributeTypeController(AttributeType::getByHandle('select'));

        if($type === 'all' || $type === 'theme') {
            $satc->setAttributeKey(CollectionAttributeKey::getByHandle('theme'));
            $themeAK = CollectionAttributeKey::getByHandle('theme');
            foreach ($satc->getOptions() as $v) {
                $category = $this->getCategory($v->value);
                $options['theme'][$category][] = [
                    'handle' => $v->value,
                    'name' => self::getName($v->value),
                ];
            }
        }
        if($type === 'all' || $type === 'accessibile') {
            $satc->setAttributeKey(CollectionAttributeKey::getByHandle('accessible'));
            foreach ($satc->getOptions() as $v) {
                $options['accessible'][] = ['handle' => $v->value, 'name' => self::getName($v->value)];
            }
        }
        return $options;
    }

    public static function getName(string $handle): string
    {
        return self::$attributeNameMap[(string) $handle] ?: (string) $handle;
    }

    public static function getIcon(string $handle): string
    {
        return '<i class="fa fa-' . self::getIconName($handle) . '"></i>';
    }

    /*
     * getIconElement
     * Returns a DOM element of the icon
     *
     * @param DOMDocument $doc the document this element will be used in
     * @return DOMNode
     *
     */
    public static function getIconElement(string $handle, DOMDocument $doc = null): DOMNode
    {
        if ($doc) {
            $i = $doc->createElement('i');
        } else {
            $i = new DOMElement('i');
        }
        $i->setAttribute('class', 'fa fa-' . self::getIconName($handle));
        return $i;
    }

    /**
     * Get the name of the icon based on the c5 handle (same as in page property
     *
     * @param string $handle The short, hyphen-separated lowercase handle
     */
    public static function getIconName(string $handle): string
    {
        return self::$attributeIconMap[(string) $handle];
    }
}
