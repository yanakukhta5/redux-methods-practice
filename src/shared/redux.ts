import { type UnknownAction, type ThunkAction, createAsyncThunk } from "@reduxjs/toolkit";

import { useSelector, useDispatch, useStore } from "react-redux";

import type {store, extraArgument } from '../app/store'

// вынесли типы и типовые биндинги redux-хуков
// чтобы избавиться от возможной ошибки из-за циклических зависимостей

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type ExtraArgumentType = typeof extraArgument;

export type AppThunk<ReturnOfThunk = void> = ThunkAction<
  ReturnOfThunk, // Return type of the thunk function
  RootState, // state type used by getState
  ExtraArgumentType, // any "extra argument" injected into the thunk
  UnknownAction // known types of actions that can be dispatched
>;

// = (
//   dispatch: ThunkDispatch<RootState, ExtraArgumentType, UnknownAction>,
//   getState: () => RootState,
//   extraArgument: ExtraArgumentType
// ) => ReturnOfThunk

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();

// createAppAsyncThunk создаёт экшоны, то есть возвращает объекты
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
 state: RootState;
 dispatch: AppDispatch;
 extra: ExtraArgumentType;
}>();
