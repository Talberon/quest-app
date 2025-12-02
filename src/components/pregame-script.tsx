import type { Role } from '../model/roles'

export function PreGameScript({ roster }: { roster: Role[] }) {
  const prompts: ((roles: Role[]) => string[])[] = [
    (_) => [
      'Everyone, close your eyes and put your fists out in front of you.',
    ],
    (roles: Role[]) => [
      `Minions of Mordred, ${
        roles.filter((role) => role.isBlind).length > 0
          ? `except for the ${roles
              .filter((role) => role.isBlind)
              .map((role) => role.displayName)
              .join('/')}, `
          : ''
      }open your eyes and see each other.`,
      'Eyes closed. Thumbs down.',
    ],
    ...roster
      .filter(
        (role) =>
          role.promptOrder !== undefined && role.promptScript !== undefined
      )
      .sort((prev, curr) => prev.promptOrder! - curr.promptOrder!)
      .map((role) => role.promptScript!),
    (_) => ['Everyone, open your eyes.'],
  ]
  return (
    <div className="flex flex-col gap-2 bg-amber-700 p-2 rounded m-2 max-w-150 justify-self-center">
      <div className="font-semibold font-serif italic text-2xl rounded bg-amber-600">
        Script
      </div>
      <div className=" rounded flex flex-col gap-1">
        {prompts.map(
          (script: (roles: Role[]) => string[], promptIndex: number) =>
            script(roster)!.map((line, scriptIndex) => {
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
