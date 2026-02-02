export interface UserInterface {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  address: string;
  salary: number;
  role: string;
  roleName: string;
  status: boolean;
  accountDetails: {
    accountNumber: string;
    bankName: string;
    ifcNumber: string;
    branch: string;
  };
}

export interface FormUserInterface {
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  address: string;
  salary: number;
  role: string;
  roleName: string;
  accountDetails: {
    accountNumber: string;
    bankName: string;
    ifcNumber: string;
    branch: string;
  };
}

export type UserListInterface = UserInterface[];
