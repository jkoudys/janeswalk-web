/**
 * RouteBuilder
 *
 * Make a map!
 */
import { createElement as ce, Component } from 'react';
import t from 'es2015-i18n-tag';
import { Form, Button, Radio, Tooltip } from 'antd';
import SocialShare from './SocialShare';
import RouteMap from './RouteMap';
import WalkStops from './WalkStops';

const radioStyle = {
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 1010,
};

const undoStyle = {
  ...radioStyle,
  left: undefined,
  right: radioStyle.left,
};

export default class RouteBuilder extends Component {
  state = { mapMode: 'pin' };

  handleModeChange = ({ target: { value } }) => {
    this.setState({ mapMode: value });
  };

  render() {
    const { id, name, city, points, canUndo = false, route, handlers } = this.props;
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
                ce('i', { className: 'fa fa-hand-paper-o' }),
              ),
            ),
            ce(Radio.Button, { value: 'pin' },
              ce(Tooltip, { title: t`Add a stop` },
                ce('i', { className: 'fa fa-map-marker' }),
              ),
            ),
            ce(Radio.Button, { value: 'route' },
              ce(Tooltip, { title: t`Draw your route` },
                ce('i', { className: 'fa fa-code-fork' }),
              ),
            ),
          ),
          ce(Button, { style: undoStyle, disabled: !canUndo, onClick: handlers.pointUndo },
            ce(Tooltip, { title: t`Undo` },
              ce('i', { className: 'fa fa-undo' }),
            ),
          ),
          ce(RouteMap, { city, mapMode, points, route, onClick }),
        ),
        ce('p', {},
          t`Start building your Walk route by choosing `,
          ce('i', { className: 'fa fa-map-marker' }),
          t` to create a stop. Make sure your walk has a clear description for the meeting place.`,
        ),
        ce(WalkStops, { points, handlers }),
      )
    );
  }
}
