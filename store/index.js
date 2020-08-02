import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get("https://nuxt-blog-a352b.firebaseio.com/posts.json")
          .then((res) => {
            const postsArray = [];
            console.log(res.data);
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }

            vuexContext.commit("setPosts", postsArray);
          })
          .catch((e) => context.error(e));
        /*if (!process.client) {
          console.log(context.req, 'this is the context req');
        }*/

        /*return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit("setPosts", [
              {
                id: "1",
                title: "First Post",
                previewText: "This is our first post!",
                thumbnail:
                  "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
              },
              {
                id: "2",
                title: "Second Post",
                previewText: "This is our second post!",
                thumbnail:
                  "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
              },
            ]);
            resolve();
          }, 1000);
        });*/
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
    },
  });
};

export default createStore;
