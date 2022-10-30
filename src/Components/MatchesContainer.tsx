import {useEffect} from "react";
import dictionary from "../dictionary.json";

interface Props{
    query: string;
    count: number;
    setCount: (count: number) => void
    setTerm:(value:string) => void
    setDef: (query: string) => void
}

export default function MatchesContainer({query, count, setCount, setDef, setTerm}:Props){
    const findMatches = (query:string) => {
        const regex = new RegExp(query, 'gi');
        const termsArray:string[] = [];
        [dictionary].forEach(obj => {
            Object.keys(obj).forEach((term) => termsArray.push(term));
        })
        return termsArray.filter((val:string) => val.match(regex))
    }


    let matchesArray:string[] = [];

    useEffect(() => {
        count >= matchesArray.length -1 && setCount(matchesArray.length -1)
        count <= 0 && setCount(0);
        setTerm(matchesArray[count])
        // @ts-ignore
        setDef(dictionary[matchesArray[count]])

    })

    return (
        <>
            {query && (
                <ul className="border-slate-600 border-2 rounded" >
                {findMatches(query).map((term, index, arr) => {
                    const regex = new RegExp(query, 'gi');
                    const itemValue =  term.replace(regex, query);
                    matchesArray = arr;
                    return (
                        <li key={index}
                            className={`${count === index ? 'bg-slate-600 text-slate-200':'text-slate-500'} text-sm break-words cursor-pointer hover:text-slate-200 hover:bg-slate-600 p-1`}>
                            <span>{itemValue.toUpperCase()}</span>
                        </li>
                    )
                })}
                </ul>)}
        </>)

}
