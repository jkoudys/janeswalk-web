<?php
use Qaribou\Templating\Virty;
use Qaribou\Collection\ImmArray;

Loader::model('user_list');
$av = Loader::helper('concrete/avatar');

// Load a list of filters; simply load json from block name
$filters = json_decode(
    ((string) $this->getBlockObject()->getBlockName()) ?: '{"groups": ["Staff"]}',
    true
);

/**
 * Get a list of members to display
 *
 * @param array $filters Assoc array of the filters to apply
 * @return array
 */
$getMembers = function ($filters) use ($av) {
    // Filter to show only the staff members, or customize
    // by 'custom template' and choose a block name
    $ul = new UserList();

    $defaultAttribute = ['', true, '='];

    foreach ($filters as $k => $filter) {
        if ($k === 'groups') {
            foreach ($filter as $group) {
                $ul->filterByGroup($group);
            }
        } elseif ($k === 'attributes') {
            // $attribute keys: 'id', 'value', 'compare'
            foreach ($filter as $attribute) {
                list($handle, $value, $comparison) = array_replace(
                    $defaultAttribute,
                    $attribute
                );

                $ul->filterByAttribute($handle, $value, $comparison);
            }
        }
        $ul->sortBy('ak_order', 'asc');
    }

    /**
     * Build doc with all the 'member's in it, and load the values we'll
     * need to display.
     */
    return ImmArray::fromArray($ul->get(100))->map(function ($member) use ($av) {
        return [
            'id' => $member->getUserID(),
            'img' => $av->getImagePath($member),
            'name' => trim($member->getAttribute('first_name') . ' ' . $member->getAttribute('last_name')),
            'title' => $member->getAttribute('job_title') ?: 'Jane\'s Walk',
            'email' => $member->getUserEmail(),
            'description' => $member->getAttribute('bio'),
        ];
    });
};

echo $controller->getContent(),
$virty->$doc->saveHTML($virty->createElement(
    ['ul', ['class' => 'ccm-staff-list'],
        $getMembers($filters)->map(function (array $member) {
            return (
                ['li', null, [
                    ['div', [
                        'class' => 'u-avatar placeholder' . (ord($member['id']) % 3),
                        'style' => 'background-image:url(' . $member['img'] . ')',
                    ]],
                    ['div', ['class' => 'ccm-staff-list-details'], [
                        ['h3', null, $member['name'] . ', ' . $member['title']],
                        ['a', ['href' => 'mailto:' . $member['email']], $member['email']],
                        ['p', ['class' => 'ccm-staff-list-bio'], $member['description']],
                    ]],
                ]]
            );
        }),
    ]
));
