import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window | undefined>(
  'window',
  {
    providedIn: 'root',
    factory: () => (typeof window !== 'undefined' ? window : undefined),
  }
);
