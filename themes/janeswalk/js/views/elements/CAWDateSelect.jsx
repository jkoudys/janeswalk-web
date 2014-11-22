exports = React.createClass({
  render: function() {
    return (
      <div className="tab-pane" id="time-and-date">
        <div className="tab-content" id="walkduration">
          <div className="tab-pane active" id="time-and-date-select">
            <div className="page-header" data-section='time-and-date'>
              <h1>{ t('Set the Time and Date') }</h1>
            </div>
            <legend >{ t('Pick one of the following:') }</legend>
            <div className="row">
              <ul className="thumbnails" id="block-select">
                <li className="col-md-6">
                  <a href="#time-and-date-all" data-toggle="tab">
                    <div className="thumbnail">
                      <img src={CCM_THEME_PATH + '/img/time-and-date-full.png'} />
                      <div className="caption">
                        <div className="text-center">
                          <h4>{ t('By Request') }</h4>
                        </div>
                        <p>{ t('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.') }</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="col-md-6">
                  <a href="#time-and-date-set" data-toggle="tab">
                    <div className="thumbnail">
                      <img src={CCM_THEME_PATH + '/img/time-and-date-some.png'} />
                      <div className="caption">
                        <div className="text-center">
                          <h4>{ t('Pick Your Date') }</h4>
                        </div>
                        <p>{ t('Set specific dates and times that this walk is happening.') }</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-pane hide" id="time-and-date-set">
            <div className="page-header" data-section='time-and-date'>
              <h1>{ t('Time and Date') }</h1>
              <p className="lead">{ t('Select the date and time your walk is happening.') }</p>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="date-picker"></div>
              </div>
              <div className="col-md-6">
                <div className="thumbnail">
                  <div className="caption">
                    <small>{ t('Date selected') }:</small>
                    <h4 className="date-indicate-set" data-dateselected="" />
                    <hr />
                    <label htmlFor="walk-time">{ t('Start Time') }:</label>
                    <input id="walk-time" type="text" className="time ui-timepicker-input" autoComplete="off" />
                    <label htmlFor="walk-time">{ t('Approximate Duration of Walk') }:</label>
                    <select name="duration" id="walk-duration" defaultValue="1 Hour, 30 Minutes">
                      <option value="30 Minutes">30 Minutes</option>
                      <option value="1 Hour">1 Hour</option>
                      <option value="1 Hour, 30 Minutes">1 Hour, 30 Minutes</option>
                      <option value="2 Hours">2 Hours</option>
                      <option value="2 Hours, 30 Minutes">2 Hours, 30 Minutes</option>
                      <option value="3 Hours">3 Hours</option>
                      <option value="3 Hours, 30 Minutes">3 Hours, 30 Minutes</option>
                    </select>
                    <hr />
                    <button className="btn btn-primary" id="save-date-set">{ t('Add Date') }</button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <table className="table table-bordered table-hover" id="date-list-set">
              <thead>
                <tr>
                  <th>{ t('Date') }</th>
                  <th>{ t('Start Time') }</th>
                  <th />
                </tr>
              </thead>
              <tbody />
            </table>
            <hr />
            <a href="#time-and-date-select" data-toggle="tab" className="clear-date">{ t('Clear schedule and return to main Time and Date page') }</a>
            <hr />
            <a href="#accessibility" className="btn btn-primary btn-large section-save" data-toggle="tab">{ t('Next') }</a><br /><br />
          </div>
          <div className="tab-pane hide" id="time-and-date-all">
            <div className="page-header" data-section='time-and-date'>
              <h1>{ t('Time and Date') }</h1>
              <p className="lead">{ t('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.') }</p>
            </div>
            <label className="checkbox">
              <input type="checkbox" name="open" />{ t('Leave my availability open. Allow people to contact you to set up a walk.')} 
            </label>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="date-picker" />
              </div>
              <div className="col-md-6">
                <div className="thumbnail">
                  <div className="caption">
                    <div className="date-select-group">
                      <small>{ t('Date selected') }:</small>
                      <h4 className="date-indicate-all" />
                      <hr />
                    </div>
                    <label htmlFor="walk-duration">{ t('Approximate Duration of Walk') }:</label>
                    <select name="duration" id="walk-duration" defaultValue="1 Hour, 30 Minutes">
                      <option value="30 Minutes">30 Minutes</option>
                      <option value="1 Hour">1 Hour</option>
                      <option value="1 Hour, 30 Minutes">1 Hour, 30 Minutes</option>
                      <option value="2 Hours">2 Hours</option>
                      <option value="2 Hours, 30 Minutes">2 Hours, 30 Minutes</option>
                      <option value="3 Hours">3 Hours</option>
                      <option value="3 Hours, 30 Minutes">3 Hours, 30 Minutes</option>
                    </select>
                    <div className="date-select-group">
                      <hr />
                      <button className="btn btn-primary" id="save-date-all">{ t('Add Date') }</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <table className="table table-bordered table-hover" id="date-list-all">
              <thead>
                <tr>
                  <th>{ t('My Available Dates') }</th>
                  <th>{ t('Approximate Duration') }</th>
                  <th />
                </tr>
              </thead>
              <tbody />
            </table>
            <hr />
            <a href="#time-and-date-select" data-toggle="tab" className="clear-date">{ t('Clear schedule and return to main Time and Date page') }</a>
            <hr />
            <a href="#accessibility" className="btn btn-primary btn-large section-save" data-toggle="tab">{ t('Next') }</a><br /><br />
          </div>
        </div>
      </div>
    );
  }
});

