import './App.css'
import { Roles } from './model/card'
import { RoleCard } from './components/role-card'
import { DndContext } from '@dnd-kit/core'
import { Roster } from './components/roster'
import { useState } from 'react'

function App() {
  const roles = Roles.filter((role) => role.balance === 0)

  const [drafted, setIsDrafted] = useState<string[]>([])

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <Roster children={drafted} />
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => {
            return (
              <RoleCard
                key={role.name}
                role={role}
                hasBeenDrafted={hasBeenDrafted(role.name)}
              />
            )
          })}
        </div>
      </DndContext>
    </div>
  )

  function hasBeenDrafted(roleName: string) {
    return drafted.includes(roleName)
  }

  function handleDragEnd(event: any) {
    console.log('DRAG END EVENT', event)
    if (event.over && event.over.id === 'roster') {
      setIsDrafted([...drafted, event.active.id])
    }
  }
}

export default App
