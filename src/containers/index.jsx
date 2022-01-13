import React, {useState} from "react";
// import "./style.css";
import axios from "axios";
import Results from "../components/Results";
import Photos from "../components/Photos";
import main from '../images/main.jpg'
export default function Dictionary () {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);
  let [photos, setPhotos]= useState(null);

  const getSearchResult =  ()=>{
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(response =>{
        setResults(response.data[0]);
    }).catch(err => console.log(err))
  }
  const getPhotos = ()=>{
    let pexelsApiKey= "563492ad6f91700001000001fdd29f0808df42bd90c33f42e128fa89";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = {Authorization : `Bearer ${pexelsApiKey}` };
    axios.get(pexelsApiUrl, { headers: headers }).then(response=>{
      if(response){
        setPhotos(response.data.photos.splice(0 , 1))
      }
    }).catch(err => console.log(err))

  }

  const search = (event) => {
    event.preventDefault();
    getSearchResult();
    getPhotos()
    
  }
    return (
        <div className="Dictionary">
          <img src={main}/>
            <section>
            <h1>
            What word do you want to look up?
            </h1>
            <form onSubmit={search}>
            <input type="search"  placeholder= "type in a word" onChange={(event)=>setKeyword(event.target.value)}
            autoFocus={true} />
            </form>
            <div className="hint">
            suggested words: sunrise, waterfall, wine, travel, alliteration...
            </div>
            </section>
            <Results results={results} />
            <Photos photos={photos} />
        </div>
    ); 
  }
   