import { getByTitle } from "@testing-library/react";
import React, {createContext,useContext,useState} from "react";

//require('dotenv').config();


const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';


console.log("api key:" + process.env.REACT_APP_API_KEY);

export const ResultContextProvider = ({children}) => {
    

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Elon Musk');


    const getResults = async (type) => {
       
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            },
        });

        const data = await response.json();
        
        //to debug
        console.log(data);

        if(type.includes('/news')) {
            setResults(data.entries);
        } else if (type.includes('/image')){
            setResults(data.image_results);
        }else{
            setResults(data.results);
        }

        //setResults(data);
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);