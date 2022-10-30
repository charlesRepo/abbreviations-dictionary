import MatchesContainer from "./MatchesContainer";
import React, {useState} from "react";
import Definition from "./Definition";

export default function Input() {

    const [query, setQuery] = useState('');
    const [count, setCount] = useState(0);
    const [def, setDef] = useState('');
    const [term, setTerm] =useState('')

    function OnKeyUp(e:React.KeyboardEvent){
        if(e.code !== 'Enter'){
            setQuery((e.currentTarget as HTMLInputElement).value)
        }
        if(e.code === 'ArrowUp'){
            setCount(count-1);
        }
        if(e.code === 'ArrowDown'){
            setCount(count+1);
        }
        if(e.code === 'Enter'){
            (e.currentTarget as HTMLInputElement).value = term
            setQuery(term);
        }
    }


    return (
        <div>
            <label htmlFor="termInput" className="block text-sm font-medium text-slate-400">
                Abbreviations list
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type="text"
                    name="termInput"
                    id="termInput"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Start typing an abbreviation.."
                    onKeyUp={OnKeyUp}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                        Abbreviation Dictionary
                    </label>
                </div>
            </div>

            <MatchesContainer query={query} count={count} setCount={setCount} setDef={setDef}  setTerm={setTerm} />

            <Definition def={def}/>
        </div>
    )
}