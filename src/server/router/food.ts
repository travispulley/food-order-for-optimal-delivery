import { createRouter } from './context'
import { z } from 'zod'

export const foodRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.food.findMany()
    },
  })
  .query('getOne', {
    input: z
      .object({
        id: z.number().nullish(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      if (input?.id !== null)
        return await ctx.prisma.food.findFirst({
          where: {
            id: input?.id,
          },
        })
    }
  })
  .mutation("create", {
    input: z
      .object({
        name: z.string().nullish(),
      }),
    async resolve({ ctx, input }) {
      let imgId: string | null = null
      return await ctx.prisma.food.create({
        data: {
          name: input?.name ?? "",
        },
      })
    }
  })
  .mutation("delete", {
    input: z
      .object({
        id: z.number(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.food.delete({
        where: {
          id: input?.id,
        },
      })
    }
  })