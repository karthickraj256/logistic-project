import { configureStore } from '@reduxjs/toolkit'
import consumerReducer from './slice/consumerSlice'
import rolesReducer from './slice/rolesSlice'
import notificationReducer from './slice/notificationSlice'
import usersReducer from './slice/usersSlice'

export const store = configureStore({
  reducer: {
    consumer: consumerReducer,
    roles: rolesReducer,
    notification: notificationReducer,
    users: usersReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store