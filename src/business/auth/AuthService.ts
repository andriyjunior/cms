import ApiClient from "business/shared/ApiClient";
import { AuthModel } from "models/auth";
import { UserModel } from "models/user";

class AuthService extends ApiClient {
  async login(email: string, password: string) {
    return await this.post<AuthModel>("auth/login", { email, password });
  }

  async registration(email: string, password: string) {
    return await this.post<UserModel>("auth/registration", { email, password });
  }
}

export const authService = new AuthService();
