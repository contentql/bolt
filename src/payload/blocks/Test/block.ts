import { Block } from 'payload/types'

export const Test_Block: Block = {
  slug: 'Test',
  // imageURL: '',
  interfaceName: 'TestType',
  labels: {
    singular: 'Test Block',
    plural: 'Test Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'sub_heading',
      type: 'text',
      label: 'Sub Heading',
    },
  ],
}
