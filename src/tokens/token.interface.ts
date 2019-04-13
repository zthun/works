export interface IZToken {
  _id: string;
  accessToken: string;
  accessTokenExpiresAt: Date | string;
  refreshToken: string;
  refreshTokenExpiresAt: Date | string;
  userId?: string;
}
