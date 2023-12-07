import {useEffect, useState} from "react";
import dictionary from "../dictionary.json";
import axios from 'axios';

interface Props{
    query: string;
    count: number;
	matchesArr: string[]
    setTerm:(value:string) => void
    setDef: (query: string) => void
	setMatchesArr: (query: string[]) => void
	clickHandler: React.MouseEventHandler<HTMLLIElement>
}


export default function MatchesContainer({query, count, setDef, setTerm, matchesArr, setMatchesArr, clickHandler}:Props){
    
    	const cleanedQuery = query.replace(/[.*+?^${}()|[\]\\]/, '\\$&');

		async function getData() {
			try {
				const response = await axios(
					'https://raw.githubusercontent.com/charlesRepo/abbreviations-dictionary/main/src/dictionary.json'
				);
				const data = await response.data;
				return data;
			} catch (error) {
				console.log(error);
			}
		}

		async function findMatches(query: string) {
			let data = dictionary;
			const regex = new RegExp(query, 'gi');
			const termsArray: string[] = [];
			try {
				data = await getData();
			} catch (error) {
				console.log(error);
			}

			[data].forEach((obj) => {
				Object.keys(obj).forEach((term) => termsArray.push(term));
			});
			const matches: string[] = termsArray.filter((val: string) =>{
				// @tofix
				return val.match(query?regex:'no matches')
			});
			
			setMatchesArr(matches);
		}

		useEffect(() => {
			findMatches(cleanedQuery);
			getData().then((data) => {
				if(matchesArr.includes(cleanedQuery)){
					setDef(data[cleanedQuery])
				}else if(cleanedQuery){
					setDef(data[matchesArr[count]])

				}else{
					setDef('')
				} 
			});
		}, [count, cleanedQuery]);

		
		return (
			<>
				{cleanedQuery && (
					<ul className="border-slate-600 border-2 rounded">
						{(matchesArr as string[]).map((term, index) => {
							setTerm(matchesArr[count]);
							return (
								<li
									key={index}
									onClick={clickHandler}
									className={`${
										count === index
											? 'bg-slate-600 text-slate-200'
											: 'text-slate-500'
									} text-sm break-words cursor-pointer hover:text-slate-200 hover:bg-slate-600 p-1`}>
									<span>{term.toUpperCase()}</span>
								</li>
							);
						})}
					</ul>
				)}
			</>
		);

}

