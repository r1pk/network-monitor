import { useMemo } from 'react';

import type { Config, Data, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

import type { Snapshot } from '@/types/snapshot';

export type PacketLossChartProps = {
  config: Partial<Config>;
  snapshots: Snapshot[];
};

export const PacketLossChart = ({ config, snapshots }: PacketLossChartProps) => {
  const { x, y } = useMemo(() => {
    const x: Date[] = [];
    const y: number[] = [];

    for (const snapshot of snapshots) {
      x.push(new Date(snapshot.timestamp));
      y.push(snapshot.loss ?? 0);
    }

    return { x: x, y: y };
  }, [snapshots]);

  const layout: Partial<Layout> = {
    title: {
      text: 'Packet Loss',
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
        text: '%',
      },
      range: [0, 100],
    },
    height: 360,
  };
  const data: Data[] = [
    {
      type: 'scattergl',
      mode: 'lines',
      x: x,
      y: y,
      line: {
        width: 1,
        color: '#181818',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y}%' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
