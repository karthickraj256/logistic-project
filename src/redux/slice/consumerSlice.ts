import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConsumerInterface, ConsumerListInterface } from '../../admin/interface/consumer';
import consumerLists from "../../assets/json/admin/consumer.json";

// Define a type for the slice state
export interface ConsumerState {
  totalCount: number;
  consumers: ConsumerListInterface;
}

// Define the initial state using that type
const initialState: ConsumerState = {
  totalCount: consumerLists.length || 0,
  consumers: consumerLists || [],
}

export const consumerSlice = createSlice({
  name: 'consumers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    createConsumer: (state, action: PayloadAction<ConsumerInterface>) => {
      state.consumers = [ ...state.consumers, action.payload ];
    }
  }
})

export const { createConsumer } = consumerSlice.actions

export default consumerSlice.reducer