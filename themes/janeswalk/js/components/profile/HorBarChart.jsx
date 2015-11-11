import d3 from 'd3';
import DataSeries from 'react-d3/barchart/DataSeries';
import utils from 'react-d3/utils';
import {Chart, XAxis, YAxis} from 'react-d3/common';
import {CartesianChartPropsMixin, ViewBoxMixin} from 'react-d3/mixins';

module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin, ViewBoxMixin ],

  displayName: 'BarChart',

  propTypes: {
    chartClassName:         React.PropTypes.string,
    data:                   React.PropTypes.array.isRequired,
    hoverAnimation:         React.PropTypes.bool,
    height:                 React.PropTypes.number,
    margins:                React.PropTypes.object,
    rangeRoundBandsPadding: React.PropTypes.number,
    // https://github.com/mbostock/d3/wiki/Stack-Layout#offset
    stackOffset:            React.PropTypes.oneOf(['silhouette', 'expand', 'wigget', 'zero']),
    valuesAccessor:         React.PropTypes.func,
    title:                  React.PropTypes.string,
    width:                  React.PropTypes.number,
    xAxisClassName:         React.PropTypes.string,
    yAxisClassName:         React.PropTypes.string,
    xAxisTickCount:         React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      chartClassName:         'rd3-barchart',
      hoverAnimation:         true,
      margins:                {top: 10, right: 20, bottom: 40, left: 45},
      rangeRoundBandsPadding: 0.25,
      stackOffset:            'zero',
      valuesAccessor:         d => d.values,
      xAxisClassName:         'rd3-barchart-xaxis',
      yAxisClassName:         'rd3-barchart-yaxis',
      xAxisTickCount:         4,
    };
  },

  _getStackedValuesMaxY(_data) {
    // in stacked bar chart, the maximum height we need for 
    // yScale domain is the sum of y0 + y
    var { valuesAccessor } = this.props;
    return d3.max(_data, function(d) {
      return d3.max(valuesAccessor(d), function(d) {
        // where y0, y is generated by d3.layout.stack()
        return d.y0 + d.y;
      });
    });
  },

  _getLabels(firstSeries) {
    // we only need first series to get all the labels
    var { valuesAccessor, xAccessor } = this.props;
    return valuesAccessor(firstSeries).map(xAccessor);
  },

  _stack() {
    var { stackOffset, xAccessor, yAccessor, valuesAccessor } = this.props;
    return d3.layout.stack()
    .offset(stackOffset)
    .x(xAccessor)
    .y(yAccessor)
    .values(valuesAccessor);
  },

  render() {

    var props = this.props;

    var _data = this._stack()(props.data);

    var margins = props.margins;

    var innerHeight = props.height - ( margins.top + margins.bottom );
    var innerWidth = props.width - ( margins.left + margins.right );

    var xScale = d3.scale.ordinal()
    .domain(this._getLabels(_data[0]))
    .rangeRoundBands([0, innerWidth], props.rangeRoundBandsPadding);

    var yScale = d3.scale.linear()
    .range([innerHeight, 0])
    .domain([0, this._getStackedValuesMaxY(_data)]);

    var trans = `translate(${ margins.left },${ margins.top })`;

    return (
      <Chart
        viewBox={props.viewBox}
        legend={props.legend}
        data={props.data}
        margins={props.margins}
        colors={props.colors}
        colorAccessor={props.colorAccessor}
        width={props.width}
        height={props.height}
        title={props.title}
        >
        <g transform={trans} className={props.chartClassName}>
          <YAxis
            yAxisClassName={props.yAxisClassName}
            yAxisTickValues={props.yAxisTickValues}
            yAxisLabel={props.yAxisLabel}
            yAxisLabelOffset={props.yAxisLabelOffset}
            yScale={yScale}
            margins={margins}
            yAxisTickCount={props.yAxisTickCount}
            tickFormatting={props.yAxisFormatter}
            width={innerWidth}
            height={innerHeight}
            xOrient={props.xOrient}
            yOrient={props.yOrient}
            gridHorizontal={props.gridHorizontal}
            gridHorizontalStroke={props.gridHorizontalStroke}
            gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
            gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
          />
          <XAxis
            xAxisClassName={props.xAxisClassName}
            xAxisTickValues={props.xAxisTickValues}
            xAxisLabel={props.xAxisLabel}
            xAxisLabelOffset={props.xAxisLabelOffset} 
            xScale={xScale}
            margins={margins}
            tickFormatting={props.xAxisFormatter}
            width={innerWidth}
            height={innerHeight}
            xOrient={props.xOrient}
            yOrient={props.yOrient}
            gridVertical={props.gridVertical}
            gridVerticalStroke={props.gridVerticalStroke}
            gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
            gridVerticalStrokeDash={props.gridVerticalStrokeDash}
          />
          <DataSeries
            yScale={yScale}
            xScale={xScale}
            margins={margins}
            _data={_data}
            width={innerWidth}
            height={innerHeight}
            colors={props.colors}
            colorAccessor={props.colorAccessor}
            hoverAnimation={props.hoverAnimation}
            valuesAccessor={props.valuesAccessor}
          />
        </g>
      </Chart>
    );
  }

});
