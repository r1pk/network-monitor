import type { FilterState, FilterStateKey } from '../types/filter-state.type';
import { toDateInputValue } from '../utilities/to-date-input-value.utility';

export class Filters {
  private static readonly defaults: Record<FilterStateKey, () => string> = {
    since: () => toDateInputValue(new Date()),
  };

  private readonly root: HTMLElement | null;

  constructor(root: ParentNode = document) {
    this.root = root.querySelector<HTMLElement>('[data-filters]');

    this.applyDefaults();
  }

  getValues(): FilterState {
    const filters: FilterState = {};

    for (const item of this.root?.querySelectorAll<HTMLElement>('[data-filter]') ?? []) {
      const key = item.dataset.filter;
      const value = item.querySelector<HTMLInputElement>('[data-value]')?.value;

      if (key && this.isSupportedKey(key) && value) {
        filters[key] = value;
      }
    }

    return filters;
  }

  onChange(handler: () => void): void {
    this.root?.addEventListener('change', handler);
  }

  private applyDefaults(): void {
    for (const item of this.root?.querySelectorAll<HTMLElement>('[data-filter]') ?? []) {
      const key = item.dataset.filter;
      const input = item.querySelector<HTMLInputElement>('[data-value]');

      if (key && this.isSupportedKey(key) && input && !input.value) {
        input.value = Filters.defaults[key]();
      }
    }
  }

  private isSupportedKey(key: string): key is FilterStateKey {
    return Object.hasOwn(Filters.defaults, key);
  }
}
