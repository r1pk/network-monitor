import Plot from 'react-plotly.js';

import { convertBytesToMegabits } from '@/utils/convert-bytes-to-megabits';
import { createDateRange } from '@/utils/create-date-range';

export const UploadSpeedChart = ({ snapshots }) => {
  const config = {
    responsive: true,
    displayModeBar: false,
  };
  const layout = {
    title: 'Upload Speed',
    xaxis: {
      title: 'Time',
      tickformat: '%m-%d %H:%M',
      tickmode: 'auto',
      type: 'date',

      range: createDateRange({ startOffsetHours: -24 }),
      rangeslider: { visible: true },
    },
    yaxis: {
      title: 'Upload Speed (Mbps)',
      range: [0, null],
    },
    height: 360,
  };
  const data = [
    {
      type: 'scatter',
      mode: 'lines',
      x: snapshots.map((snapshot) => new Date(snapshot.timestamp)),
      y: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.upload)),
      line: {
        width: 1,
        color: '#111111',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y} Mbps' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
