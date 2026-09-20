import uPlot from 'uplot';

import { getSnapshots } from '../api/client';
import type { Section } from '../interfaces/section.interface';
import type { AverageSnapshot } from '../types/average-snapshot.type';
import type { FilterState } from '../types/filter-state.type';
import type { Snapshot } from '../types/snapshot.type';
import { convertBytesToMegabits } from '../utilities/convert-bytes-to-megabits.utility';

type ChartKey = keyof AverageSnapshot;
type Mapper = (value: number | null) => number | null;

export class ChartsSection implements Section {
  private static readonly mappers: Record<ChartKey, Mapper> = {
    download: (value) => (value === null ? null : convertBytesToMegabits(value)),
    upload: (value) => (value === null ? null : convertBytesToMegabits(value)),
    ping: (value) => value,
    loss: (value) => value,
  };

  private static readonly units: Record<ChartKey, string> = {
    download: 'Mbps',
    upload: 'Mbps',
    ping: 'ms',
    loss: '%',
  };

  private readonly charts = new Map<ChartKey, uPlot>();

  constructor(root: ParentNode = document) {
    for (const item of root.querySelectorAll<HTMLElement>('[data-chart]')) {
      const key = item.dataset.chart;
      const legend = item.querySelector<HTMLElement>('[data-legend]');
      const element = item.querySelector<HTMLElement>('[data-value]');

      if (key && this.isChartKey(key) && element) {
        this.charts.set(key, this.createChart(element, ChartsSection.units[key], legend));
      }
    }
  }

  render(snapshots: Snapshot[]): void {
    const timestamps = snapshots.map((snapshot) => Date.parse(snapshot.timestamp) / 1000);

    for (const [key, chart] of this.charts) {
      const mapper = ChartsSection.mappers[key];
      const values = snapshots.map((snapshot) => mapper(snapshot[key]));

      chart.setData([timestamps, values]);
    }
  }

  async refresh(filters?: FilterState): Promise<void> {
    const snapshots = await getSnapshots(filters);

    this.render(snapshots);
  }

  private isChartKey(key: string): key is ChartKey {
    return Object.hasOwn(ChartsSection.mappers, key);
  }

  private createChart(element: HTMLElement, unit: string, legend: HTMLElement | null): uPlot {
    const fill = (self: uPlot): CanvasGradient | string => {
      const { top, height } = self.bbox;

      if (!Number.isFinite(top) || !Number.isFinite(height) || height <= 0) {
        return 'oklch(59.6% 0.145 163.225 / 0.25)';
      }

      const gradient = self.ctx.createLinearGradient(0, top, 0, top + height);

      gradient.addColorStop(0, 'oklch(59.6% 0.145 163.225 / 0.25)');
      gradient.addColorStop(1, 'oklch(59.6% 0.145 163.225 / 0)');

      return gradient;
    };

    const options: uPlot.Options = {
      width: element.clientWidth,
      height: Math.max(element.clientHeight, 0),
      padding: [16, 16, 0, 32],
      legend: {
        mount: (_self, element) => {
          legend?.append(element);
        },
      },
      axes: [
        {
          stroke: 'oklch(44.2% 0.017 285.786)',
          values: '{HH}:{mm}',
        },
        {
          stroke: 'oklch(44.2% 0.017 285.786)',
          values: (_self, splits) => splits.map((value) => `${value} ${unit}`),
        },
      ],
      series: [
        {
          value: '{YYYY}-{MM}-{DD} {HH}:{mm}',
        },
        {
          label: unit,
          points: { show: false },
          stroke: 'oklch(59.6% 0.145 163.225 / 1)',
          fill: fill,
          value: (_self, value) => (value === null ? '--' : `${value} ${unit}`),
          paths: uPlot.paths.spline?.(),
        },
      ],
    };

    const chart = new uPlot(options, [[], []], element);
    const observer = new ResizeObserver(() => {
      chart.setSize({
        width: element.clientWidth,
        height: Math.max(element.clientHeight, 0),
      });
    });

    observer.observe(element);

    return chart;
  }
}
