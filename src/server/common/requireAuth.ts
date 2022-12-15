import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Nextauth from "../../pages/api/auth/[...nextauth]";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      Nextauth
    );
    console.log(session);
    
    if (!session) {
      return {
        redirect: {
          destination: "/login", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
