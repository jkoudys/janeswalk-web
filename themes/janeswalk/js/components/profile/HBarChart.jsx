const spaceFactor = 30;

const HBarChart = ({data, width, height}) => {
  const sets = data[0]['values'];
  const largest = sets.reduce((p, v) => v.x > p ? v.x : p, 0);
  const calcHeight = height || (sets.length * spaceFactor);

  return (
    <svg className="horizontal-bar-chart" height={calcHeight} width={width}>
      {sets.map((set, i) => (
        <g transform={'translate(0, ' + i * spaceFactor + ')'}>
          <text x="0" y="14">
            {set.y}
          </text>
          <rect x="250" width={set.x / largest * 400} height="19" fill="#f16725" />
          <text x={250 + 7 + set.x / largest * 400} y="15">{set.x}</text>
        </g>
      ))}
    </svg>
  );
};

export default HBarChart;
