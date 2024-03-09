import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
} from 'firebase/firestore';
import { Post } from '../types/Post';

// Context에 포함될 값의 타입 정의
interface PostContextType {
  posts: Post[];
  addPost: (newPost: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (updatedPost: Post) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

// Firestore 데이터베이스 인스턴스 생성
const db: Firestore = getFirestore();

// Context 생성 및 초기값 지정
const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          if ('title' in data && 'content' in data) {
            // 더 엄격한 타입 체크
            return { id: doc.id, ...data } as Post; // Post 타입으로 변환
          } else {
            // 데이터가 예상된 형식이 아닐 때의 처리 로직
            console.error('Invalid post data format', data);
            return null;
          }
        })
        .filter((post): post is Post => post !== null); // null 값을 제거하여 Post[] 타입을 보장

      setPosts(postsData); // 상태 업데이트
    };

    fetchPosts();
  }, []);

  // 데이터 추가
  const addPost = async (newPost: Omit<Post, 'id'>) => {
    const docRef = await addDoc(
      collection(db, 'posts'),
      newPost as DocumentData,
    );
    setPosts([...posts, { ...newPost, id: docRef.id }]);
  };

  // 데이터 수정
  const updatePost = async (updatedPost: Post) => {
    const postRef = doc(db, 'posts', updatedPost.id);
    await updateDoc(postRef, updatedPost as DocumentData);
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  // 데이터 삭제
  const deletePost = async (postId: string) => {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
