import { defineField, defineType } from 'sanity'

export const sectionType = defineType({
  name: 'section',
  title: 'Section Content',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Section Key',
      type: 'string',
      description: 'Unique identifier for the section (about, partners, etc.)',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        { 
          name: 'fr', 
          title: 'French', 
          type: 'array',
          of: [{ type: 'blockContent' }]
        },
        { 
          name: 'en', 
          title: 'English', 
          type: 'array',
          of: [{ type: 'blockContent' }]
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', options: { hotspot: true } },
            { name: 'alt', type: 'string', title: 'Alt text' },
          ],
        },
      ],
    }),
  ],
})