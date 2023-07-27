interface DefaultTab {
  path?: never;
  default: true;
}

interface PathTab {
  default?: never;
  path: string;
}

export type Tab = {
  id: number;
  label: string;
  path?: string;
  default?: boolean;
} & (DefaultTab | PathTab);