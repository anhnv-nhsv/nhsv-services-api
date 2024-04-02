export type AuthConfig = {
  secret?: string;
  otpVerifySecret?: string;
  expires?: string;
  lotteBaseUrl?: string;
  lotteApiKey?: string;
  // refreshSecret?: string;
  // refreshExpires?: string;
  // forgotSecret?: string;
  // forgotExpires?: string;
  // confirmEmailSecret?: string;
  // confirmEmailExpires?: string;
};
