import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface NotificationState {
  notificationStatus: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Define the initial state using that type
const initialState: NotificationState = {
  notificationStatus: false,
  message: '',
  type: 'info',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      state.notificationStatus = action.payload.notificationStatus;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  }
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer