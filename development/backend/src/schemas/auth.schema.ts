import { TypeOf, object, string } from "zod";

export const authSchema = {
  login: object({
    body: object({
      email: string({ required_error: "กรุณาระบุ E-mail" })
        .email("รูปแบบ E-mail ไม่ถูกต้อง")
        .min(1, { message: "กรุณาระบุ E-mail" })
        .transform((value) => value.trim().toLowerCase()),
      password: string({ required_error: "กรุณาระบุ Password" }),
    }),
  }),
};

export type AuthType = { login: TypeOf<typeof authSchema.login>["body"] };
