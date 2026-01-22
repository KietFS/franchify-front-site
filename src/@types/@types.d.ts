// Type definitions for the application

// Product related interfaces
export interface IProduct {
    id?: string;
    upc?: string;
    name: string;
    thumbnail?: string;
    images?: string[];
    fullDescription?: string;
    category?: ICategory;
    price?: IPrice;
    properties?: Record<string, any>;
}

export interface ICategory {
    id?: string;
    name: string;
    properties?: ICategoryProperty[];
}

export interface ICategoryProperty {
    name: string;
    displayName: string;
    type?: string;
}

export interface IPrice {
    displayPrice: string;
    salePrice?: number;
    displaySalePrice?: string;
    amount?: number;
}

export interface IStoreProduct {
    id?: string;
    product: IProduct;
    price: IPrice;
    storeId?: string;
    quantity?: number;
}

// Order and User related interfaces
export interface ICreateOrderUserInfo {
    phoneNumber: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface IUser {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

// Cart related interfaces
export interface ICartDetail {
    id?: string;
    product: IProduct;
    quantity: number;
    storeProduct?: IStoreProduct;
}

export interface ICart {
    id?: string;
    userId?: string;
    cartDetails: ICartDetail[];
    totalAmount?: number;
}

// Store related interfaces
export interface IStore {
    id?: string;
    name: string;
    address?: string;
    phoneNumber?: string;
}

// Config related interfaces
export interface ITenantConfig {
    companyLegalName?: string;
    fullDescription?: string;
    [key: string]: any;
}
