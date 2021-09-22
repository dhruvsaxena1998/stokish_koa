import { DefaultState, Context } from 'koa';
import { SanitizedUser } from './auth.types';

interface IState extends DefaultState {
  user: SanitizedUser;
}

export interface IContext extends Context {
  state: IState;
}
