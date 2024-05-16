export interface Contact {
  id: string;
  createdAt: number;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
}

export interface FakeCache {
  [key: string]: boolean;
}

export interface RouteError {
  statusText?: string;
  message?: string;
}
