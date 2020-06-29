import { Router } from 'express';

const routes = new Router();

import RepositoryController from './app/controllers/RepositoryController'
import ArchivedController from './app/controllers/ArchivedController'

routes.get('/',(req,res)=>{
    res.json({ok:"deu bom"})
})
routes.get('/repositories/:name/:repo',RepositoryController.findByName)
routes.get('/repositories/:name',RepositoryController.index)
routes.post('/archived',ArchivedController.Store)
routes.get('/archived',ArchivedController.Index)

export default routes;
