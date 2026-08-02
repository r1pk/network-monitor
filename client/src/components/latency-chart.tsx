import type { Config, Data, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

import type { Snapshot } from '@/types/snapshot';

export type LatencyChartProps = {
  config: Partial<Config>;
  snapshots: Snapshot[];
};

export const LatencyChart = ({ config, snapshots }: LatencyChartProps) => {
  const layout: Partial<Layout> = {
    title: {
      text: 'Latency',
    },
    xaxis: {
      title: {
        text: 'Time',
      },
      type: 'date',
      nticks: 8,
      tickformatstops: [
        {
          dtickrange: [null, 1000 * 60 * 60 * 6],
          value: '%H:%M',
        },
        {
          dtickrange: [1000 * 60 * 60 * 6, null],
          value: '%Y-%m-%d',
        },
      ],
    },
    yaxis: {
      title: {
        text: 'ms',
      },
      range: [0, null],
    },
    height: 360,
  };
  const data: Data[] = [
    {
      type: 'scattergl',
      mode: 'lines',
      x: snapshots.map((snapshot) => new Date(snapshot.timestamp)),
      y: snapshots.map((snapshot) => snapshot.ping ?? 0),
      line: {
        width: 1,
        color: '#181818',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y} ms' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
