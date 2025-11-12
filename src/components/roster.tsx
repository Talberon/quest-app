import { useDroppable } from '@dnd-kit/core'

export function Roster(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'roster',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-5 m-2 rounded bg-slate-800 border-dashed border-white border-2 min-w-30 min-h-30"
    >
      Roster
      {JSON.stringify(props)}
    </div>
  )
}
