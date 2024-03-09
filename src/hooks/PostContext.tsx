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
  query,
  orderBy,
} from 'firebase/firestore';
import { Post } from '../types/Post';

// Context에 포함될 값의 타입 정의
interface PostContextType {
  posts: Post[]; // 포스트 배열
  addPost: (newPost: Omit<Post, 'id'>) => Promise<void>; // 새로운 포스트 추가 함수
  updatePost: (updatedPost: Post) => Promise<void>; // 포스트 업데이트 함수
  deletePost: (postId: string) => Promise<void>; // 포스트 삭제 함수
}

interface PostProviderProps {
  children: ReactNode;
}

// Firestore 데이터베이스 인스턴스 생성
const db: Firestore = getFirestore();

// Context 생성 및 초기값 지정
const PostContext = createContext<PostContextType | undefined>(undefined);

// 포스트 컨텍스트 사용을 위한 훅 정의
export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

// 포스트 컨텍스트 제공자 컴포넌트
export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
        );
        // 데이터베이스에서 포스트를 가져와서 상태 업데이트
        const postsData = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Post),
          id: doc.id,
        }));
        setPosts(postsData);
        // console.log('Posts fetched successfully:', postsData); // 성공 메시지와 데이터 콘솔 출력
      } catch (error) {
        console.error('Error fetching posts:', error); // 오류 콘솔 출력
      }
    };

    fetchPosts();
  }, []);

  // 새로운 포스트 추가 함수
  const addPost = async (newPost: Omit<Post, 'id'>): Promise<void> => {
    const timeStamp = new Date();
    const docRef = await addDoc(collection(db, 'posts'), {
      ...newPost,
      createdAt: timeStamp,
    });
    const addNewPost = { ...newPost, id: docRef.id, createdAt: timeStamp };
    setPosts([addNewPost, ...posts]); // 상태 업데이트
  };

  // 포스트 업데이트 함수
  const updatePost = async (updatedPost: Post) => {
    const postRef = doc(db, 'posts', updatedPost.id);
    await updateDoc(postRef, updatedPost as DocumentData);
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    ); // 상태 업데이트
  };

  // 포스트 삭제 함수
  const deletePost = async (postId: string) => {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
    setPosts(posts.filter((post) => post.id !== postId)); // 상태 업데이트
  };

  // 컨텍스트 제공 및 자식 컴포넌트 렌더링
  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
