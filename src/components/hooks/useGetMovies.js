import { options } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetMovies = (fn, api, data) => {


    const dispatch = useDispatch();

    /*Get the movies data and put it in the store*/
    const getMovies = async () => {
        const response = await fetch(api, options);
        const data = await response?.json();
        dispatch(fn(data?.results))
    }

    useEffect(() => {
        /* Only get the data if data is not redux store. Memoization technique */
        if(!data.length) getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

}

export default useGetMovies;