import {
  collection,
  addDoc,
  getDocs,
  limit,
  query,
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  doc,
  updateDoc,
  FirestoreDataConverter,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { Comment, NewPost, Post } from "./firestore.types";

enum CollectionName {
  Posts = "posts",
  Comments = "comments",
}

export const createPost = async (post: NewPost): Promise<Post> => {
  try {
    const docRef = await addDoc(collection(db, CollectionName.Posts), post);
    console.log("Document written with ID: ", docRef.id, docRef);

    return {
      id: docRef.id.toString(),
      ...post,
    };
  } catch (e) {
    console.error("firestore createPost error", e);
    throw e;
  }
};

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore: (data: Post) => data as DocumentData,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({ ...snap.data(), id: snap.id } as Post),
};

export const getPosts = async ({
  size = 5,
}: {
  size?: number;
} = {}): Promise<Post[]> => {
  const postsCollection = collection(db, CollectionName.Posts);
  const q = query(postsCollection, limit(size));

  const snapshot: QuerySnapshot<Post> = await getDocs(
    q.withConverter(postConverter)
  );

  return snapshot.docs.map((doc) => doc.data());
};

export const getPostById = async (postId: string): Promise<Post | null> => {
  const userDocRef = doc(db, CollectionName.Posts, postId).withConverter<Post>(
    postConverter
  );

  const userDoc = await getDoc(userDocRef);

  return userDoc.exists() ? userDoc.data() : null;
};

export const addCommentToPost = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: Comment;
}): Promise<Post> => {
  try {
    const post = await getPostById(postId);

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    post.comments.push(comment);

    const updatedPost = await updatePost(postId, {
      comments: post.comments,
    });

    return updatedPost;
  } catch (e) {
    console.error("firestore createComment error", e);
    throw e;
  }
};

export const updatePost = async (
  postId: string,
  post: Partial<Post>
): Promise<Post> => {
  const docRef = doc(db, CollectionName.Posts, postId);

  console.log("updatePostpost", post);
  await updateDoc(docRef, post);

  const updatedPost = await getPostById(postId);
  if (!updatedPost) {
    throw new Error(`Post with id ${postId} not found`);
  }

  return updatedPost;
};
