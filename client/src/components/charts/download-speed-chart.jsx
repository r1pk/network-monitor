import Plot from 'react-plotly.js';

import { convertBytesToMegabits } from '@/utils/convert-bytes-to-megabits';
import { getInitialDateRange } from '@/utils/get-initial-date-range';

export const DownloadSpeedChart = ({ snapshots }) => {
  const config = {
    responsive: true,
    displayModeBar: false,
  };
  const layout = {
    title: 'Download Speed',
    xaxis: {
      title: 'Time',
      tickformat: '%m-%d %H:%M',
      tickmode: 'auto',
      type: 'date',

      range: getInitialDateRange(24),
      rangeslider: { visible: true },
    },
    yaxis: {
      title: 'Download Speed (Mbps)',
      range: [0, null],
    },
    height: 360,
  };
  const data = [
    {
      type: 'scatter',
      mode: 'lines',
      x: snapshots.map((snapshot) => new Date(snapshot.timestamp)),
      y: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.download)),
      line: {
        width: 1,
        color: '#111111',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y} Mbps' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
