export interface ConsumerInterface {
    id: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    gstNumber: string;
    panNumber: string;
    totalOrder?: number;
};

export interface FormConsumerInterface {
    fullName: string;
    phoneNumber: string;
    address: string;
    gstNumber: string;
    panNumber: string;
    totalOrder?: number;
};

export type ConsumerListInterface = ConsumerInterface[];