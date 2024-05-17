import { UserType } from "../Auth/user-type";

export interface UserDTO {
    email:string;
    password:string;
    passwordConfirm:string;
    document:string;
    firstName:string;
    lastName:string;
    address:string;
    photo?:string;
    cityId:string;
    userName:string;
    userType:UserType;
    phoneNumber:string;
}
