import { CSSProperties } from 'react';
export type Data = JSX.Element[];

export interface MenuProps {
  alignCenter: boolean;
  alignOnResize: boolean;
  arrowClass: string;
  arrowDisabledClass: string;
  arrowLeft: JSX.Element | null;
  arrowRight: JSX.Element | null;
  clickWhenDrag: boolean;
  dragging: boolean;
  data: Data;
  inertiaScrolling: boolean;
  inertiaScrollingSlowdown: number;
  innerWrapperClass: string;
  itemStyle: CSSProperties;
  itemClass: string;
  itemClassActive: string;
  hideArrows: boolean;
  hideSingleArrow: boolean;
  menuStyle: CSSProperties;
  menuClass: string;
  onFirstItemVisible: () => void;
  onLastItemVisible: () => void;
  onFirstItemHidden: () => void;
  onLastItemHidden: () => void;
  onSelect: (selectedItemKey: string | number | null) => void;
  onUpdate: ({ translate }: { translate: number }) => void;
  scrollToSelected: boolean;
  scrollBy: number;
  selected: string;
  translate: number;
  transition: number;
  useButtonRole: boolean;
  wrapperClass: string;
  wrapperStyle: CSSProperties;
  innerWrapperStyle: CSSProperties;
  wheel: boolean;
  xPoint: number;
  disableTabindex: boolean;
  rtl: boolean;
}

export type Ref = HTMLDivElement | HTMLElement | null;

export interface Item {
  key: string;
  index: number;
  elem: Ref;
}

export interface RefObject {
  [key: string]: Item;
}

export type Void = void | false;

export type MenuItem = [string, Item];
export type MenuItems = MenuItem[];
