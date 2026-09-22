import uPlot from 'uplot';

import { getSnapshots } from '../api/client';
import type { Section } from '../interfaces/section.interface';
import type { FilterState } from '../types/filter-state.type';
import type { Snapshot } from '../types/snapshot.type';
import type { SnapshotMetricKey } from '../types/snapshot-metrics.type';
import { convertBytesToMegabits } from '../utilities/convert-bytes-to-megabits.utility';

export class Charts implements Section {
  private static readonly AXIS_COLOR = 'oklch(44.2% 0.017 285.786)';
  private static readonly LINE_COLOR = 'oklch(59.6% 0.145 163.225)';
  private static readonly FILL_COLOR_TOP = 'oklch(59.6% 0.145 163.225 / 0.25)';
  private static readonly FILL_COLOR_BOTTOM = 'oklch(59.6% 0.145 163.225 / 0)';

  private static readonly mappers: Record<SnapshotMetricKey, (value: number | null) => number | null> = {
    download: (value) => (value === null ? null : convertBytesToMegabits(value)),
    upload: (value) => (value === null ? null : convertBytesToMegabits(value)),
    ping: (value) => value,
    loss: (value) => value,
  };

  private static readonly units: Record<SnapshotMetricKey, string> = {
    download: 'Mbps',
    upload: 'Mbps',
    ping: 'ms',
    loss: '%',
  };

  private readonly charts = new Map<SnapshotMetricKey, uPlot>();

  constructor(root: ParentNode = document) {
    for (const item of root.querySelectorAll<HTMLElement>('[data-chart]')) {
      const key = item.dataset.chart;
      const legend = item.querySelector<HTMLElement>('[data-legend]');
      const element = item.querySelector<HTMLElement>('[data-value]');

      if (key && this.isChartKey(key) && element) {
        this.charts.set(key, this.createChart(element, Charts.units[key], legend));
      }
    }
  }

  render(snapshots: Snapshot[]): void {
    const timestamps = snapshots.map((snapshot) => Date.parse(snapshot.timestamp) / 1000);

    for (const [key, chart] of this.charts) {
      const mapper = Charts.mappers[key];
      const values = snapshots.map((snapshot) => mapper(snapshot[key]));

      chart.setData([timestamps, values]);
    }
  }

  async refresh(filters?: FilterState): Promise<void> {
    const snapshots = await getSnapshots(filters);

    this.render(snapshots);
  }

  private isChartKey(key: string): key is SnapshotMetricKey {
    return Object.hasOwn(Charts.mappers, key);
  }

  private createChart(element: HTMLElement, unit: string, legend: HTMLElement | null): uPlot {
    const fill = (self: uPlot): CanvasGradient | string => {
      const { top, height } = self.bbox;

      if (!Number.isFinite(top) || !Number.isFinite(height) || height <= 0) {
        return Charts.FILL_COLOR_TOP;
      }

      const gradient = self.ctx.createLinearGradient(0, top, 0, top + height);

      gradient.addColorStop(0, Charts.FILL_COLOR_TOP);
      gradient.addColorStop(1, Charts.FILL_COLOR_BOTTOM);

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
          stroke: Charts.AXIS_COLOR,
          values: '{HH}:{mm}',
        },
        {
          stroke: Charts.AXIS_COLOR,
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
          stroke: Charts.LINE_COLOR,
          fill: fill,
          value: (_self, value) => value ?? '--',
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
