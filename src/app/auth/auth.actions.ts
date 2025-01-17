import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/usuario.model';

export const setUser = createAction('[Auth] Set User', props<{ user: UserModel }>());
export const unSetUser = createAction('[Auth] Un Set User');