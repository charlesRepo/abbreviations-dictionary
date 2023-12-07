import React from 'react';
interface PropsInterface {
    onKeyUp:React.KeyboardEventHandler<HTMLInputElement>
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value: string
}
export default function Input({onKeyUp, onChange, value}:PropsInterface) {
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
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    value={value}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                        Abbreviation Dictionary
                    </label>
                </div>
            </div>
        </div>
    )
}