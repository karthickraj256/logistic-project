export interface ConsumerInterface {
    id: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    gstNumber: string;
    panNumber: string;
    totalOrder?: string;
};

export type ConsumerListInterface = ConsumerInterface[];