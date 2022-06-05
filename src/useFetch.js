import axios from 'axios';

const useFetch = (url) => {


      const res = axios.get(url);

    return res;

}


 
export default useFetch;