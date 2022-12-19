import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Nextauth from "../../pages/api/auth/[...nextauth]";
import { trpc } from "../../utils/trpc";
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

export const requireAdmin =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      Nextauth
    );
    

    if (!session) {
      
      return {
        redirect: {
          destination: "/login", // login path
          permanent: false,
        },
      };
    }

    console.log(session);


    // if (){
    //   return {
    //     redirect: {
    //       destination: "/error", // login path
    //       permanent: false,
    //     },
    //   };
    // }
    
    return await func(ctx);
};
