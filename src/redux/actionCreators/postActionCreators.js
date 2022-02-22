import { toast } from "react-toastify";
import { firestore, storage } from "../../config/firebase";
import * as types from "../types/postTypes";

//action
export const setLoading = (data) => ({
  type: types.SET_LOADING,
  payload: data,
});

const addPost = (data) => ({
  type: types.ADD_POST,
  payload: data,
});

const getPosts = (data) => ({
  type: types.SET_POSTS,
  payload: data,
});

const resetPosts = () => ({
  type: types.RESET_POST,
});
const addComment = (comment, postId) => ({
  type: types.ADD_COMMENT,
  payload: { comment, postId },
});

//ACTION CREATORS

export const doPost = (data, image, setProgress) => (dispatch) => {
  firestore
    .collection("posts")
    .add(data)
    .then(async (res) => {
      const document = await res.get();
      const postData = { data: document.data(), id: document.id };
      const uploadRef = storage.ref("posts/" + document.id);
      uploadRef.put(image).on(
        "state_change",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await uploadRef.getDownloadURL();
          firestore
            .collection("posts")
            .doc(document.id)
            .update({
              image: url,
            })
            .then(() => {
              postData.data.image = url;
              dispatch(addPost(postData));
              toast.success("Post Created");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchPosts = () => (dispatch) => {
  dispatch(setLoading(true));

  firestore
    .collection("posts")
    .get()
    .then((posts) => {
      const allPosts = [];
      posts.forEach((post) => {
        const data = { postData: post.data(), postId: post.id };
        allPosts.push(data);
      });

      dispatch(getPosts(allPosts));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });
};

export const doComment = (comment, postId) => (dispatch) => {

  
};
