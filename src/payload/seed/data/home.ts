import { Page } from 'payload-types'

export const homePageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Home Page',
  isHome: true,
  _status: 'published',
  blocks: [
    {
      blockType: 'Test',
      heading: 'Develop your own',
      sub_heading: 'Theme With Cql',
    },
  ],
}
