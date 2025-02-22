// import { Blog } from '@payload-types'
// import { Metadata } from 'next'
import { AvatarImage } from '@radix-ui/react-avatar'
import { format } from 'date-fns'
import Image from 'next/image'
import { HiOutlineBookOpen } from 'react-icons/hi'

import { Avatar, AvatarFallback } from '@/components/common/Avatar'
import Container from '@/components/common/Container'

// import BlogPostView from '@/components/marketing/blog/BlogPost'
// import { serverClient } from '@/trpc/serverClient'
// import { generateMeta } from '@/utils/generate-meta'

// interface PageProps {
//   params: { blogSlug: string }
//   searchParams: {
//     draft: string
//   }
// }

// export const revalidate = 0

// const Page = async ({ params }: PageProps) => {
//   const { blogSlug } = params

//   const decodedSlug = decodeURIComponent(blogSlug)

//   const blog = await serverClient.blog.getBlogBySlug({
//     slug: decodedSlug as string,
//   })
//   const blogsData = await serverClient.blog.getAllBlogs()

//   return (
//     <BlogPostView
//       decodedSlug={decodedSlug}
//       blog={blog as Blog}
//       blogsData={blogsData}
//     />
//   )
// }

// export async function generateStaticParams() {
//   const allBlogs = await serverClient.blog.getAllBlogs()

//   const blogIdsArray = allBlogs.map(blog => ({ blogId: blog.id }))

//   return blogIdsArray
// }

// export const generateMetadata = async ({
//   params: { slug },
// }: {
//   params: { slug: string }
// }): Promise<Metadata> => {
//   let blog: Blog | null = null

//   try {
//     const result = await serverClient.blog.getBlogBySlug({ slug })

//     blog = result as Blog
//   } catch (error) {
//     console.error('Error fetching blog:', error)
//   }

//   // ? collectionSlug is the name of the page eg.: http://localhost:3000/blog/[id] (`blog` is the collectionSlug)
//   return generateMeta({ doc: blog, collectionSlug: 'blog' })
// }

const Page = () => {
  return (
    <Container className='max-w-2xl'>
      <div className='mb-32 space-y-16'>
        <div className='relative min-h-320 w-full'>
          <Image
            src='https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            fill
            className='h-full w-full rounded object-cover'
          />
        </div>

        <h1 className='text-lg font-semibold md:text-xl'>
          Easy real-time notifications with Supabase Realtime
        </h1>

        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-12'>
            <Avatar>
              <AvatarImage src='' />
              <AvatarFallback className='text-sm'>CN</AvatarFallback>
            </Avatar>

            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Bolt</span>
              <span className='text-sm text-secondary'>
                {format(new Date(), 'LLL io, yyyy')}
              </span>
            </div>
          </div>

          <span className='flex items-center gap-4 text-sm text-secondary'>
            <HiOutlineBookOpen className='text-base' />
            10 min read
          </span>
        </div>
      </div>

      <article className='prose text-base dark:prose-invert prose-headings:text-primary prose-img:max-h-320 prose-img:w-full prose-img:rounded prose-img:object-cover'>
        <p>
          Waste management involves collecting, transporting, processing, and
          disposing of waste materials. It’s crucial for keeping our environment
          clean and safe. India generates a lot of waste, and managing it
          properly is essential for protecting our health and the environment.
        </p>
        <p>
          <strong>Environmental Impact:</strong>
        </p>
        <ul>
          <li>
            Improper waste disposal harms the environment. It can lead to air,
            water, and soil pollution.
          </li>
          <li>
            For example, plastic waste clogs rivers and oceans, harming marine
            life and affecting the water supply.
          </li>
        </ul>
        <p>
          <strong>Health Implications:</strong>
        </p>
        <ul>
          <li>Poor waste management can cause serious health problems.</li>
          <li>
            People living near poorly managed waste sites can suffer from
            respiratory issues, skin infections, and other health problems due
            to exposure to toxins and pollutants.
          </li>
        </ul>
        <p>
          <strong>Economic Benefits:</strong>
        </p>
        <ul>
          <li>
            Proper waste management creates jobs in recycling and waste
            processing industries.
          </li>
          <li>
            Recycling helps save money and resources by reusing materials
            instead of extracting new ones.
          </li>
        </ul>
        <p>
          <strong>Conclusion:</strong>
          Proper waste management is essential for a clean environment, healthy
          communities, and a strong economy. Everyone has a role to play in
          managing waste responsibly. By doing so, we can protect our planet and
          improve the quality of life for ourselves and future generations.
        </p>
      </article>
    </Container>
  )
}

export default Page
