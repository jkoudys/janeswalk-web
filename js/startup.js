/**
 * Our "startup" tasks, for managing init across async modules.
 * AMD would be nicer, but C5 block mechanics force us to take a more
 * global approach, so the least we can do is organize them.
 */

import googleMaps from './startups/googleMaps';

