import { getAverageSnapshot } from '../api/client';
import type { Section } from '../interfaces/section.interface';
import type { AverageSnapshot } from '../types/average-snapshot.type';
import type { FilterValues } from '../types/filter-values.type';
import { convertBytesToMegabits } from '../utilities/convert-bytes-to-megabits.utility';
import { formatNumericValue } from '../utilities/format-numeric-value.utility';

type AverageMetricKey = keyof AverageSnapshot;
type Formatter = (value: number | null) => string;

export class AverageMetricsSection implements Section {
  private static readonly formatters: Record<AverageMetricKey, Formatter> = {
    download: (value) => formatNumericValue(value === null ? null : convertBytesToMegabits(value)),
    upload: (value) => formatNumericValue(value === null ? null : convertBytesToMegabits(value)),
    ping: (value) => formatNumericValue(value, 2),
    loss: (value) => formatNumericValue(value, 2),
  };

  private readonly values = new Map<AverageMetricKey, HTMLElement>();

  constructor(root: ParentNode = document) {
    for (const item of root.querySelectorAll<HTMLElement>('[data-average-metric]')) {
      const key = item.dataset.averageMetric;
      const element = item.querySelector<HTMLElement>('[data-value]');

      if (key && this.isAverageMetricKey(key) && element) {
        this.values.set(key, element);
      }
    }
  }

  render(snapshot: AverageSnapshot): void {
    for (const [key, element] of this.values) {
      element.textContent = AverageMetricsSection.formatters[key](snapshot[key]);
    }
  }

  async refresh(filters?: FilterValues): Promise<void> {
    const snapshot = await getAverageSnapshot(filters);

    this.render(snapshot);
  }

  private isAverageMetricKey(key: string): key is AverageMetricKey {
    return Object.hasOwn(AverageMetricsSection.formatters, key);
  }
}
