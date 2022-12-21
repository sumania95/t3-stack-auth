import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Nextauth from "../../pages/api/auth/[...nextauth]";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { prisma } from "../db/client";
export const requireAuth =
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

    return await func(ctx);
  };

export const alreadyAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      Nextauth
    );

    if (session) {
      return {
        redirect: {
          destination: "/", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
};
export const isEditor =
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
    const { email } = session as {email: string};
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
            id: true,
            email: true,
            is_admin: true,
            is_editor: true,
      }
    })
    const {is_admin,is_editor} = data as {is_admin: boolean,is_editor: boolean};
    if (!is_admin || !is_editor) {
      return {
        redirect: {
          destination: "/", // login path
          permanent: false,
        },
      };
    }
    return await func(ctx);
};

export const isAdmin =
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
    const { email } = session as {email: string};
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
            id: true,
            email: true,
            is_admin: true,
      }
    })
    const {is_admin} = data as {is_admin: boolean};
    if (!is_admin) {
      return {
        redirect: {
          destination: "/", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
};

