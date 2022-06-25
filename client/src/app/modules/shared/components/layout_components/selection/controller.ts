import { transparentize } from 'polished';

type Modes = 'LOOSE' | 'STRICT';

interface Config {
  container: HTMLElement;
  items: React.RefObject<HTMLElement>[];
  selectedClass: string;
  selectionClass: string;
  mode: Modes;
  selection: HTMLElement;
  color: string;
  onSelectionChange: (selectedItems: HTMLElement[]) => void;
}

interface Point {
  x: number;
  y: number;
}

interface Mouse {
  current: Point;
  start: Point;
  isDragging: Boolean;
}
interface Data {
  left: string;
  top: string;
  scaleX: number;
  scaleY: number;
}

class SelectionController {
  container: HTMLElement;
  items: React.RefObject<HTMLElement>[];
  selectedClass: string;
  selectionClass: string;
  mode: Modes;
  selection?: HTMLElement | null;
  color: string;
  mouse: Mouse;
  data: Data;
  onSelectionChange: (selectedItems: HTMLElement[]) => void;

  constructor(config: Config) {
    this.container = config.container || document.body;
    this.items = config.items;
    this.selectedClass = config.selectedClass;
    this.selectionClass = config.selectionClass;
    this.mode = config.mode;
    this.color = config.color;
    this.onSelectionChange = config.onSelectionChange;

    this.mouse = {
      current: { x: 0, y: 0 },
      start: { x: 0, y: 0 },
      isDragging: false,
    };

    this.data = {
      left: '0',
      top: '0',
      scaleX: 0,
      scaleY: 0,
    };

    this.bindEvents();
  }

  bindEvents() {
    this.mouseDown = this.mouseDown.bind(this);
    this.container.addEventListener('mousedown', this.mouseDown);
    this.mouseUp = this.mouseUp.bind(this);
    window.addEventListener('mouseup', this.mouseUp);
  }

  unbind() {
    window.removeEventListener('mousemove', this.mouseMove);
    this.resetSelection();
  }

  intersects(a: DOMRect, b: DOMRect) {
    if (this.mode === 'STRICT') {
      return b.left >= a.left && b.top >= a.top && b.right <= a.right && b.bottom <= a.bottom;
    } else if (this.mode === 'LOOSE') {
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    }
    return false;
  }

  getSelectedItems() {
    const selectionRect = this.selection?.getBoundingClientRect();

    if (!selectionRect) {
      return [];
    }

    return this.items
      .filter((item) => item.current && this.intersects(selectionRect, item.current.getBoundingClientRect()))
      .map((item) => item.current) as HTMLElement[];
  }

  updateSelection(selectedItems: Element[]) {
    this.items.forEach((item) => {
      if (item.current && selectedItems.indexOf(item.current) === -1) {
        item.current?.classList.remove(this.selectedClass);
      } else {
        item.current?.classList.add(this.selectedClass);
      }
    });
  }

  resetSelection() {
    if (this.selection) {
      this.selection.remove();
      this.selection = null;
    }
  }

  createSelectionBox(parent: any) {
    this.selection = document.createElement('div');
    this.selection.style.position = 'absolute';
    this.selection.style.width = '0px';
    this.selection.style.height = '0px';
    this.selection.style.top = '0';
    this.selection.style.left = '0';
    this.selection.style.pointerEvents = 'none';
    this.selection.style.backgroundColor = transparentize(0.75, this.color);
    this.selection.style.border = `1px solid ${this.color}`;
    document.body.appendChild(this.selection);
  }

  mouseDown(e: any) {
    // e.stopImmediatePropagation();

    if (e.buttons !== 1) {
      return this.unbind();
    }

    this.mouseMove = this.mouseMove.bind(this);
    window.addEventListener('mousemove', this.mouseMove);

    this.mouse.start.x = e.clientX;
    this.mouse.start.y = e.clientY;
    this.mouse.isDragging = true;
    this.createSelectionBox(e.target);
  }

  mouseMove(e: MouseEvent) {
    this.mouse.current.x = e.clientX;
    this.mouse.current.y = e.clientY;

    if (this.selection) {
      const invertX = this.mouse.start.x > this.mouse.current.x;
      const invertY = this.mouse.start.y > this.mouse.current.y;
      const width = Math.abs(this.mouse.start.x - this.mouse.current.x);
      const height = Math.abs(this.mouse.start.y - this.mouse.current.y);

      this.data.left = (invertX ? e.clientX : this.mouse.start.x) + 'px';
      this.data.top = (invertY ? e.clientY : this.mouse.start.y) + 'px';
      this.data.scaleX = width / window.innerWidth;
      this.data.scaleY = height / window.innerHeight;

      this.selection.style.left = this.data.left;
      this.selection.style.top = this.data.top;
      this.selection.style.width = width + 'px';
      this.selection.style.height = height + 'px';

      // const selectedItems = this.getSelectedItems();
      // this.onSelectionChange(selectedItems);
      // this.updateSelection(selectedItems);
    }
  }

  mouseUp(e: MouseEvent) {
    e.stopImmediatePropagation();

    if (e.buttons !== 1) {
      return this.unbind();
    }

    this.mouse.isDragging = false;

    if (this.mouse.start.x === e.clientX && this.mouse.start.y === e.clientY) {
      if (!(e.target as Element).classList.contains('selected')) {
        const selectedItems = this.getSelectedItems();
        this.updateSelection(selectedItems);
        this.onSelectionChange(selectedItems);
      } else {
        const selectedItems = [e.target as HTMLElement];
        this.updateSelection(selectedItems);
        this.onSelectionChange(selectedItems);
      }
    }

    this.unbind();
  }
}

export { SelectionController };
