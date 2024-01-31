import React from 'react'

import BlogHero from '@/components/BlogHero'

import styles from './postSlug.module.css'

import { loadBlogPost } from '../../helpers/file-helpers'

import { MDXRemote } from 'next-mdx-remote/rsc'

async function BlogPost({ params }) {
  const {frontmatter, content} = await loadBlogPost(params.postSlug)
  return (
    <article className={styles.wrapper}>
      <BlogHero title={frontmatter.title} publishedOn={frontmatter.publishedOn} />
      <div className={styles.page}>
				<MDXRemote source={content}/>
        {/* <p>This is where the blog post will go!</p>
        <p>
          You will need to use <em>MDX</em> to render all of the elements
          created from the blog post in this spot.
        </p> */}
      </div>
    </article>
  )
}

export default BlogPost
