import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fetchImages = async () => {
    setLoading(true);
    let url;
    url = `${mainUrl}${clientID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // 获取值：视口的内部高度、滚动了多少、文档的高度
      // console.log(`innerHeight ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`);

      // 要在不是loading状态的情况下加载新的图片
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100
      ) {
        console.log("it works");
      }
    });
    return () => window.removeEventListener("scroll", event);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map(({ id, ...image }) => {
            return <Photo key={id} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading</h2>}
      </section>
    </main>
  );
}

export default App;
