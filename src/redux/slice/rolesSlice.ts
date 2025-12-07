import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import roleLists from "../../assets/json/admin/role.json";
import permissionLists from "../../assets/json/admin/permissions.json";
import { FilterDataInterface } from '../../admin/interface/common';
import { FormRoleInterface, RoleInterface, RoleListInterface } from '../../admin/interface/role';

// Define a type for the slice state
export interface RoleState {
  totalCount: number;
  roles: RoleListInterface;
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
const initialState: RoleState = {
  totalCount: roleLists.length || 0,
  roles: roleLists || [],
  permissions: permissionLists || [],
  viewColumns: [
    'roleName',
    'permissions',
    'totalUsers',
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

export const roleSlice = createSlice({
  name: 'roles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    createRole: (state, action: PayloadAction<FormRoleInterface>) => {
      state.roles = [ ...state.roles, { ...action.payload, id: (state.roles.length + 1).toString() } ];
    },
    updateRole: (state, action: PayloadAction<RoleInterface>) => {
      state.roles = state.roles.map(role => 
        role.id === action.payload.id ? { ...action.payload } : role
      );
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
    setFilterData: (state, action: PayloadAction<FilterDataInterface[]>) => {
      state.filterData = action.payload;
    },
    setViewColumns: (state, action: PayloadAction<string[]>) => {
      state.viewColumns = action.payload;
    },
  }
})

export const { createRole, setFilterData, updateRole, deleteRole, setViewColumns } = roleSlice.actions

export default roleSlice.reducer