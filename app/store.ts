import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/couterSlice";
// ...
import userReducer from "../features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
// const rootReducer = combineReducers({
//   counter: counterReducer,
//   user: userReducer,
// });
// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

// export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
