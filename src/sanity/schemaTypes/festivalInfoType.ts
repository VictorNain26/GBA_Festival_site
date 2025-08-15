import {defineField, defineType} from 'sanity'

export const festivalInfoType = defineType({
  name: 'festivalInfo',
  title: 'Festival Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Festival Title',
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
      name: 'subtitle',
      title: 'Subtitle',
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
      name: 'date',
      title: 'Date',
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
      name: 'location',
      title: 'Location',
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
      name: 'cta',
      title: 'Call to Action Button',
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
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'subtitle.fr',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Festival Information',
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
})