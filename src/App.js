import React,{useState,useEffect} from 'react';
import ImageCard from './Components/ImageCard';
import ImageSearch from './Components/ImageSearch';


function App() {

  //creating states
  const[imgaes, setImages] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[term,setTerm] = useState('')

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=17778018-a13f9ec96a128b6260c2cdbd6&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits);
      setIsLoading(false);
      console.log(term)
    })
    .catch(err =>console.log(err))
  },[term])
  return (


    <div className="container mx-auto">
     <ImageSearch searchText ={(text) => setTerm(text)}/>

{!isLoading && imgaes.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">Images Not Found</h1>}

 { isLoading ? <div className="text-6xl text-center mx-auto mt-32"><h1>Loading...</h1></div> : <div className="grid grid-cols-3 gap-4">
    {imgaes.map(image => (
      <ImageCard key={image.id} image={image}/>
    ))}
    </div>}
    </div>

    
  );
}

export default App;
