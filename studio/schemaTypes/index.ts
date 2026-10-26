import {author} from './documents/author'
import {blogPost, companyNews, researchArticle} from './documents/editorial'
import {category} from './documents/category'
import {richText} from './objects/rich-text'
import {seo} from './objects/seo'

export const schemaTypes = [blogPost, companyNews, researchArticle, author, category, richText, seo]
