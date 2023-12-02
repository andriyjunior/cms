import { AuthModel } from "models/auth";

class TokenService {
  private key = "user";

  getLocalRefreshToken() {
    const item = localStorage.getItem(this.key);

    if (item) {
      const user = JSON.parse(item);
      return user?.refreshToken;
    }
  }

  getLocalAccessToken() {
    const item = localStorage.getItem(this.key);

    if (item) {
      const user = JSON.parse(item);
      return user?.accessToken;
    }
  }

  updateLocalAccessToken(token: string) {
    const item = localStorage.getItem(this.key);

    if (item) {
      const user = JSON.parse(item);
      user.accessToken = token;
      localStorage.setItem(this.key, JSON.stringify(user));
    }
  }

  getTokenInfo(): AuthModel | undefined {
    const item = localStorage.getItem(this.key);

    if (item) {
      return JSON.parse(item);
    }
  }

  setTokenInfo(tokenInfo: AuthModel) {
    localStorage.setItem(this.key, JSON.stringify(tokenInfo));
  }

  removeUser() {
    localStorage.removeItem(this.key);
  }
}

export const tokenService = new TokenService();
