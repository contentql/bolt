import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'
import { publicProcedure, router } from '@/trpc'
import ensurePath from '@/utils/ensurePath'

const payload = await getPayloadHMR({
  config: configPromise,
})

export const pageRouter = router({
  getPageData: publicProcedure
    .input(
      z.object({
        path: z.any(),
      }),
    )
    .query(async ({ input }) => {
      try {
        let { path } = input
        if (!path) path = '/'
        if (Array.isArray(path)) path = path.join('/')
        if (path !== '/') path = ensurePath(path).replace(/\/$/, '')

        const { docs } = await payload.find({
          collection: COLLECTION_SLUG_PAGE,
          where: { path: { equals: path } },
          depth: 3,
        })

        if (!docs?.length) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found' })
        }

        return docs.at(0)
      } catch (error: any) {
        if (error instanceof TRPCError) {
          throw error
        }

        console.error('Error fetching page data:', error)

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        })
      }
    }),

  getAllPages: publicProcedure.query(async () => {
    try {
      const { docs } = await payload.find({
        collection: 'pages',
        draft: false,
      })

      return docs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),
})
