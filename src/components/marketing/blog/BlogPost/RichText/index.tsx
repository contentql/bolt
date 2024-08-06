import { Blog } from '@payload-types'

import type { AdditionalBlockProps } from '@/payload/blocks/Blocks'

import Container from './Container'
import LexicalContent from './LexicalContent'

export default function RichText({
  content,
  locale,
}: { content: Blog['description'] | undefined } & AdditionalBlockProps) {
  if (content?.root?.children?.length === 0) return null
  return (
    <section className='py-2 first:mt-2'>
      <Container>
        {/* <div className='prose dark:prose-invert md:prose-lg'> */}
        {/* @ts-ignore */}
        <LexicalContent
          childrenNodes={content?.root?.children as []}
          locale={locale}
          lazyLoadImages={false}
        />
        {/* </div> */}
      </Container>
    </section>
  )
}
