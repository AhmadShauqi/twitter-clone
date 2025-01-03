import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL =
    "https://c1bdd823-aa5d-4da6-b508-72ada70452dd-00-1n8xfhxxxv36v.pike.replit.dev";

//ASYNC THUNK FOR FETCHING A USER'S POSTS
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        };

        const response = await axios.post(`${BASE_URL}/posts`, data);
        return response.data;
    }
);

//SLICE
const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            console.log("test")
            state.loading = false;
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
            });
    },
});

export default postsSlice.reducer;