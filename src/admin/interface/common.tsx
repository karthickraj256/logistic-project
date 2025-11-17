export interface SelectBoxListItem {
    id: string | number;
    name: string;
};

export type SelectBoxList = SelectBoxListItem[];

export interface SidebarMenusInterface {
    icon: React.ReactNode,
    name: string,
    route: string,
    active: boolean,
};