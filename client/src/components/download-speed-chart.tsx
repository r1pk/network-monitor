import type { Config, Data, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

import type { Snapshot } from '@/types/snapshot';
import { convertBytesToMegabits } from '@/utilities/convert-bytes-to-megabits';

export type DownloadSpeedChartProps = {
  config: Partial<Config>;
  snapshots: Snapshot[];
};

export const DownloadSpeedChart = ({ config, snapshots }: DownloadSpeedChartProps) => {
  const layout: Partial<Layout> = {
    title: {
      text: 'Download Speed',
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
        text: 'Mbps',
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
      y: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.download ?? 0)),
      line: {
        width: 1,
        color: '#181818',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y} Mbps' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
