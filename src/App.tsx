import './App.css'
import { Roles } from './model/card'
import { RoleCard } from './components/role-card'
import { DndContext } from '@dnd-kit/core'
import { Roster } from './components/roster'
import { useState } from 'react'

function App() {
  const roles = Object.values(Roles) //.filter((role) => role.balance === 0)

  const [drafted, setIsDrafted] = useState<string[]>(['draft|Cleric', 'draft|Morgan le Fay', 'draft|Blind Hunter'])

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <Roster children={drafted} />
        <div className="grid grid-cols-2">
          <div className="bg-teal-950 rounded-2xl p-2">
            <div className="text-xl font-bold mb-3">
              Loyal Servants of Arthur
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {roles
                .filter((role) => role.alignment === 'GOOD')
                .map((role) => {
                  return (
                    <RoleCard
                      key={role.name}
                      role={role}
                      zone="draft"
                      hasBeenDrafted={hasBeenDrafted(role.name)}
                    />
                  )
                })}
            </div>
          </div>
          <div className="bg-amber-950 rounded-2xl p-2">
            <div className="text-xl font-bold mb-3">Minions of Mordred</div>
            <div className="flex flex-wrap justify-center gap-2">
              {roles
                .filter((role) => role.alignment === 'EVIL')
                .map((role) => {
                  return (
                    <RoleCard
                      key={role.name}
                      role={role}
                      zone="draft"
                      hasBeenDrafted={hasBeenDrafted(role.name)}
                    />
                  )
                })}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )

  function hasBeenDrafted(roleName: string) {
    return drafted.filter((r) => r.endsWith(roleName)).length > 0
  }

  function handleDragEnd(event: any) {
    const cardId = event.active.id
    const dropZone = event.over?.id || 'none'
    const [zone, role, ...etc] = cardId.split('|')
    console.log(
      'DRAG END EVENT',
      'dropzone',
      dropZone,
      'originZone',
      zone,
      'role',
      role,
      etc
    )

    // Add card to Roster
    if (event.over && event.over.id === 'roster' && zone !== 'roster') {
      console.log('Dragged into roster', role)
      setIsDrafted([...new Set([...drafted, cardId])])
    }

    // Remove card from Roster
    if ((zone === 'roster' && !event.over) || event.over?.id !== 'roster') {
      console.log('Dragged out of roster, removing', role)
      const newDrafted = drafted.filter((r) => r.endsWith(role) === false)
      setIsDrafted(newDrafted)
    }
  }
}

export default App
