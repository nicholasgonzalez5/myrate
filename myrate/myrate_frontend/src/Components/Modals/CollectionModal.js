import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/collectionModal.css';

const CollectionCheckbox = (props) => {

  const removeFromCollection = () => {

  }

  const addToCollection = () => {
    const newMovies = [...c.movies, props.mediaId]
    const collectionData = {
      title: c.title,
      description: c.description,
      books: c.books,
      movies: newMovies,
      tvshows: c.tvshows
    }
    axios.post(`http://localhost:5000/collection/update/${c._id}`, collectionData
    ).then(response => {
      console.log(collectionData);
      console.log("Updated collection");
  }).catch(response => {
    console.log(collectionData);
      console.log("Error updating collection: " + response);
  })
  }

  var c = props.collection
  if(props.mediaType==="movie") {
    if(c.movies.indexOf(props.mediaId) > -1) {
      // movie is already in this collection
      return (
        <div>
        <label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={removeFromCollection}
          />
          {c.title}
        </label>
        </div>
      )
    } else {
      return (
        <div>
        <label>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={addToCollection}
          />
          {c.title}
        </label>
        </div>
      )
    }
  }

}

const CollectionModal = (props) => {

    const { open, close, header } = props;
    const [collections, setCollections] = useState();

    // Fetch existing collections
    useEffect(() => {
      axios.get(`http://localhost:5000/collection`)
          .then(function (response) {
              console.log(response.data);
              setCollections(response.data);
          });
  }, []);
  
    return (

      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              {collections.map(c => (
                <CollectionCheckbox collection={c} mediaType={props.mediaType} mediaId={props.mediaId}/>
              ))}
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

  export default CollectionModal;