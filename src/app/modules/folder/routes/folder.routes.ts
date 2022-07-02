import { RequestHandler, Router } from 'express';
import multer from 'multer';
import { FolderController } from '../controllers/folder.controller';

class FolderRoutes {
  private _controller: FolderController;
  private _upload: RequestHandler;

  constructor(private _router: Router) {
    this._controller = new FolderController();
    this._upload = multer({ dest: process.env.STATIC_DIR }).array('files');
    this._init();
  }

  private _init(): void {
    this._router.get('/folders', this._controller.find.bind(this._controller));
    this._router.get('/folders/deep/:id', this._controller.findDeepById.bind(this._controller));
    this._router.get('/folders/download', this._controller.download.bind(this._controller));
    this._router.get('/folders/:id', this._controller.findById.bind(this._controller));
    this._router.post('/folders', this._upload, this._controller.create.bind(this._controller));
    this._router.patch('/folders/favorite', this._upload, this._controller.favorite.bind(this._controller));
    this._router.patch('/folders/move-to-trash', this._upload, this._controller.moveToTrash.bind(this._controller));
    this._router.delete('/folders', this._controller.deleteMany.bind(this._controller));
    this._router.delete('/folders:id', this._controller.deleteById.bind(this._controller));

    // this._router.get('/disk', this._controller.getDiskSpace.bind(this._controller));
  }
}

export { FolderRoutes };
