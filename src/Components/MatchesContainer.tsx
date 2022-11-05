import {useEffect, useState} from "react";
import dictionary from "../dictionary.json";
import axios from 'axios';

interface Props{
    query: string;
    count: number;
    setCount: (count: number) => void
    setTerm:(value:string) => void
    setDef: (query: string) => void
}


export default function MatchesContainer({query, count, setCount, setDef, setTerm}:Props){
    const [matchesArr, setMatchesArr] = useState<string[]>([]);


async function getData(){
    try{
        const response = await axios('https://raw.githubusercontent.com/charlesRepo/abbreviations-dictionary/main/src/dictionary.json');
        const data = await response.data; 
        return data;
    }catch(error){
        console.log(error);
    }
}


    async function findMatches(query:string){
    let data = dictionary;
    const regex = new RegExp(query, 'gi');
    const termsArray:string[] = [];
    try{
        data = await getData();
    }catch(error){
        console.log(error);
    }
    
    [data].forEach(obj => {
        Object.keys(obj).forEach((term) => termsArray.push(term));
    })
    const matches:string[] = termsArray.filter((val:string) => val.match(regex))
    setMatchesArr(matches);

}

    let matchesArray:string[] = [];

    useEffect(() => {
        count >= matchesArray.length -1 && setCount(matchesArray.length -1)
        count <= 0 && setCount(0);
        setTerm(matchesArray[count])
        findMatches(query)
        getData().then(data => setDef(data[matchesArray[count]]));
        
        
    })
    


    return (
        <>
            {query && (
                <ul className="border-slate-600 border-2 rounded" >
                {
                    (matchesArr as string[]).map((term, index, arr) => {
                    const regex = new RegExp(query, 'gi');
                    const itemValue =  term.replace(regex, query);
                    matchesArray = arr;
                    return (
                        <li key={index}
                            className={`${count === index ? 'bg-slate-600 text-slate-200':'text-slate-500'} text-sm break-words cursor-pointer hover:text-slate-200 hover:bg-slate-600 p-1`}>
                            <span>{itemValue.toUpperCase()}</span>
                        </li>
                    )
                })
                }
                </ul>)}
        </>)

}
