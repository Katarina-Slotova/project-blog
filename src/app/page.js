import React from 'react'

import BlogSummaryCard from '@/components/BlogSummaryCard'

import styles from './homepage.module.css'

import { getBlogPostList } from '../helpers/file-helpers'

async function Home() {
  const blogPostList = await getBlogPostList()
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* TODO: Iterate over the data read from the file system! */}
      {blogPostList.map(({ slug, title, abstract, publishedOn }) => (
        <BlogSummaryCard
          key={slug}
          slug={slug}
          title={title}
          abstract={abstract}
          publishedOn={publishedOn}
        />
      ))}
    </div>
  )
}

export default Home
