export type PasswordTokenType = {
  payload: {
    input: string,
    iat: number
    exp: number
  },
  expired: boolean
}

export type AccessTokenType = {
  payload: {
    input: {
      id: string;
      email: string;
      userId: string;
      organizationId: string;
    },
    iat: number
    exp: number
  },
  expired: boolean
}

export type JWTPayload = {
  id: string;
  email: string;
  organizationId: string;
}

