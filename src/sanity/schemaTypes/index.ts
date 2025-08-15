import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {festivalInfoType} from './festivalInfoType'
import {festivalSectionType} from './festivalSectionType'
import {partnerCategoryType} from './partnerCategoryType'
import {contactInfoType} from './contactInfoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType,
    // Festival content types
    festivalInfoType,
    festivalSectionType,
    partnerCategoryType,
    contactInfoType,
  ],
}
