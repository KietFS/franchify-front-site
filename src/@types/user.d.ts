interface IUser {
    id: number;
    username: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    savePoints: number;
    email: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    [key: string]: any;
}

interface IUserLoginPayload{
    phoneNumber: string;
    password: string;
}

interface IUserRegisterPayload{
    phoneNumber: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}
