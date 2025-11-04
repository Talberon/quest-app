import type { Role } from '../model/card'

interface RoleCardProps {
  role: Role
  chosen: boolean
}

export function RoleCard(props: RoleCardProps) {
  return (
    <div
      className={`flex flex-col relative w-60 h-70 rounded text-slate-400 p-2 ${props.role.alignment == 'GOOD' ? `bg-teal-800` : `bg-amber-800`}`}
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
