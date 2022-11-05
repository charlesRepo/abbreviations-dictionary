import './App.css';
import React, {useState} from "react";
import Input from './Components/Input';
import MatchesContainer from "./Components/MatchesContainer";
import Definition from "./Components/Definition";

function App() {
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
    <div className="App w-80 bg-slate-800 min-h-full m-auto p-5">
      <main>
          <Input OnKeyUp={OnKeyUp}/>
          <MatchesContainer query={query} count={count} setCount={setCount} setDef={setDef}  setTerm={setTerm} />
          <Definition def={def}/>
      </main>
    </div>
  );
}

export default App;
