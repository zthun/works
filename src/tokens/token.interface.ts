export interface IZToken {
  _id: string;
  accessTokenExpiresAt: Date | string;
  refreshToken: string;
  refreshTokenExpiresAt: Date | string;
  userId?: string;
}
