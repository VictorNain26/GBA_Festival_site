/**
 * Storyblok API configuration
 */

import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/react';

// Initialize Storyblok for server-side usage
const token = process.env['NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN'];
if (token) {
  storyblokInit({
    accessToken: token,
    use: [apiPlugin],
  });
}

// Get the Storyblok API instance
export const storyblokApi = getStoryblokApi();