/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

export default () => (
  <ul className="nav nav-tabs">
    <li className="active">
      <a data-toggle="tab" className="description" href="#description">
        <i className="fa fa-list-ol" />{ t`Describe Your Walk` }
      </a>
    </li>
    <li>
      <a data-toggle="tab" className="route" href="#route">
        <i className="fa fa-map-marker" />{ t`Share Your Route` }
      </a>
    </li>
    <li>
      <a data-toggle="tab" className="time-and-date" href="#time-and-date">
        <i className="fa fa-calendar" />{ t`Set the Time & Date` }
      </a>
    </li>
    <li>
      <a data-toggle="tab" className="accessibility" href="#accessibility">
        <i className="fa fa-flag" />{ t`Make it Accessible` }
      </a>
    </li>
    <li>
      <a data-toggle="tab" className="team" href="#team">
        <i className="fa fa-users" />{ t`Build Your Team` }
      </a>
    </li>
  </ul>
);
