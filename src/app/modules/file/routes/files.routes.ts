import { RequestHandler, Router } from 'express';
import multer from 'multer';
import { FilesController } from '../controllers/files.controller';

class FilesRoutes {
  private _controller: FilesController;
  private _upload: RequestHandler;

  constructor(private _router: Router) {
    this._controller = new FilesController();
    this._upload = multer({ dest: process.env.STATIC_DIR }).array('files');
    this._init();
  }

  private _init(): void {
    this._router.get('/files', this._controller.find.bind(this._controller));
    this._router.post('/files', this._upload, this._controller.create.bind(this._controller));
    this._router.get('/files/:id', this._controller.findById.bind(this._controller));
  }
}

export { FilesRoutes };
