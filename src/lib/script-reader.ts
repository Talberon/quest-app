import type { Role } from '../model/roles'

export function preGameScriptPrompts(
  roster: Role[]
): ((roles: Role[]) => string[])[] {
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
  return prompts
}

interface ScriptLines {
  text: string
  pauseDurationMs: number
}

function parsedScript(roles: Role[]): ScriptLines[] {
  const prompts = preGameScriptPrompts(roles)
  const scriptLines: ScriptLines[] = []
  prompts.forEach((script) => {
    const lines = script(roles)
    lines.forEach((line) => {
      scriptLines.push({
        text: line,
        pauseDurationMs: 1000,
      })
    })
  })
  return scriptLines
}

export async function readScript(
  roles: Role[],
  callback?: (isDone: boolean) => void
) {
  const preGameScript = parsedScript(roles)

  for (let i = 0; i < preGameScript.length; i++) {
    const line = preGameScript[i]
    await sayLine(line.text)
    if (i != preGameScript.length - 1) await sleep(line.pauseDurationMs)
  }

  callback?.(true)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function sayLine(
  line: string,
  voice?: SpeechSynthesisVoice,
  speed?: number
): Promise<void> {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(line)
    if (voice) utterance.voice = voice
    utterance.rate = speed ?? 0.9
    window.speechSynthesis.speak(utterance)
    utterance.onend = () => resolve()
  })
}
