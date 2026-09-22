import { AverageMetrics } from './features/average-metrics.feature';
import { Charts } from './features/charts.feature';
import { Filters } from './features/filters.feature';
import type { Section } from './interfaces/section.interface';

import 'uplot/dist/uPlot.min.css';
import './style.css';

const filters = new Filters();
const sections: Section[] = [new AverageMetrics(), new Charts()];

const refresh = (): void => {
  const values = filters.getValues();

  for (const section of sections) {
    section.refresh(values).catch((error) => {
      console.error('Failed to refresh section', error);
    });
  }
};

filters.onChange(refresh);

const interval = window.setInterval(refresh, 60_000);

window.addEventListener('DOMContentLoaded', refresh, { once: true });
window.addEventListener('pagehide', () => window.clearInterval(interval), { once: true });
