import Plot from 'react-plotly.js';

import { getInitialDateRange } from '@/utils/get-initial-date-range';

export const LatencyChart = ({ snapshots }) => {
  const config = {
    responsive: true,
    displayModeBar: false,
  };
  const layout = {
    title: 'Latency',
    xaxis: {
      title: 'Time',
      tickformat: '%m-%d %H:%M',
      tickmode: 'auto',
      type: 'date',

      range: getInitialDateRange(24),
      rangeslider: { visible: true },
    },
    yaxis: {
      title: 'Latency (ms)',
      range: [0, null],
    },
    height: 360,
  };
  const data = [
    {
      type: 'scatter',
      mode: 'lines',
      x: snapshots.map((snapshot) => new Date(snapshot.timestamp)),
      y: snapshots.map((snapshot) => snapshot.ping ?? 0),
      line: {
        width: 1,
        color: '#111111',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y} ms' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
