import { TbFile, TbFolder, TbFolderPlus, TbInfoCircle } from 'react-icons/tb';
import { FileService } from '../../../../../infrastructure/services/file/file.service';
import { FolderService } from '../../../../../infrastructure/services/folder/folder.service';
import { IFileChild, IFolder, IFolderChild } from '../../../../../infrastructure/services/folder/interfaces';

type HomeControllerType = 'File' | 'Folder';

interface IProps {
  userId: string;
  parentId: string;
  fileService: FileService;
  folderService: FolderService;
  inputFile: React.RefObject<HTMLInputElement>;
  onFilesUploaded?: (files: IFileChild[]) => void;
  onFilesDeleted?: (ids: string[]) => void;
  onFilesFavorited?: (ids: string[], favorite: boolean) => void;
  onFoldersUploaded?: (folders: IFolderChild[]) => void;
  onFoldersDeleted?: (ids: string[]) => void;
  onFoldersFavorited?: (ids: string[], favorite: boolean) => void;
  clearSelection: () => void;
  showContextMenu: (payload: any) => void;
  hideContextMenu: () => void;
}

class HomeController {
  constructor(private _props: IProps) {}

  get contextItems() {
    return [
      {
        id: 1,
        name: 'Nova pasta',
        icon: TbFolderPlus,
        onClick: () => {},
      },
      {
        id: 2,
        name: 'Fazer upload de arquivos',
        icon: TbFile,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          this._props.hideContextMenu();
          this.callUpload('File');
        },
      },
      {
        id: 3,
        name: 'Fazer upload de pasta',
        icon: TbFolder,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          this._props.hideContextMenu();
          this.callUpload('Folder');
        },
      },
      {
        id: 4,
        name: 'Obter informações',
        icon: TbInfoCircle,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          this._props.hideContextMenu();
        },
      },
    ];
  }

  public async onMount(callback: (files: IFolder) => void) {
    this._props.folderService.getFolderById(this._props.parentId, { deleted: false }).then((folder) => {
      callback(folder);
    });

    this.bindEvents();
  }

  public async onUnmount(callback?: () => void) {
    this.unbindEvents();
    if (callback) callback();
  }

  public async handleFavorite(ids: string[], type: HomeControllerType, favorite: boolean) {
    if (type === 'File') {
      this._props.fileService.favorite(ids, favorite).then((res) => {
        if (this._props.onFilesFavorited && res.acknowledged) {
          this._props.onFilesFavorited(ids, favorite);
        }
      });
    } else {
      this._props.folderService.favorite(ids, favorite).then((res) => {
        if (this._props.onFoldersFavorited && res.acknowledged) {
          this._props.onFoldersFavorited(ids, favorite);
        }
      });
    }

    this._props.hideContextMenu();
  }

  public async handleDownload(ids: string[], type: HomeControllerType) {
    const fileToDownload = (res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', res.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    };

    if (type === 'File') {
      if (ids.length > 1) {
        this._props.fileService.downloadMany(ids).then((res) => {
          fileToDownload(res);
        });
      } else {
        this._props.fileService.downloadById(ids[0]).then((res) => {
          fileToDownload(res);
        });
      }
    } else {
      this._props.folderService.download(ids).then((res) => {
        fileToDownload(res);
      });
    }

    this._props.hideContextMenu();
  }

  public async handleDelete(ids: string[], type: HomeControllerType) {
    this._props.hideContextMenu();

    if (type === 'File') {
      this._props.fileService.moveToTrash(ids).then((res) => {
        if (this._props.onFilesDeleted && res.acknowledged) {
          this._props.onFilesDeleted(ids);
        }
      });
    } else {
      this._props.folderService.moveToTrash(ids).then((res) => {
        if (this._props.onFoldersDeleted && res.acknowledged) {
          this._props.onFoldersDeleted(ids);
        }
      });
    }
  }

  public handleContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    console.log('handleContextMenu:', this);
    this._props.clearSelection();
    this._props.showContextMenu({ items: this.contextItems, xPos: e.pageX, yPos: e.pageY });
  }

  public callUpload(type: HomeControllerType) {
    const uploader = document.getElementById('uploader');

    if (!uploader) return;

    if (type === 'File') {
      uploader.setAttribute('name', 'file[]');
      uploader.setAttribute('multiple', '');
    } else {
      uploader.removeAttribute('multiple');
    }

    if (type === 'Folder') {
      uploader.setAttribute('name', 'file');
      uploader.setAttribute('webkitdirectory', '');
      uploader.setAttribute('directory', '');
    } else {
      uploader.removeAttribute('webkitdirectory');
      uploader.removeAttribute('directory');
    }

    uploader.click();
  }

  public async handleUpload(e: Event) {
    const files = (e.target as HTMLInputElement).files;

    if (!files) return;

    const formData = new FormData();

    formData.append('userId', this._props.userId);
    formData.append('parentId', this._props.parentId);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    this._props.fileService.uploadFiles(formData).then((res) => {
      if (this._props.onFilesUploaded) {
        this._props.onFilesUploaded(res);
      }
    });
  }

  public bindEvents() {
    const container = document.getElementById('home-page');
    const uploader = document.getElementById('uploader');

    this.handleUpload = this.handleUpload.bind(this);

    container?.addEventListener('mousedown', this._props.clearSelection);
    uploader?.addEventListener('change', this.handleUpload);
  }

  public unbindEvents() {
    const container = document.getElementById('home-page');
    const uploader = document.getElementById('uploader');

    container?.removeEventListener('mousedown', this._props.clearSelection);
    uploader?.removeEventListener('change', this.handleUpload);
  }
}

export { HomeController };
export type { HomeControllerType };
