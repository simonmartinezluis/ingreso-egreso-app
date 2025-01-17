import { createReducer, on } from '@ngrx/store';
import { startLoading, endLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false,
}

const _uiReducer = createReducer(initialState,
    on(startLoading, state => ({ ...state, isLoading: true })),
    on(endLoading, state => ({ ...state, isLoading: false })),
);

export function uiReducer(state: any, action: any) {
    return _uiReducer(state, action);
}