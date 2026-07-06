import * as React from 'react';
import { CategoryItem } from './types';

export const categories: CategoryItem[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    image:
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
    icon: React.createElement(
      'svg',
      { viewBox: '0 0 24 24', width: 22, height: 22, stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      React.createElement('rect', { x: 2, y: 4, width: 20, height: 16, rx: 2, ry: 2 }),
      React.createElement('line', { x1: 2, y1: 10, x2: 22, y2: 10 })
    ),
    color: 'bg-gradient-to-br from-blue-50 to-blue-100',
    textColor: 'text-blue-700',
    buttonColor: 'bg-blue-700',
    count: 248,
    featured: true,
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    image:
      'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&w=800&q=80',
    icon: React.createElement(
      'svg',
      { viewBox: '0 0 24 24', width: 22, height: 22, stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      React.createElement('path', { d: 'M16 2H8l-4 6h16l-4-6z' }),
      React.createElement('path', { d: 'M12 14v7' }),
      React.createElement('path', { d: 'M8 9l-4 9h16l-4-9' })
    ),
    color: 'bg-gradient-to-br from-pink-50 to-pink-100',
    textColor: 'text-pink-700',
    buttonColor: 'bg-pink-700',
    count: 312,
    discount: '30% OFF',
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    image:
      'https://images.unsplash.com/photo-1584477710383-c790ca8f19e1?auto=format&fit=crop&w=800&q=80',
    icon: React.createElement(
      'svg',
      { viewBox: '0 0 24 24', width: 22, height: 22, stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      React.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
    ),
    color: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    textColor: 'text-emerald-700',
    buttonColor: 'bg-emerald-700',
    count: 186,
  },
  {
    id: 4,
    name: 'Beauty & Health',
    slug: 'beauty-health',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    icon: React.createElement(
      'svg',
      { viewBox: '0 0 24 24', width: 22, height: 22, stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      React.createElement('path', {
        d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      })
    ),
    color: 'bg-gradient-to-br from-purple-50 to-purple-100',
    textColor: 'text-purple-700',
    buttonColor: 'bg-purple-700',
    count: 204,
  },
  {
    id: 5,
    name: 'Sporting Goods',
    slug: 'sports',
    image:
      'https://images.unsplash.com/photo-1576858574144-9ae1ebcf41bf?auto=format&fit=crop&w=800&q=80',
    icon: React.createElement(
      'svg',
      { viewBox: '0 0 24 24', width: 22, height: 22, stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
      React.createElement('path', { d: 'M16 12H8' }),
      React.createElement('path', { d: 'M12 16V8' })
    ),
    color: 'bg-gradient-to-br from-orange-50 to-orange-100',
    textColor: 'text-orange-700',
    buttonColor: 'bg-orange-700',
    count: 156,
    featured: true,
  },
];
