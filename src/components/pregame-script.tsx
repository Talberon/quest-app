import type { Role } from '../model/roles'

export function PreGameScript({ roster }: { roster: Role[] }) {
  const prompts = [
    ['Everyone, close your eyes and put your fists out in front of you.'],
    [
      'Minions of Mordred, except for the Blind Hunter/Scion/Changeling, open your eyes and see each other.',
      'Eyes closed. Thumbs down.',
    ],
    ...roster
      .filter(
        (role) =>
          role.promptOrder !== undefined && role.promptScript !== undefined
      )
      .sort((prev, curr) => prev.promptOrder! - curr.promptOrder!)
      .map((role) => role.promptScript!),
    ['Everyone, open your eyes.'],
  ]
  return (
    <div className="flex flex-col gap-2 bg-amber-700 p-2 rounded m-2 max-w-150 justify-self-center">
      <div className="font-semibold font-serif italic text-2xl rounded bg-amber-600">
        Script
      </div>
      <div className=" rounded flex flex-col gap-1">
        {prompts.map((script: string[], promptIndex: number) =>
          script!.map((line, scriptIndex) => {
            return (
              <div
                key={`${promptIndex}-${scriptIndex}`}
                className="italic bg-amber-800 rounded p-1"
              >
                {promptIndex + 1}
                {script.length > 1 && String.fromCharCode(97 + scriptIndex)}
                {')'} {line}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
