import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("blogPosts")) || [
      {
        id: 1,
        title: "My First Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nam hic dolorum ut, odit, dolores accusamus corrupti nisi mollitia ab aperiam at repellendus nulla eveniet eligendi consequuntur ex dignissimos inventore.",
      },
      {
        id: 2,
        title: "My 2nd Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nam hic dolorum ut, odit, dolores accusamus corrupti nisi mollitia ab aperiam at repellendus nulla eveniet eligendi consequuntur ex dignissimos inventore.",
      },
      {
        id: 3,
        title: "My 3rd Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nam hic dolorum ut, odit, dolores accusamus corrupti nisi mollitia ab aperiam at repellendus nulla eveniet eligendi consequuntur ex dignissimos inventore.",
      },
      {
        id: 4,
        title: "My 4th Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur nam hic dolorum ut, odit, dolores accusamus corrupti nisi mollitia ab aperiam at repellendus nulla eveniet eligendi consequuntur ex dignissimos inventore.",
      },
    ]
  );
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filterPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filterPosts.reverse());

    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const datetime = format(new Date(), "MMMM dd, yyyy, pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };
    const postLists = [...posts, newPost];
    setPosts(postLists);
    setPostBody("");
    setPostTitle("");
    navigate("/");
  };

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} />}
      >
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                postBody={postBody}
                setPostTitle={setPostTitle}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
