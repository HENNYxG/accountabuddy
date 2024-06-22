//export const createAction = (type, payload) => ({ type, payload });
//not in use

import { AnyAction } from "redux";
//Matchable recieves a generic action creator, which is an object that returns back any type. (AC is action creator type).
//we access the type using the square brackets. This will take the type value from the action and set it to the second row value
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};
// withMatcher will help extract the type off the actionCreator & at the same time, match action types inside our reducer

//Action creator 1 with no other params
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// AC2 with params. Accumulates all the arguments into an array, each can be any type
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

//if we pass 2 params,

//Defines type 1. ActionWithPayload is the expected type when T & P are passed as parameters.
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

//Defines type 2
//To overload Functions, you need the same number of parameters. Thats why we pass the payload: void.
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// Defines implementation
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

//T is a enum so it extends string
