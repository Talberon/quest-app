import { useDroppable } from '@dnd-kit/core'
import { Roles, type Role } from '../model/card'
import { RoleCard } from './role-card'
import { useEffect, useState } from 'react'

interface RosterProps {
  children: any
  selectedRoster?: string[]
}

export function Roster(props: RosterProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'roster',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  const draftedRoleNames: string[] =
    props.children.map((roleName: string) => roleName.split('|')[1]) || []
  draftedRoleNames.sort()

  const draftedRoles: Role[] = draftedRoleNames.map((roleName: string) => {
    return Roles[roleName]
  })

  draftedRoles.sort()

  const balance = draftedRoleNames.reduce((accum, roleName) => {
    return accum + Roles[roleName].balance
  }, 0)

  const rosterIsModified =
    props.selectedRoster?.length !== draftedRoleNames.length ||
    (props.selectedRoster?.sort().every((roleName: string, index: number) => {
      return roleName === draftedRoleNames[index]
    }) ?? false) === false

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const showDescription = width >= 768

  return (
    <div>
      <h2 className="text-2xl font-bold m-2">
        Roster{rosterIsModified && '*'}
      </h2>
      <div className="rounded bg-slate-800 border-dashed border-slate-400 border-2 min-w-30 min-h-30 mb-2">
        <h2 className="text-xl font-bold m-2">
          Balance:{' '}
          <span
            className={`rounded-full px-2 py-1 font-bold outline-slate-700 outline-1 w-8 h-8 ${balance > 0 ? 'bg-green-800' : balance === 0 ? 'bg-slate-500' : 'bg-red-800'}`}
          >
            {balance}
          </span>{' '}
          {balance > 0
            ? '(Good-favoured)'
            : balance == 0
              ? '(Equal)'
              : '(Evil-favoured)'}
        </h2>
        <h3 className="grid grid-cols-3 text-lg font-bold">
          {/* Good Meta Info */}
          <span className="flex gap-2 justify-center">
            <span className="bg-teal-800 rounded-full py-1 px-3">
              🙋 Corrections:{' '}
              {draftedRoles.reduce(
                (prev, curr) => (prev += curr.correction),
                0
              )}
            </span>
            <span className="bg-teal-800 rounded-full py-1 px-3">
              🔎 Info:{' '}
              {draftedRoles.reduce(
                (prev, curr) =>
                  (prev += curr.alignment === 'GOOD' ? curr.information : 0),
                0
              )}
            </span>
            <span className="bg-teal-800 rounded-full py-1 px-3">
              ⚖️ Balance:{' '}
              {draftedRoles.reduce(
                (prev, curr) =>
                  (prev += curr.alignment === 'GOOD' ? curr.balance : 0),
                0
              )}
            </span>
          </span>
          {/* Shared Meta Info */}
          <span>
            Players ({draftedRoles.length}):{' '}
            <span>
              {draftedRoles
                .sort((a, b) => a.balance - b.balance)
                .sort((role) => (role.alignment === 'GOOD' ? -1 : 1))
                .map((role) => role.image)
                .join('')}
            </span>
          </span>
          {/* Evil Meta Info */}
          <span className="flex gap-2 justify-center">
            <span className="bg-amber-800 rounded-full py-1 px-3">
              👁️ Info:{' '}
              {draftedRoles.reduce(
                (prev, curr) =>
                  (prev += curr.alignment === 'EVIL' ? 0 : curr.information),
                0
              )}
            </span>
            <span className="bg-amber-800 rounded-full py-1 px-3">
              ⚖️ Balance:{' '}
              {draftedRoles.reduce(
                (prev, curr) =>
                  (prev += curr.alignment === 'EVIL' ? curr.balance : 0),
                0
              )}
            </span>
          </span>
        </h3>

        <div
          ref={setNodeRef}
          style={style}
          className="flex flex-wrap justify-center gap-2 p-5"
        >
          {draftedRoles
            .sort((a, b) => a.balance - b.balance)
            .sort((a, b) => (a.alignment > b.alignment ? -1 : 1))
            .map((role: Role) => {
              return (
                <RoleCard
                  zone="roster"
                  key={role.id}
                  role={role}
                  showDescription={showDescription}
                  hasBeenDrafted={false}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
