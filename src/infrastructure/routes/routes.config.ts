import { Router } from 'express';
import { FilesRoutes } from '../../app/modules/file/routes/files.routes';
import { FolderRoutes } from '../../app/modules/folder/routes/folder.routes';
import { UserRoutes } from '../../app/modules/user/routes/user.routes';

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this._init();
  }

  private _init(): void {
    new FilesRoutes(this.router);
    new UserRoutes(this.router);
    new FolderRoutes(this.router);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export { Routes };
