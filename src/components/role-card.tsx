import { useDraggable } from '@dnd-kit/core'
import type { Role } from '../model/card'
import { CSS } from '@dnd-kit/utilities'

interface RoleCardProps {
  role: Role
  zone: string
  hasBeenDrafted: boolean
  showDescription: boolean
}

export function RoleCard(props: RoleCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.zone}|${props.role.id}`,
  })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  let cardColor =
    props.role.alignment == 'GOOD' ? `bg-teal-800` : `bg-amber-800`
  if (props.hasBeenDrafted) {
    cardColor = cardColor + ` opacity-30`
    return <></>
  }

  const shootScoreIcon = " p-1 w-6 h-6 md:p-2 md:w-8 md:h-8 ";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none flex flex-col relative select-none w-30 md:w-40 max-h-70 rounded text-slate-400 p-2 ${cardColor}`}
    >
      <h2 className="text-md md:text-lg font-bold text-slate-300">
        {props.role.displayName}
      </h2>
      <div className="md:text-5xl text-xl">{props.role.image}</div>
      {props.showDescription && (
        <div className="flex grow justify-center bg-slate-800 opacity-40 rounded p-2 m-1">
          <p className="align-middle self-center opacity-100 text-slate-200">
            {props.role.description}
          </p>
        </div>
      )}
      {props.role.shootable && (
        <>
          <div className={`absolute top-10 ${shootScoreIcon} bg-orange-800 outline-slate-700 outline-1 rounded-full text-orange-600 font-semibold text-xs`}>
            🔫
          </div>
        </>
      )}
      <div
        className={`absolute right-1 top-10 ${shootScoreIcon} rounded-full text-xs font-bold outline-slate-700 outline-1 ${props.role.balance > 0 ? 'bg-green-800' : 'bg-red-800'}`}
      >
        {props.role.balance > 0 && '+'}
        {props.role.balance}
      </div>
    </div>
  )
}
