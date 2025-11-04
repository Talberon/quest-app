import type { Role } from '../model/card'

interface RoleCardProps {
  role: Role
  chosen: boolean
}

export function RoleCard(props: RoleCardProps) {
  return (
    <div
      className={`rounded text-slate-400 ${props.role.alignment == 'GOOD' ? `bg-teal-800` : `bg-amber-800`}`}
    >
      <h2 className='text-lg'>{props.role.name}</h2>
      {props.role.shootable && <div>"Shootable"</div>}
      <div>{props.role.alignment}</div>
      <div>
        <p>{props.role.description}</p>
      </div>
      <div>Balance: {props.role.balance}</div>
    </div>
  )
}
