import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string | null | undefined;
      firstname: string | null | undefined;
      lastname: string | null | undefined;
      is_admin: boolean | null | undefined;
      is_editor: boolean | null | undefined;
    } & DefaultSession["user"];
  }
}
