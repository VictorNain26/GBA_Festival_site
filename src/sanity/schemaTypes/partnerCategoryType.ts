import {defineField, defineType} from 'sanity'

export const partnerCategoryType = defineType({
  name: 'partnerCategory',
  title: 'Partner Category',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Category Key',
      type: 'string',
      description: 'Unique identifier for this category',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'object',
      fields: [
        {
          name: 'fr',
          title: 'French',
          type: 'string',
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'object',
      fields: [
        {
          name: 'fr',
          title: 'French',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category appears',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      key: 'key',
      order: 'order',
    },
    prepare(selection) {
      const {title, key, order} = selection
      return {
        title: title || key || 'Untitled Category',
        subtitle: `Order: ${order || 'Not set'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})