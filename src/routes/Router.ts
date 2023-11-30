import { Router } from 'express';
import { loginController } from '../modules/Login/index';

const rotasTestes = Router();

rotasTestes.post('/login', (req, res) => {
  return loginController.handle(req, res);
});

export { rotasTestes };
