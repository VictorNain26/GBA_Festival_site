import {defineField, defineType} from 'sanity'

export const contactInfoType = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Contact Heading',
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
      name: 'intro',
      title: 'Introduction Text',
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
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Phone number for WhatsApp contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'whatsappLabel',
      title: 'WhatsApp Label',
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
      title: 'heading.fr',
      email: 'email',
      phone: 'phone',
    },
    prepare(selection) {
      const {title, email, phone} = selection
      return {
        title: title || 'Contact Information',
        subtitle: `${email || 'No email'} • ${phone || 'No phone'}`,
      }
    },
  },
})