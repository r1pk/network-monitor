import type { FilterValues } from '../types/filter-values.type';

type FilterKey = keyof FilterValues;

export class Filters {
  private static readonly keys: FilterKey[] = ['since'];

  private readonly root: HTMLElement | null;

  constructor(root: ParentNode = document) {
    this.root = root.querySelector<HTMLElement>('[data-filters]');
  }

  getValues(): FilterValues {
    const filters: FilterValues = {};

    for (const item of this.root?.querySelectorAll<HTMLElement>('[data-filter]') ?? []) {
      const key = item.dataset.filter;
      const value = item.querySelector<HTMLInputElement>('[data-value]')?.value;

      if (key && this.isFilterKey(key) && value) {
        filters[key] = value;
      }
    }

    return filters;
  }

  onChange(handler: () => void): void {
    this.root?.addEventListener('change', handler);
  }

  private isFilterKey(key: string): key is FilterKey {
    return (Filters.keys as string[]).includes(key);
  }
}
