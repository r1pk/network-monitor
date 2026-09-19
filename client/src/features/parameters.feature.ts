import { getAverageSnapshot } from '../api/client';
import type { Section } from '../interfaces/section.interface';
import type { AverageSnapshot } from '../types/average-snapshot.type';
import { convertBytesToMegabits } from '../utilities/convert-bytes-to-megabits.utility';
import { formatNumericValue } from '../utilities/format-numeric-value.utility';

type ParameterKey = keyof AverageSnapshot;
type Formatter = (value: number | null) => string;

export class ParametersSection implements Section {
  private static readonly formatters: Record<ParameterKey, Formatter> = {
    download: (value) => formatNumericValue(value === null ? null : convertBytesToMegabits(value)),
    upload: (value) => formatNumericValue(value === null ? null : convertBytesToMegabits(value)),
    ping: (value) => formatNumericValue(value, 2),
    loss: (value) => formatNumericValue(value, 2),
  };

  private readonly values = new Map<ParameterKey, HTMLElement>();

  constructor(root: ParentNode = document) {
    for (const article of root.querySelectorAll<HTMLElement>('[data-parameter]')) {
      const key = article.dataset.parameter as ParameterKey;
      const element = article.querySelector<HTMLElement>('[data-value]');

      if (Object.hasOwn(ParametersSection.formatters, key) && element) {
        this.values.set(key, element);
      }
    }
  }

  render(snapshot: AverageSnapshot): void {
    for (const [key, element] of this.values) {
      element.textContent = ParametersSection.formatters[key](snapshot[key]);
    }
  }

  async refresh(since?: string): Promise<void> {
    const snapshot = await getAverageSnapshot(since);

    this.render(snapshot);
  }
}
