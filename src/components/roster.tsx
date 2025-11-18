import { useDroppable } from '@dnd-kit/core'
import { Roles, type Role } from '../model/card'
import { RoleCard } from './role-card'

export function Roster(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'roster',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  const draftedRoleNames: string[] =
    props.children.map((roleName: string) => roleName.split('|')[1]) || []

  const draftedRoles: Role[] = draftedRoleNames.map((roleName: string) => {
    return Roles[roleName]
  })

  const balance = draftedRoleNames.reduce((accum, roleName) => {
    return accum + Roles[roleName].balance
  }, 0)

  return (
    <div>
      <h2 className="text-2xl font-bold m-2">Roster</h2>
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
        <h3 className="text-sm font-bold">Players: {draftedRoles.length}</h3>
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
                  key={role.name}
                  role={role}
                  showDescription={true}
                  hasBeenDrafted={false}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
