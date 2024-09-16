

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
// import counterReducer from '../features/counter/couterSlice'
// // ...
// import userReducer from '../features/user/userSlice'
 
// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const rootReducer = {
//     user: userReducer,
//     counter: counterReducer
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)
 
// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }