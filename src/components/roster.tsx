import { useDroppable } from '@dnd-kit/core'
import { Roles } from '../model/card'
import { RoleCard } from './role-card'

export function Roster(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'roster',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  console.log('ROSTER PROPS', props.children)

  const draftedRoles: string[] =
    props.children.map((roleName: string) => roleName.split('|')[1]) || []

  return (
    <div>
      <h2 className="text-2xl font-bold m-2">Roster</h2>
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-wrap gap-2 p-5 m-2 rounded bg-slate-800 border-dashed border-white border-2 min-w-30 min-h-30"
      >
        {draftedRoles.map((roleName: string) => {
          return (
            <RoleCard
              zone="roster"
              key={roleName}
              role={Roles[roleName]}
              hasBeenDrafted={false}
            />
          )
        })}
      </div>
    </div>
  )
}
