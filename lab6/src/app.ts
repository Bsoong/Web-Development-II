import * as  express from 'express';
import * as bodyParser from 'body-parser';
import {Tasks} from './routes/tasks';
var pathsAccessed: Object = {};
class App {
  public app: express.Application;
  public TaskRoutes: Tasks = new Tasks();
  constructor() {
    this.app = express();
    this.config();
    this.TaskRoutes.routes(this.app);
    this.routerS();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(function(req: express.Request, res: express.Response, next: Function) {
      const method = req.method;
      const route = req.originalUrl;
        console.log(`${method}` + " " + `${req.protocol}` + "://" + req.get('host') +  `${route}` + " " + JSON.stringify(req.body));
   next();
  });
  this.app.use(function(req: express.Request, res: express.Response, next: Function) {
    if (!pathsAccessed[req.path]) {
       pathsAccessed[req.path] = 0;
    }
    pathsAccessed[req.path]++;
    console.log( "There have now been " + pathsAccessed[req.path] + " requests made to " + req.path);
    next();
  });
  }
  private routerS(): void {
    this.app.use('*', (req: express.Request, res: express.Response) => {
      res.status(404).json("Error: 404 Not found")
    });
  }

}

export default new App().app;
