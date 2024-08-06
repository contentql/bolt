// This is just to consolidate all the existing blocks and it's respective jsx
// Always prefer to individually import, the required block or jsx
import { Test } from './Test'
import { Test_Block } from './Test/block'

export const blocksJSX = {
  Test,
}

export type SlugType = keyof typeof blocksJSX

export const blocks = [Test_Block]
