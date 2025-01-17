import { createAction } from '@ngrx/store';

export const startLoading = createAction('[UI Component] Start Loading');
export const endLoading = createAction('[UI Component] Stop Loading');