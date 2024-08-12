import { revalidateTag } from 'next/cache'
import type { Field, GlobalConfig } from 'payload/types'
import { z } from 'zod'

import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'

// import iconField from '@/payload/fields/icon'

export const GLOBAL_SETTINGS_SLUG = 'site-settings'

const validateURL = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .url()

const menuItem: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'external_link',
        type: 'checkbox',
        label: 'External Link',
        defaultValue: false,
        admin: {
          description: 'Other website link',
        },
      },
      {
        name: 'new_page',
        type: 'checkbox',
        label: 'New Page',
        defaultValue: true,
        admin: {
          condition: (_data, siblingData) => siblingData.external_link,
          description: 'Open website in new-page',
        },
      },
    ],
  },
  {
    type: 'relationship',
    name: 'page',
    relationTo: [COLLECTION_SLUG_PAGE],
    admin: {
      condition: (_data, siblingData) => !siblingData.external_link,
    },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'label',
        type: 'text',
        label: 'Label',
        admin: {
          condition: (_data, siblingData) => siblingData.external_link,
        },
      },
      {
        name: 'link',
        type: 'text',
        label: 'Link',
        admin: {
          condition: (_data, siblingData) => siblingData.external_link,
        },
        validate: value => {
          const { success } = validateURL.safeParse(value)
          return success || 'Link is not valid'
        },
      },
    ],
  },
]

const menuGroupItem: Field = {
  type: 'group',
  name: 'menu_link_group',
  label: 'Link Group',
  fields: [
    {
      type: 'text',
      name: 'group_title',
      label: 'Group Title',
      required: true,
    },
    {
      type: 'array',
      name: 'group_links',
      label: 'Links',
      fields: menuItem,
    },
  ],
  admin: {
    condition: (_data, siblingData) => siblingData.group,
  },
}

const menuField: Field[] = [
  {
    type: 'checkbox',
    name: 'group',
    label: 'Group',
    defaultValue: false,
    admin: {
      description: 'Check to create group of links',
    },
  },
  {
    name: 'menu_link',
    type: 'group',
    label: 'Link',
    fields: menuItem,
    admin: {
      condition: (_data, siblingData) => !siblingData.group,
    },
  },
  menuGroupItem,
]

const logoField: Field[] = [
  {
    name: 'image_url',
    type: 'upload',
    required: true,
    relationTo: 'media',
    label: 'Image',
  },
  {
    type: 'row',
    fields: [
      {
        label: 'Height',
        name: 'height',
        type: 'number',
        admin: {
          description: 'Adjust to the height of the logo',
        },
      },
      {
        label: 'Width',
        name: 'width',
        type: 'number',
        admin: {
          description: 'Adjust to the width of the logo',
        },
      },
    ],
  },
]

const socialLinksField: Field = {
  type: 'row',
  fields: [
    {
      type: 'select',
      name: 'platform',
      label: 'Platform',
      required: true,
      options: [
        {
          label: 'Facebook',
          value: 'facebook',
        },
        {
          label: 'Instagram',
          value: 'instagram',
        },
        {
          label: 'Twitter',
          value: 'twitter',
        },
        {
          label: 'LinkedIn',
          value: 'linkedin',
        },
        {
          label: 'YouTube',
          value: 'youtube',
        },
        {
          label: 'TikTok',
          value: 'tiktok',
        },
        {
          label: 'Pinterest',
          value: 'pinterest',
        },
        {
          label: 'Snapchat',
          value: 'snapchat',
        },
        {
          label: 'Reddit',
          value: 'reddit',
        },
        {
          label: 'Tumblr',
          value: 'tumblr',
        },
        {
          label: 'WhatsApp',
          value: 'whatsapp',
        },
        {
          label: 'Telegram',
          value: 'telegram',
        },
        {
          label: 'GitHub',
          value: 'github',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Quora',
          value: 'quora',
        },
      ],
    },
    {
      type: 'text',
      name: 'value',
      label: 'Link',
      required: true,
      validate: (value, args) => {
        const { success } = validateURL.safeParse(value)
        // console.log({ success, operation }, success || 'Link is not valid')

        // return text(value, args)

        return success || 'Link is not valid'
      },
    },
  ],
}

export const siteSettings: GlobalConfig = {
  slug: GLOBAL_SETTINGS_SLUG,
  access: {
    read: () => true,
    // update: isAdmin,
  },
  hooks: {
    afterChange: [async () => revalidateTag('site-settings')],
  },
  fields: [
    {
      type: 'tabs',
      label: 'Settings',
      tabs: [
        {
          label: 'General',
          fields: [
            { type: 'text', name: 'title', required: true },
            {
              type: 'text',
              name: 'description',
              required: true,
            },
            {
              name: 'favicon_url',
              type: 'upload',
              required: true,
              relationTo: 'media',
              label: 'Favicon',
              admin: {
                description: 'We recommend a maximum size of 256 * 256 pixels',
              },
            },
            {
              name: 'og_image_url',
              type: 'upload',
              required: true,
              relationTo: 'media',
              label: 'OG Image',
            },
            {
              name: 'keywords',
              type: 'text',
              hasMany: true,
            },
          ],
        },
        {
          name: 'header',
          fields: [
            {
              name: 'logo',
              type: 'group',
              interfaceName: 'BrandLogo', // optional
              label: 'Navbar Logo',
              fields: logoField,
            },
            {
              name: 'menu_links',
              label: 'Menu Links',
              type: 'array',
              fields: menuField,
            },
          ],
        },
        {
          name: 'footer',
          fields: [
            {
              name: 'logo',
              type: 'group',
              interfaceName: 'BrandLogo', // optional
              label: 'Footer Logo',
              fields: [
                ...logoField,
                {
                  type: 'text',
                  label: 'Description',
                  name: 'description',
                  admin: {
                    description: 'This text appears below the footer image',
                  },
                },
              ],
            },
            {
              name: 'footer_links',
              type: 'array',
              label: 'Footer Links',
              fields: menuField,
            },
            {
              type: 'array',
              name: 'social_links',
              label: 'Social Links',
              fields: [socialLinksField],
            },
            { type: 'text', name: 'copyright', label: 'Copyright' },
          ],
        },
      ],
    },
  ],
}
