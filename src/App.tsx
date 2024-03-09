import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import NotFound from './components/NotFound';
import GlobalStyle from './GlobalStyle';
import { usePosts } from './hooks/PostContext';
import { Post } from './types/Post';

function App() {
  const { posts, addPost, updatePost, deletePost } = usePosts();

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PostList posts={posts} />} />
          <Route
            path='/postDetail/:postId'
            element={<PostDetail posts={posts} onDelete={deletePost} />}
          />
          <Route
            path='/newPost'
            element={<NewPost onAddPost={addPost} posts={posts} />}
          />
          <Route
            path='/editPost/:postId'
            element={<EditPost updatePost={updatePost} posts={posts} />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
