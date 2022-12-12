import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(false);

  const addPost = (data) => {
    const headers = new Headers();
    //headers.append("Content-type", "application/json");
    headers.append("Authorization", "Bearer w232342w2342rwsfwsewr");

    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("title", data.title);
    formData.append("body", data.body);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      //body: JSON.stringify(data),
      body: formData,
      headers,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res);
        if (res.ok && res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => console.log(err));

    addPost({
      userId: 1,
      title: "Ornek Post",
      body: "icerik",
    });
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();
    console.log("submit edildi");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("avatar", avatar);
    fetch("http://localhost/test-api/handleUpload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <>
      <form onSubmit={submitHandle}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>{" "}
        <br />
        <input
          type="file"
          name="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <br />
        <button type="submit" disabled={!name || !avatar}>
          Kaydet
        </button>
      </form>
      <h1>User List</h1>
      <ul>
        {users && users.map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </>
  );
}

export default App;
