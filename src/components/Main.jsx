import React, { useEffect, useRef, useState } from "react";
import { createApi } from "unsplash-js";
import Masonry from "@mui/lab/Masonry";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useBookStore } from "../store/bookStore";


const api = createApi({
  accessKey: import.meta.env.VITE_ACESSKEY,
});

const Main = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let index = useRef(1);

  const val = useBookStore(state => state.value)

  useEffect(() => {
    index.current = 1;
    setHasMore(true)

    api.search
      .getPhotos({ query: val, perPage: "20", page: index.current })
      .then((result) => {
        setImages(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [val]);

  const moreImages = () =>{
    index.current = index.current + 1;
    if(index.current === 3){
      setHasMore(false);
    }

    api.search
      .getPhotos({ query: val, perPage: "20", page: index.current })
      .then((result) => {
        setImages(images.concat(result.response.results));
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  console.log('result', images)
  console.log('value', val)

  return (
    <main>

      <InfiniteScroll
        dataLength={images.length}
        hasMore={hasMore}
        next={moreImages}
        loader={<h4>Loading...</h4>}
        style={{ overflow: 'hidden' }}
      >

        <Masonry 
          columns={{ xs: 2, sm: 3, md: 5 }} 
          spacing={{ xs: 1, sm: 2, md: 3 }} 
          className='masonry'
        >
          {images.map((image) => (
            <div key={image.id} className="item">
              <div className="image">
                <img src={image.urls.small} alt={image.alt_description} />
                <a className="btn-save" href="">Save</a>
                <a className="icon-upload" href=""><img src="/uploadicon.png" alt="upload" /></a>
                <a className="icon-dots" href=""><img src="/dotsicon.png" alt="options" /></a>
              </div>
              <p>{image.description}</p>
              <div>
                  <img className='user' src={image.user.profile_image.small} alt={image.user.name} />
                  <span>{image.user.instagram_username}</span>
              </div>
            </div>
          ))}
        </Masonry>

      </InfiniteScroll>

    </main>
  );
};

export default Main;