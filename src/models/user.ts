import { UserRoles } from "enums/UserRoles";
import { OrganizationModel } from "./organization";

type UserInfoModel = {
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
};

export type UserModel = {
  _id: string;
  username: string;
  email: string;
  role: UserRoles;
  password: string;
  userInfo: UserInfoModel;
  organizations?: string[] | OrganizationModel[];
  createdAt: string;
  updatedAt: string;
};
