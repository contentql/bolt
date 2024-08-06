import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import path from 'path'

import { sendMessageToClient } from '@/lib/clients'
import { seed } from '@/payload/seed'
import { blogPosts } from '@/payload/seed/data/blogs'
import { homePageData } from '@/payload/seed/data/home'
import { Tags } from '@/payload/seed/data/tags'

const CLIENT_ID = '1'

const notifyClient = async (message: string) => {
  sendMessageToClient(CLIENT_ID, JSON.stringify({ message }))
}

const seeding = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  console.log('Starting the seeding process')
  notifyClient('Starting the seeding process')

  const contentqlImageSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'media',
        seed: [
          {
            data: {
              alt: 'Contentql Logo',
            },
            options: {
              filePath: path.join(
                process.cwd(),
                '/public/images/seed/contentql-logo.png',
              ),
            },
          },
        ],
      },
    ],
  })

  const contentqlImageSeedResultData =
    contentqlImageSeedResult.collectionsSeedingResult.at(0)?.status !==
      'skipped' &&
    contentqlImageSeedResult.collectionsSeedingResult.at(0)?.results.at(0)
      .status === 'fulfilled'
      ? contentqlImageSeedResult.collectionsSeedingResult.at(0)?.results.at(0)
          .data
      : {
          id: '',
          url: '',
        }

  const demoUserImageSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'media',
        seed: [
          {
            data: {
              alt: 'Demo Author',
            },
            options: {
              filePath: path.join(
                process.cwd(),
                '/public/images/seed/demo-user.webp',
              ),
            },
          },
        ],
      },
    ],
    skipSeeding: false,
  })

  const demoUserImageSeedResultData =
    demoUserImageSeedResult.collectionsSeedingResult.at(0)?.status !==
      'skipped' &&
    demoUserImageSeedResult.collectionsSeedingResult.at(0)?.results.at(0)
      .status === 'fulfilled'
      ? demoUserImageSeedResult.collectionsSeedingResult.at(0)?.results.at(0)
          .data
      : {
          id: '',
          url: '',
        }

  const demoUserSeedingResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'users',
        seed: [
          {
            data: {
              name: 'DemoAuthor',
              email: 'demo.author@contentql.io',
              password: 'password',
              role: 'author',
              imageUrl: demoUserImageSeedResultData.url,
            },
            options: {
              context: {
                preventRoleOverride: true,
              },
            },
          },
        ],
      },
    ],
  })

  if (
    demoUserSeedingResult.collectionsSeedingResult.at(0)?.status === 'fulfilled'
  ) {
    notifyClient('Demo user loaded successfully.')
  } else {
    notifyClient('Error while loading demo user.')
  }

  const demoUserId =
    demoUserSeedingResult.collectionsSeedingResult.at(0)?.status !==
      'skipped' &&
    demoUserSeedingResult.collectionsSeedingResult.at(0)?.results.at(0)
      .status === 'fulfilled'
      ? demoUserSeedingResult.collectionsSeedingResult.at(0)?.results.at(0).data
          .id
      : ''

  const TagsImagesFormattedData = [
    {
      data: { alt: 'tag image-1' },
      options: {
        filePath: path.join(
          process.cwd(),
          '/public/images/seed/contentql-logo.png',
        ),
      },
    },
    {
      data: { alt: 'tag image-2' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/tag-ai.png'),
      },
    },
    {
      data: { alt: 'tag image-3' },
      options: {
        filePath: path.join(
          process.cwd(),
          '/public/images/seed/tag-Entrepreneurship.webp',
        ),
      },
    },
    {
      data: { alt: 'tag image-4' },
      options: {
        filePath: path.join(
          process.cwd(),
          '/public/images/seed/tag-projectmanagement.webp',
        ),
      },
    },
  ]

  const TagsImagesSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'media',
        seed: [...TagsImagesFormattedData],
      },
    ],
    skipSeeding: false,
  })

  const formattedTagsData = Tags.map((tag, index) => {
    const tagImageId =
      TagsImagesSeedResult.collectionsSeedingResult.at(0)?.status !==
        'skipped' &&
      TagsImagesSeedResult.collectionsSeedingResult.at(0)?.results.at(index)
        .status === 'fulfilled'
        ? TagsImagesSeedResult.collectionsSeedingResult.at(0)?.results.at(index)
            .data.id
        : ''
    return {
      data: {
        ...tag,
        tagImage: tagImageId,
      },
    }
  })

  const tagsSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'tags',
        seed: [...formattedTagsData],
      },
    ],
  })

  if (tagsSeedResult.collectionsSeedingResult.at(0)?.status === 'fulfilled') {
    notifyClient('Tags loaded successfully.')
  } else {
    notifyClient('Error while loading tags.')
  }

  const blogsImagesFormattedData = [
    {
      data: { alt: 'blog image-1' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-1.jpg'),
      },
    },
    {
      data: { alt: 'blog image-2' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-2.jpg'),
      },
    },
    {
      data: { alt: 'blog image-3' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-3.jpg'),
      },
    },
    {
      data: { alt: 'blog image-4' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-4.jpg'),
      },
    },
    {
      data: { alt: 'blog image-5' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-5.jpg'),
      },
    },
    {
      data: { alt: 'blog image-6' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-6.jpg'),
      },
    },
    {
      data: { alt: 'blog image-7' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-7.jpg'),
      },
    },
    {
      data: { alt: 'blog image-8' },
      options: {
        filePath: path.join(process.cwd(), '/public/images/seed/blog-8.jpg'),
      },
    },
  ]

  // ? If you are seeding a collection/global that is already seeded, then need to add option skipSeeding as false.
  // ? Make sure while using skipSeeding because it will directly depend on the seeding data.
  const blogsImagesSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'media',
        seed: [...blogsImagesFormattedData],
      },
    ],
    skipSeeding: false,
  })

  const formattedBlogPostsData: any = blogPosts.map((blogPost, index) => {
    const blogImageId =
      blogsImagesSeedResult.collectionsSeedingResult.at(0)?.status !==
        'skipped' &&
      blogsImagesSeedResult.collectionsSeedingResult.at(0)?.results.at(index)
        ?.status === 'fulfilled'
        ? blogsImagesSeedResult.collectionsSeedingResult
            .at(0)
            ?.results.at(index).data.id
        : ''

    const tagId =
      tagsSeedResult.collectionsSeedingResult.at(0)?.status !== 'skipped' &&
      tagsSeedResult.collectionsSeedingResult.at(0)?.results.at(index % 4)
        ?.status === 'fulfilled'
        ? tagsSeedResult.collectionsSeedingResult.at(0)?.results.at(index % 4)
            .data.id
        : ''

    return {
      data: {
        ...blogPost,
        blog_image: blogImageId,
        author: [
          {
            relationTo: 'users',
            value: demoUserId,
          },
        ],
        tags: [
          {
            relationTo: 'tags',
            value: tagId,
          },
        ],
      },
    }
  })

  const blogsSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'blogs',
        seed: [...formattedBlogPostsData],
      },
    ],
  })

  if (blogsSeedResult.collectionsSeedingResult.at(0)?.status === 'fulfilled') {
    notifyClient('Blogs loaded successfully.')
  } else {
    notifyClient('Error while loading blogs.')
  }

  const homePageSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'pages',
        seed: [
          {
            data: {
              ...homePageData,
            },
          },
        ],
      },
    ],
    skipSeeding: false,
  })
  if (
    homePageSeedResult.collectionsSeedingResult.at(0)?.status === 'fulfilled'
  ) {
    notifyClient('Home page loaded successfully.')
  } else {
    notifyClient('Error while loading blog page.')
  }
  notifyClient(`Seeding process completed.`)
  sendMessageToClient(CLIENT_ID, JSON.stringify({ success: true }))
}

export default seeding
