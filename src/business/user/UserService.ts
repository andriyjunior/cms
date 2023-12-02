import ApiClient from "business/shared/ApiClient";
import { UserModel } from "models/user";

class UserService extends ApiClient {
  async getUserInfo() {
    return await this.get<UserModel>("/user");
  }
}

export const userService = new UserService();
