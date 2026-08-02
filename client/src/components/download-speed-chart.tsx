import { useMemo } from 'react';

import type { Config, Data, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

import type { Snapshot } from '@/types/snapshot';
import { convertBytesToMegabits } from '@/utilities/convert-bytes-to-megabits';

export type DownloadSpeedChartProps = {
  config: Partial<Config>;
  snapshots: Snapshot[];
};

export const DownloadSpeedChart = ({ config, snapshots }: DownloadSpeedChartProps) => {
  const { x, y } = useMemo(() => {
    const x: Date[] = [];
    const y: number[] = [];

    for (const snapshot of snapshots) {
      x.push(new Date(snapshot.timestamp));
      y.push(convertBytesToMegabits(snapshot.download ?? 0));
    }

    return { x: x, y: y };
  }, [snapshots]);

  const layout: Partial<Layout> = {
    title: {
      text: 'Download Speed',
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
        text: 'Mbps',
      },
      range: [0, null],
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
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y} Mbps' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
