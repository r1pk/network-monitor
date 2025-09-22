import type { Config, Data, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

import type { Snapshot } from '@/types/snapshot';

export type PacketLossChartProps = {
  config: Partial<Config>;
  snapshots: Snapshot[];
};

export const PacketLossChart = ({ config, snapshots }: PacketLossChartProps) => {
  const layout: Partial<Layout> = {
    title: {
      text: 'Packet Loss',
    },
    xaxis: {
      title: {
        text: 'Time',
      },
      tickformat: '%m-%d %H:%M',
      tickmode: 'auto',
      type: 'date',
    },
    yaxis: {
      title: {
        text: '%',
      },
      range: [0, null],
    },
    height: 360,
  };
  const data: Data[] = [
    {
      type: 'scatter',
      mode: 'lines',
      x: snapshots.map((snapshot) => new Date(snapshot.timestamp)),
      y: snapshots.map((snapshot) => snapshot.loss ?? 0),
      line: {
        width: 1,
        color: '#181818',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y}%' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
