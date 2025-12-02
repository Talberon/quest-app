import { useState } from 'react'
import { preGameScriptPrompts, readScript } from '../lib/script-reader'
import type { Role } from '../model/roles'

export function PreGameScript({ roster }: { roster: Role[] }) {
  const [isDoneReading, setIsDoneReading] = useState<boolean>(true)

  return (
    <div className="flex flex-col gap-2 bg-amber-700 p-2 rounded m-2 max-w-150 justify-self-center">
      <div className="p-2 font-semibold rounded bg-amber-600">
        <span className='font-serif italic text-2xl'>Script</span>{' '}
        <span
          onClick={() => {
            if (!isDoneReading) return
            setIsDoneReading(false)
            readScript(roster, setIsDoneReading)
          }}
          className="rounded-full cursor-pointer py-1 px-2 font-sans font-semibold text-md bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 select-none"
        >
          🔊 {isDoneReading ? 'Play Script' : 'Speaking...'}
        </span>
      </div>
      <div className=" rounded flex flex-col gap-1">
        {preGameScriptPrompts(roster).map(
          (script: (roles: Role[]) => string[], promptIndex: number) =>
            script(roster)!.map((line, scriptIndex) => {
              return (
                <div
                  key={`${promptIndex}-${scriptIndex}`}
                  className="italic bg-amber-800 rounded p-1"
                >
                  {promptIndex + 1}
                  {script(roster).length > 1 &&
                    String.fromCharCode(97 + scriptIndex)}
                  {')'} {line}
                </div>
              )
            })
        )}
      </div>
    </div>
  )
}
