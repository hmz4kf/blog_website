import React from 'react';
import {useRouter} from 'next/router';
import {getPosts, getPostDetails} from '../../services';

import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader} from '../../components';

const PostDetails = ({post}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className = "container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetail post = {post}/>
                <Author author = {post.author}/>
                <CommentsForm link = {post.link}/>
                <Comments link = {post.link}/>
            </div>
            <div className="col-span-1 lg:col-span-4">
                <div className = "relative lg:sticky top-8">
                    <PostWidget link = {post.link} categories = {post.categories.map((category) => category.link)}/>
                    <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.link);
    return {
      props: {
        post: data,
      },
    };
  }

  export async function getStaticPaths() {
    const posts = await getPosts();
    return {
      paths: posts.map(({ node: { link } }) => ({ params: { link } })),
      fallback: true,
    };
  }