import { defineField, defineType } from 'sanity'

export const partnerCategoryType = defineType({
  name: 'partnerCategory',
  title: 'Partner Category',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Category Key',
      type: 'string',
      description: 'Unique identifier (collectors, artists, etc.)',
    }),
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})