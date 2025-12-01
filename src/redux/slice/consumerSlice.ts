import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConsumerInterface, ConsumerListInterface, FormConsumerInterface } from '../../admin/interface/consumer';
import consumerLists from "../../assets/json/admin/consumer.json";
import { FilterDataInterface } from '../../admin/interface/common';

// Define a type for the slice state
export interface ConsumerState {
  totalCount: number;
  consumers: ConsumerListInterface;
  filterData: FilterDataInterface[];
}

// Define the initial state using that type
const initialState: ConsumerState = {
  totalCount: consumerLists.length || 0,
  consumers: consumerLists || [],
  filterData: [
    {
      label: "Search",
      name: "searchBy",
      value: "",
      type: "text" as "text",
    },
    {
      label: "Start Date",
      name: "startDate",
      value: "",
      type: "date" as "date",
    },
    {
      label: "End Date",
      name: "endDate",
      value: "",
      type: "date" as "date",
    },
  ],
}

export const consumerSlice = createSlice({
  name: 'consumers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    createConsumer: (state, action: PayloadAction<FormConsumerInterface>) => {
      state.consumers = [ ...state.consumers, { ...action.payload, id: (state.consumers.length + 1).toString() } ];
    },
    updateConsumer: (state, action: PayloadAction<ConsumerInterface>) => {
      state.consumers = state.consumers.map(consumer => 
        consumer.id === action.payload.id ? { ...action.payload } : consumer
      );
    },
    deleteConsumer: (state, action: PayloadAction<string>) => {
      state.consumers = state.consumers.filter(consumer => consumer.id !== action.payload);
    },
    setFilterData: (state, action: PayloadAction<FilterDataInterface[]>) => {
      state.filterData = action.payload;
    },
  }
})

export const { createConsumer, setFilterData, updateConsumer, deleteConsumer } = consumerSlice.actions

export default consumerSlice.reducer