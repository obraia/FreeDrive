import { transparentize } from 'polished';

type Modes = 'LOOSE' | 'STRICT';

interface Config {
  container: HTMLElement;
  files: Element[];
  folders: Element[];
  mode: Modes;
  color: string;
  onFilesSelectionChange: (ids: string[]) => void;
  onFoldersSelectionChange: (ids: string[]) => void;
  onSelectionEnd?: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface Mouse {
  current: Point;
  start: Point;
}

interface Data {
  left: string;
  top: string;
  scaleX: number;
  scaleY: number;
}

export interface Selections {
  files: string[];
  folders: string[];
}

class SelectionController {
  container: HTMLElement;
  files: Element[];
  folders: Element[];
  mode: Modes;
  color: string;
  mouse: Mouse;
  data: Data;
  selectedFiles: string[];
  selectedFolders: string[];
  onFilesSelectionChange: (ids: string[]) => void;
  onFoldersSelectionChange: (ids: string[]) => void;
  onSelectionEnd?: () => void;

  static selection?: HTMLElement | null;

  constructor(config: Config) {
    this.container = config.container || document.body;
    this.files = config.files || [];
    this.folders = config.folders || [];
    this.mode = config.mode;
    this.color = config.color;
    this.onFilesSelectionChange = config.onFilesSelectionChange;
    this.onFoldersSelectionChange = config.onFoldersSelectionChange;
    this.onSelectionEnd = config.onSelectionEnd;

    this.mouse = {
      current: { x: 0, y: 0 },
      start: { x: 0, y: 0 },
    };

    this.data = {
      left: '0',
      top: '0',
      scaleX: 0,
      scaleY: 0,
    };

    this.selectedFiles = [];
    this.selectedFolders = [];

    this.bindEvents();
  }

  bindEvents() {
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.scroll = this.scroll.bind(this);
    this.container.addEventListener('mousedown', this.mouseDown);
    // this.container.addEventListener('scroll', this.scroll);
    window.addEventListener('mouseup', this.mouseUp);
  }

  unbind() {
    window.removeEventListener('mousemove', this.mouseMove);
    this.resetSelection();
    this.clearSelections();

    SelectionController.intialScrollY = 0;
  }

  destroy() {
    this.container.removeEventListener('mousedown', this.mouseDown);
    // this.container.removeEventListener('scroll', this.scroll);
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  }

  intersects(a: DOMRect, b: DOMRect) {
    if (this.mode === 'STRICT') {
      return b.left >= a.left && b.top >= a.top && b.right <= a.right && b.bottom <= a.bottom;
    } else if (this.mode === 'LOOSE') {
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    }
    return false;
  }

  clearSelections() {
    this.selectedFiles = [];
    this.selectedFolders = [];
  }

  getSelectedItems(): Selections | null {
    const selectionRect = SelectionController.selection?.getBoundingClientRect();

    if (!selectionRect) {
      return null;
    }

    const files = this.files
      .filter((item) => this.intersects(selectionRect, item.getBoundingClientRect()))
      .map((item) => item.id.split('_')[1])
      .sort();

    const folders = this.folders
      .filter((item) => this.intersects(selectionRect, item.getBoundingClientRect()))
      .map((item) => item.id.split('_')[1])
      .sort();

    if (
      files.length === 0 &&
      folders.length === 0 &&
      (this.selectedFiles.length !== 0 || this.selectedFolders.length !== 0)
    ) {
      this.clearSelections();
      return { files: [], folders: [] };
    }

    if (files.length === 0 && folders.length === 0 && this.files.length !== 0 && this.folders.length !== 0) {
      return null;
    }

    if (this.compareArrays(files, this.selectedFiles) && this.compareArrays(folders, this.selectedFolders)) {
      return null;
    }

    this.selectedFiles = files;
    this.selectedFolders = folders;

    return { files, folders };
  }

  compareArrays(a: string[], b: string[]) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  resetSelection() {
    if (SelectionController.selection) {
      SelectionController.selection.remove();
      SelectionController.selection = null;
    }
  }

  createSelectionBox() {
    SelectionController.selection = document.createElement('div');
    SelectionController.selection.style.position = 'absolute';
    SelectionController.selection.style.width = '0px';
    SelectionController.selection.style.height = '0px';
    SelectionController.selection.style.top = '0';
    SelectionController.selection.style.left = '0';
    SelectionController.selection.style.pointerEvents = 'none';
    SelectionController.selection.style.backgroundColor = transparentize(0.75, this.color);
    SelectionController.selection.style.border = `1px solid ${this.color}`;
    document.body.appendChild(SelectionController.selection);
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
    this.createSelectionBox();
  }

  mouseMove(e: MouseEvent) {
    this.mouse.current.x = e.clientX;
    this.mouse.current.y = e.clientY;

    if (SelectionController.selection) {
      const invertX = this.mouse.start.x > this.mouse.current.x;
      const invertY = this.mouse.start.y > this.mouse.current.y;
      const width = Math.abs(this.mouse.start.x - this.mouse.current.x);
      const height = Math.abs(this.mouse.start.y - this.mouse.current.y);

      this.data.left = (invertX ? e.clientX : this.mouse.start.x) + 'px';
      this.data.top = (invertY ? e.clientY : this.mouse.start.y) + 'px';
      this.data.scaleX = width / window.innerWidth;
      this.data.scaleY = height / window.innerHeight;

      SelectionController.selection.style.left = this.data.left;
      SelectionController.selection.style.top = this.data.top;
      SelectionController.selection.style.width = width + 'px';
      SelectionController.selection.style.height = height + 'px';

      const selection = this.getSelectedItems();

      if (selection) {
        this.onFilesSelectionChange(selection.files);
        this.onFoldersSelectionChange(selection.folders);
      }
    }
  }

  mouseUp(e: MouseEvent) {
    e.stopImmediatePropagation();
    this.unbind();

    if (this.onSelectionEnd) {
      this.onSelectionEnd();
    }
  }

  scroll(e: Event) {
    e.stopImmediatePropagation();

    if (SelectionController.selection && e.target) {
      const { top, height } = SelectionController.selection.getBoundingClientRect();
      const scrollTop = (e as any).target.scrollTop;
      console.log(height, scrollTop - SelectionController.intialScrollY);

      if (!SelectionController.intialScrollY) {
        SelectionController.intialScrollY = scrollTop;
        SelectionController.intialHeigth = height;
        SelectionController.intialTop = top;
      }

      SelectionController.selection.style.top =
        SelectionController.intialTop - (scrollTop - SelectionController.intialScrollY) + 'px';
      SelectionController.selection.style.height =
        SelectionController.intialHeigth + (scrollTop - SelectionController.intialScrollY) + 'px';
      // SelectionController.selection.style.height = height + 1 + 'px';
    }
  }

  static intialScrollY = 0;
  static intialHeigth = 0;
  static intialTop = 0;
}

export { SelectionController };
