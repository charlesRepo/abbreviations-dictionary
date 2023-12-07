import './App.css';
import React, {useState} from "react";
import Input from './Components/Input';
import MatchesContainer from "./Components/MatchesContainer";
import Definition from "./Components/Definition";


function App() {
   const [query, setQuery] = useState('');
    const [count, setCount] = useState(0);
    const [def, setDef] = useState('');
    const [term, setTerm] = useState('')
    const [matchesArr, setMatchesArr] = useState<string[]>([]);

    function onKeyUpHandler(e:React.KeyboardEvent){
        if(e.code !== 'Enter'){
            setQuery((e.currentTarget as HTMLInputElement).value)
            setCount(0);
        }
        if(e.code === 'ArrowUp'){
            setCount(count-1);
            count <= 0 && setCount(0);
        }
        if(e.code === 'ArrowDown'){
            setCount(count+1);        
            count >= matchesArr.length - 1 && setCount(matchesArr.length - 1);
        }
        if(e.code === 'Enter'){
          if(query && term){
            (e.currentTarget as HTMLInputElement).value = term
            setQuery(term);
          }
        }
    }
    const onChangeHandler = (e: React.ChangeEvent) => setQuery((e.currentTarget as HTMLInputElement).value)
    const clickHandler = (e:React.MouseEvent) => {
      const li = e.target as HTMLLIElement
      li.innerText && setQuery(li.innerText)

      console.log({term})
      console.log({query})
      
    }

    

  return (
    <div className="App w-80 bg-slate-800 min-h-full m-auto p-5">
      <main>
          <Input onKeyUp={onKeyUpHandler} onChange={onChangeHandler} value={query}/>

          <MatchesContainer 
          query={query} 
          count={count} 
          setDef={setDef}  
          setTerm={setTerm} 
          matchesArr={matchesArr} 
          setMatchesArr={setMatchesArr}
          clickHandler={clickHandler}
          />
          

          <Definition def={def}/>
      </main>
    </div>
  );
}

export default App;
