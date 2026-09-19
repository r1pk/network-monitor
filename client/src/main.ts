import { ParametersSection } from './features/parameters.feature';
import type { Section } from './interfaces/section.interface';

import './style.css';

const sections: Section[] = [new ParametersSection()];

const refresh = (): void => {
  for (const section of sections) {
    section.refresh().catch((error) => {
      console.error('Failed to refresh section', error);
    });
  }
};
const interval = window.setInterval(refresh, 60_000);

window.addEventListener('DOMContentLoaded', refresh, { once: true });
window.addEventListener('pagehide', () => window.clearInterval(interval), { once: true });
