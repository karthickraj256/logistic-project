export interface RoleInterface {
    id: string;
    roleName: string;
    permissions: string[];
    totalUsers: number;
};

export interface FormRoleInterface {
    roleName: string;
    permissions: string[];
    totalUsers: number;
};

export type RoleListInterface = RoleInterface[];