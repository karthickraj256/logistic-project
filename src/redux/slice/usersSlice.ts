import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import usersLists from "../../assets/json/admin/users.json";
import permissionLists from "../../assets/json/admin/permissions.json";
import { FilterDataInterface } from '../../admin/interface/common';
import { FormUserInterface, UserInterface, UserListInterface } from '../../admin/interface/user';

// Define a type for the slice state
export interface UserState {
  totalCount: number;
  users: UserListInterface;
  filterData: FilterDataInterface[];
  viewColumns: string[];
  permissions: {
    name: string;
    key: string;
    subPermissions: {
      name: string;
      value: string;
    }[]
  }[]
}

// Define the initial state using that type
const initialState: UserState = {
  totalCount: usersLists.length || 0,
  users: usersLists || [],
  permissions: permissionLists || [],
  viewColumns: [
    'name',
    'email',
    'phoneNumber',
    'address',
    'salary',
    'role',
  ],
  filterData: [
    {
      label: "Search",
      name: "searchBy",
      value: "",
      type: "text" as "text",
    },
  ],
}

export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    createUser: (state, action: PayloadAction<FormUserInterface>) => {
      state.users = [ ...state.users, { ...action.payload, id: (state.users.length + 1).toString(), status: false } ];
    },
    updateUser: (state, action: PayloadAction<UserInterface>) => {
      state.users = state.users.map(user => 
        user.id === action.payload.id ? { ...action.payload } : user
      );
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setFilterData: (state, action: PayloadAction<FilterDataInterface[]>) => {
      state.filterData = action.payload;
    },
    setViewColumns: (state, action: PayloadAction<string[]>) => {
      state.viewColumns = action.payload;
    },
  }
})

export const { createUser, setFilterData, updateUser, deleteUser, setViewColumns } = userSlice.actions

export default userSlice.reducer