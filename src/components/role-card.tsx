import { useDraggable } from '@dnd-kit/core'
import type { Role } from '../model/card'
import { CSS } from '@dnd-kit/utilities'

interface RoleCardProps {
  role: Role
  hasBeenDrafted: boolean
}

export function RoleCard(props: RoleCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.role.name}`,
  })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  let cardColor =
    props.role.alignment == 'GOOD' ? `bg-teal-800` : `bg-amber-800`
  if (props.hasBeenDrafted) cardColor = cardColor + ` opacity-30`

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex flex-col relative select-none w-60 h-70 rounded text-slate-400 p-2 ${cardColor}`}
    >
      {props.role.shootable && (
        <div className="absolute top-1 p-2 bg-orange-800 rounded-full text-orange-600 font-semibold text-xs">
          🔫
        </div>
      )}
      <h2 className="text-lg font-bold">{props.role.name}</h2>
      <div className="text-5xl">{props.role.image}</div>
      {/* <div>{props.role.alignment}</div> */}
      <div className="flex grow justify-center bg-slate-800 opacity-40 rounded p-2 m-1">
        <p className="align-middle self-center opacity-100">
          {props.role.description}
        </p>
      </div>
      <div
        className={`absolute right-1 top-1 p-2 rounded-full text-xs font-bold w-8 h-8 ${props.role.balance > 0 ? 'bg-green-800' : 'bg-red-800'}`}
      >
        {props.role.balance > 0 && '+'}
        {props.role.balance}
      </div>
    </div>
  )
}
