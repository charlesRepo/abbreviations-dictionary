interface Definition{
    def: string
}

export default function Definition({def}: Definition){

    return (
        <div className="p-2 mt-4 w-full border-solid border-2 border-slate-600 rounded">
            <p  className="rounded text-sm bg-transparent text-slate-300">{def ? def : "Abbreviations definitions.."}</p>
        </div>
    )
}

