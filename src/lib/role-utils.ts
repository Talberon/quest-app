import { Roles, type Role } from '../model/roles'
import { DefaultRosters } from '../model/rosters'

export function convertRosterToCommaSeparatedIds(roster: Role[]): string {
  return roster.map((role) => role.id).join(',')
}

export function copyRosterToClipboard() {
  navigator.clipboard.writeText(window.location.href)
  alert('Copied roster url to clipboard!')
}

export function convertRosterToBase64(roster: Role[]): string {
  return btoa(convertRosterToCommaSeparatedIds(roster))
}

export function encodeCommaSeparatedRosterToBase64(
  rosterIds: string[]
): string {
  return btoa(rosterIds.join(','))
}

export function convertCommaSeparatedRolesToArray(
  rosterString: string
): Role[] {
  return rosterString.split(',').map((id) => {
    if (Object.keys(Roles).includes(id)) {
      return Roles[id]
    }

    const unknownRole: Role = Roles['UNKNOWN']
    return unknownRole
  })
}

export function draftedRoleIdsToRoles(draftedRoles: string[]): Role[] {
  return draftedRoles.map((cardId) => {
    const [_, role] = cardId.split('|')
    return Roles[role]
  })
}

export function decodeEncodedRoster(base64String: string): Role[] {
  const commaSeparatedRoster = atob(base64String)
  console.log('Roster from Base64String:', commaSeparatedRoster)
  return convertCommaSeparatedRolesToArray(commaSeparatedRoster)
}

export function getRosterFromQueryString(): Role[] {
  const urlParams = new URLSearchParams(window.location.search)

  const encodedRosterParam = urlParams.get('roster')
  if (encodedRosterParam) {
    return decodeEncodedRoster(encodedRosterParam)
  }

  return convertCommaSeparatedRolesToArray(
    DefaultRosters['Blank Slate'].join(',')
  )
}
