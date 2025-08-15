import {defineField, defineType} from 'sanity'

export const festivalSectionType = defineType({
  name: 'festivalSection',
  title: 'Festival Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'Unique identifier for the section (e.g., about, partners, ontheway)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
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
      name: 'content',
      title: 'Section Content',
      type: 'object',
      fields: [
        {
          name: 'fr',
          title: 'French',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'Heading 1', value: 'h1'},
                {title: 'Heading 2', value: 'h2'},
                {title: 'Heading 3', value: 'h3'},
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                  {title: 'Accent', value: 'accent'},
                ],
              },
            },
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'Heading 1', value: 'h1'},
                {title: 'Heading 2', value: 'h2'},
                {title: 'Heading 3', value: 'h3'},
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                  {title: 'Accent', value: 'accent'},
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Section Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'object',
              title: 'Caption',
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
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this section appears on the page',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      sectionId: 'sectionId',
      order: 'order',
    },
    prepare(selection) {
      const {title, sectionId, order} = selection
      return {
        title: title || sectionId || 'Untitled Section',
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