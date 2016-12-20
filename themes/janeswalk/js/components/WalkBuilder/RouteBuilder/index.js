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
  state = { mapMode: 'move' };

  handleModeChange = ({ target: { value } }) => {
    this.setState({ mapMode: value });
  };

  render() {
    const { id, name, city } = this.props;
    const { mapMode } = this.state;

    return (
      ce('section', { id, className: 'Lead__Option' },
        ce('h1', {}, name),
        ce(Form.Item, {},
          ce(SocialShare),
        ),
        ce('div', { style: { position: 'relative' } },
          ce(Radio.Group, { value: mapMode, style: radioStyle, onChange: this.handleModeChange },
            ce(Tooltip, { title: t`Move the map` },
              ce(Radio.Button, { value: 'move' }, ce('i', { className: 'fa fa-hand-paper-o' }))
            ),
            ce(Tooltip, { title: t`Add a stop` },
              ce(Radio.Button, { value: 'pin' }, ce('i', { className: 'fa fa-map-marker' }))
            ),
            ce(Tooltip, { title: t`Draw your route` },
              ce(Radio.Button, { value: 'route' }, ce('i', { className: 'fa fa-code-fork' }))
            )
          ),
          ce(RouteMap, { city, mapMode })
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
