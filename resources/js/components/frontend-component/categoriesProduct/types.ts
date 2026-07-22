
import type { ReactNode } from 'react';

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon?: ReactNode;
  color: string;
  textColor: string;
  buttonColor: string;
  count?: number;
  featured?: boolean;
  discount?: string;
}
