import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NotFound from './components/NotFound';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import GlobalStyle from './GlobalStyle';

interface Post {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1709772356098,
      title: '아이유',
      content: '내가 좋아하는 가수다. 가을 아침이라는 곡을 불렀다.',
    },
    {
      id: 1709773626458,
      title: '가수',
      content: '노래부르는 사람의 직업을 의미한다',
    },
    {
      id: 1709811832865,
      title: '카더가든',
      content: '가수',
    },
    { id: 1709811886914, title: '르세라핌', content: '아이돌이다.' },
    { id: 1709811915785, title: '배우', content: '연기하는 사람' },
    { id: 1709811932668, title: '이수혁', content: '배우이자 모델이다.' },
  ]);

  const deletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id.toString() === postId));
  };

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

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
            element={<EditPost posts={posts} updatePost={updatePost} />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
