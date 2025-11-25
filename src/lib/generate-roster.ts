import { Roles } from '../model/roles'
import { shuffle } from './randomize'

export function generateRoster(numPlayers: number): string[] {
  //Pre-seed roles
  const roster: string[] = ['Morgan le Fay', 'Blind Hunter'] // Start with essential roles
  if (numPlayers >= 6) {
    roster.push('Cleric')
  } else {
    roster.push('RNG Good')
    roster.push('RNG Good B')
  }
  let goodCount = roster.includes('Cleric') ? 1 : 0
  let evilCount = 2
  const initialRoles = roster.length

  const goodRoles = Object.values(Roles).filter(
    (role) =>
      !roster.includes(role.id) &&
      role.alignment === 'GOOD' &&
      role.minPlayers <= numPlayers &&
      role.maxPlayers >= numPlayers
  )
  const evilRoles = Object.values(Roles).filter(
    (role) =>
      !roster.includes(role.id) &&
      role.alignment === 'EVIL' &&
      role.id !== 'Mutineer' &&
      role.minPlayers <= numPlayers &&
      role.maxPlayers >= numPlayers
  )

  shuffle(goodRoles)
  shuffle(evilRoles)

  //TODO: Improve role selection logic to ensure balanced and varied rosters

  for (let i = 0; i < numPlayers - initialRoles; i++) {
    if (i % 2 === 0 && goodCount < goodRoles.length) {
      roster.push(goodRoles[goodCount].id)
      goodCount++
    } else if (evilCount < evilRoles.length) {
      roster.push(evilRoles[evilCount].id)
      evilCount++
    } else if (goodCount < goodRoles.length) {
      roster.push(goodRoles[goodCount].id)
      goodCount++
    }
  }

  roster.sort()

  return roster
}
