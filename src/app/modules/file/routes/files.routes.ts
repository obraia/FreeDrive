import { RequestHandler, Router } from 'express';
import { FilesController } from '../controllers/files.controller';
import localStorageEngine from '../middlewares/muter.middleware';

class FilesRoutes {
  private _controller: FilesController;
  private _upload: RequestHandler;

  constructor(private _router: Router) {
    this._controller = new FilesController();

    this._upload = localStorageEngine({
      dest: process.env.STATIC_DIR,
      destThumb: process.env.STATIC_THUMB_DIR,
    }).array('files');

    this._init();
  }

  private _init(): void {
    this._router.get('/files', this._controller.find.bind(this._controller));
    this._router.get('/files/download', this._controller.downloadMany.bind(this._controller));
    this._router.get('/files/download/:id', this._controller.downloadById.bind(this._controller));
    this._router.post('/files', this._upload, this._controller.create.bind(this._controller));
    this._router.patch('/files/favorite', this._upload, this._controller.favorite.bind(this._controller));
    this._router.patch('/files/move-to-trash', this._upload, this._controller.moveToTrash.bind(this._controller));
    this._router.delete('/files', this._controller.deleteMany.bind(this._controller));
    this._router.get('/files/:id', this._controller.findById.bind(this._controller));
    this._router.delete('/files:id', this._controller.deleteById.bind(this._controller));
  }
}

export { FilesRoutes };
