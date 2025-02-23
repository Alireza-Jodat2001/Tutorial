export interface SignUpFormValues {
  phone_number: string;
  password: string;
}

interface SignupResponse {
  access_token: string;
  refresh_token: string;
}

export type CallSignUpApiFunction = (data: SignUpFormValues) => Promise<SignupResponse>;

export type SetTokenCookiesFunction = (data: SignupResponse) => void;
