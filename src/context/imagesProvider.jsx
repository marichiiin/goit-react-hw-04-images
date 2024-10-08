import { createContext, useContext, useEffect, useState} from 'react';
import { getAPI } from '../pixabay-api';
import toast from 'react-hot-toast';

//1 Create a context
const ImagesContext = createContext(); // store
//2 Create a custom hooks
export const UseImagesContext = () => useContext(ImagesContext); // alows us to use data in store
//3 return a provider
export const ImagesProvider = ({ children }) => {
  // transfer all states inside of provider
  // transfer all sideEffects inside of provider
  // transfer all functions insdie of  provider
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);


    
  //const prevImages = useRef();
  useEffect(() => {
    // Fetch new images if the search query or current page changes
    if (searchQuery === '') return
      //IIFE - Imediately Invoked Function Expression 
      //Syntax (()=>{})()
      (async () => {
        await fetchImages(searchQuery, currentPage);
      })();
  },[searchQuery, currentPage])

  const fetchImages = async(searchQuery, currentPage) => {
    try {
      setIsLoading(true);
      const fetchedImages= await getAPI(searchQuery, currentPage);
      const { totalHits, hits } = fetchedImages;
      
      // Check if the API returns no images for the seearch query
      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setIsLoading(false);
        return;
      }
  
      // Display a success message when the first page is loaded
      if (currentPage === 1) {
        toast.success(`Horray! We found ${totalHits} images`);
      }
  
      // Check if all available images have been loaded
      if (currentPage * 12 >= totalHits) {
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
  
      setImages(prevImages => [...prevImages, ...hits]);
    } catch (error) {
      // Handle any errors that occur during the API request
      setIsError(true);
      toast.error('Oops, something went wrong! Reload this page!');
    } finally {
      // Ensure loading state is reset once the API request completes
      setIsLoading(false);
    }
  }
  const handleSubmit = e => {
    e.preventDefault();
    
    const newSearch = e.target.search.value.trim().toLowerCase();
    
    // if new search string is different from the current search string saved in state
    if (newSearch !== searchQuery) {
      setSearchQuery(newSearch);
      setCurrentPage(1);
      setImages([]);
    }
  };
    
  const handleLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };
  
  return (
    //  Pass all reusable states and functions to the value property of the provider
    <ImagesContext.Provider 
        value={{
            images,
            isLoading,
            isError,
            isEnd,
            handleSubmit,
            handleLoadMore
            }}>
        { children };
    </ImagesContext.Provider>
  )
};