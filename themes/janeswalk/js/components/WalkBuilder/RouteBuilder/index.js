/**
 * RouteBuilder
 *
 * Make a map!
 */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce, Component } from 'react';
import { Form, Radio, Tooltip } from 'antd';
import SocialShare from './SocialShare';
import RouteMap from './RouteMap';

const radioStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 1010,
};

export default class RouteBuilder extends Component {
  state = { mapMode: 'pin' };

  handleModeChange = ({ target: { value } }) => {
    this.setState({ mapMode: value });
  };

  render() {
    const { id, name, city, points, route, handlers } = this.props;
    const { mapMode } = this.state;
    // Click on the map result
    let onClick;
    if (mapMode === 'pin') onClick = handlers.pointAdd;
    else if (mapMode === 'route') onClick = handlers.routeAdd;

    return (
      ce('section', { id, className: 'Lead__Option' },
        ce('h1', {}, name),
        ce(Form.Item, {},
          ce(SocialShare),
        ),
        ce('div', { style: { position: 'relative' } },
          ce(Radio.Group, { value: mapMode, style: radioStyle, onChange: this.handleModeChange },
            ce(Radio.Button, { value: 'move' },
              ce(Tooltip, { title: t`Move the map` },
                ce('i', { className: 'fa fa-hand-paper-o' })
              )
            ),
            ce(Radio.Button, { value: 'pin' },
              ce(Tooltip, { title: t`Add a stop` },
                ce('i', { className: 'fa fa-map-marker' })
              )
            ),
            ce(Radio.Button, { value: 'route' },
              ce(Tooltip, { title: t`Draw your route` },
                ce('i', { className: 'fa fa-code-fork' })
              )
            )
          ),
          ce(RouteMap, { city, mapMode, points, route, onClick })
        ),
        ce('p', {},
          t`Start building your Walk route by choosing `,
          ce('i', { className: 'fa fa-map-marker' }),
          t` to create a stop. Make sure your walk has a clear description for the meeting place.`
        )
      )
    );
  }
}
