import type { FilterState, FilterStateKey } from '../types/filter-state.type';

export class Filters {
  private static readonly keys: FilterStateKey[] = ['since'];

  private readonly root: HTMLElement | null;

  constructor(root: ParentNode = document) {
    this.root = root.querySelector<HTMLElement>('[data-filters]');
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

  private isSupportedKey(key: string): key is FilterStateKey {
    return (Filters.keys as string[]).includes(key);
  }
}
