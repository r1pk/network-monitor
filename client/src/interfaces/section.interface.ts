export interface Section {
  refresh(since?: string): Promise<void>;
}
