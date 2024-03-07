import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewPost from './components/NewPost';
import { useState } from 'react';
import EditPost from './components/EditPost';
function App() {
  const [posts, setPosts] = useState([
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
  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id.toString() !== postId));
  };
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  console.log(posts);

  function updatePost(updatedPost) {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  }
  return (
    <div>
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
    </div>
  );
}

export default App;
