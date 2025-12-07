export interface SelectBoxListItem {
  id: string | number;
  name: string;
}

export type SelectBoxList = SelectBoxListItem[];

export interface SidebarMenusInterface {
  icon: React.ReactNode;
  name: string;
  route: string;
  active: boolean;
}

export interface FilterDataInterface {
  label: string;
  name: string;
  value: string | number;
  name1?: string;
  value1?: string | number;
  type: "text" | "select" | "date" | "dateRange";
  dataList?: any[];
  placeholder?: string;
}

export interface ModalContentInterface {
  status: boolean;
  content: React.ReactNode;
  title: string;
  header: boolean;
}
