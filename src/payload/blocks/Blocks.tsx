import RichText from '../../components/marketing/blog/BlogPost/RichText'

import { Test } from '@/payload/blocks/Test'

// const Test = dynamic(() => import('@/payload/blocks/Test') as Promise<any>)

export type AdditionalBlockProps = {
  blockIndex: number
  locale: string
}

const blockComponents = {
  Test,
  RichText,
}

const Blocks = ({ blocks, locale }: any) => {
  return (
    <>
      {blocks
        ?.filter(
          (block: any) =>
            block &&
            block.blockType &&
            blockComponents.hasOwnProperty(block.blockType),
        )
        .map((block: any, ix: number) => {
          // @ts-ignore
          const BlockComponent = blockComponents[block.blockType] ?? null
          return BlockComponent ? (
            <BlockComponent
              key={ix}
              {...block}
              blockIndex={ix}
              locale={locale}
            />
          ) : null
        })}
    </>
  )
}

export default Blocks
