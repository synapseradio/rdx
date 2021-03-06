export type TypesObject<T = { [key: string]: string }> = Record<keyof T, keyof T>;
export type StateValue = any;
export type StateObject = { [key: string]: StateValue };

export type Action<T = never> = {
  type: string
  payload?: T
  id: string
};

export type ActionObject<T = any> = Record<string, ActionCreator<T>>;

export type ActionCreator<T = undefined> = (payload?: T, id?: string) => Action<T> | Action<never>;

export type TypeDef = {
  typeName: string
  actionName: string
  selectorName: string
  reducerKey: string
  handlerType: "string" | "number" | "boolean" | "array" | "object" | "default"
  initialState: any
  raw?: string
};

export type ConditionalFilter<T = Array<string>> = (
  item: string,
  index: number,
  collection: T
) => boolean;

export type UserDefinedReducers = {
  [key: string]: StateObject
};

export type SelectorsObject = Record<string, (state: object) => any>;

export type Reducer<S, A = Action<S>> = (state: S, action: A) => S;

export type RdxDefinition = { reducerName?: string; definitions: Array<TypeDef> };

export type RdxConfiguration = {
  prefix?: string
  sagas?: Record<string, Generator>

};

export type RdxOutput<State> = {
  actions: ActionObject
  reducers: Reducer<State>
  selectors: SelectorsObject
  types: TypesObject
  sagas?: { [key: string]: Generator }
};

export type HandlerConfig<State> = {
  handlerType: TypeDef["handlerType"]
  reducerKey: string
  partial: boolean
  reset: boolean
  initialState: State
};

export type Handler<State> =
  | ((initialState: State) => Reducer<State>)
  | ((key: string) => Reducer<State>)
  | Reducer<State>;

export type PregeneratedReducerKeys<State = any> = {
  key: string
  handlers: Record<string, Handler<State>>
  handlerType: string
  initialState: State
};

export type PregeneratedReducer<State = any> = {
  name: string
  keys: PregeneratedReducerKeys<State>[]
};

export type ApiRequestState = {
  loaded: boolean
  failed: boolean
  error: any
  data: any
};

export type ConfiguredSagasObject = {
  latest?: DefaultSagasObject
  every?: DefaultSagasObject
}

type NotLatestOrEvery = Exclude<string, keyof ConfiguredSagasObject>

export type DefaultSagasObject = {
    [key in NotLatestOrEvery]: <ActionType=any>(action?: Action<ActionType>) => Generator
}

export type SagasObject = ConfiguredSagasObject | DefaultSagasObject
