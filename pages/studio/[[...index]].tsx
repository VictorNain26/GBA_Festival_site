import { NextStudio } from 'next-sanity/studio'
import { metadata } from 'next-sanity/studio'
import config from '../../sanity.config'

export { metadata }

export default function StudioPage() {
  return <NextStudio config={config} />
}