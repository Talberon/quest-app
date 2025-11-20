import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'
import './App.css'
import { RoleCard } from './components/role-card'
import { Roster } from './components/roster'
import { RosterRepository } from './components/roster-respository'
import { type Role, Roles } from './model/card'
import { DefaultRosters, type Lineup } from './model/rosters'
import { generateRoster } from './lib/generate-roster'

function App() {
  const roles = Object.values(Roles) //.filter((role) => role.balance === 0)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [drafted, setIsDrafted] = useState<string[]>([
    'draft|Cleric',
    'draft|Morgan le Fay',
    'draft|Blind Hunter',
  ])
  const [showDescriptions, setShowDescriptions] = useState<boolean>(false)
  const [rosterLineups, setRosterLineups] =
    useState<Record<string, Lineup>>(DefaultRosters)
  const [customRosterName, setCustomRosterName] = useState<string>('')
  const [activePreset, setActivePreset] = useState<string>(
    Object.keys(rosterLineups)[0] || ''
  )

  return (
    <div>
      <div className="sticky top-1 z-10 bg-slate-800 rounded-2xl p-2 shadow-gray-900">
        <div className="z-10 mb-3 text-shadow-lg text-2xl font-bold font-serif bg-purple-800 p-2 rounded-full">
          Quest Drafter
        </div>

        {/* Saved Rosters */}
        <RosterRepository
          activePreset={activePreset}
          customRosterName={customRosterName}
          deleteRoster={deleteRoster}
          rosterLineups={rosterLineups}
          saveRoster={saveRoster}
          selectRoster={selectRoster}
          setCustomRosterName={setCustomRosterName}
          generateRoster={generateAndSetRoster}
        />
      </div>
      
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={({ active }) => setActiveId(active.id.toString())}
        onDragCancel={() => setActiveId(null)}
      >
        {/* Roster */}
        <Roster
          children={drafted}
          selectedRoster={rosterLineups[activePreset]}
        />

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showDescriptions}
            className="sr-only peer"
            onChange={(_) => {
              setShowDescriptions(!showDescriptions)
            }}
          ></input>
          <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-soft dark:peer-focus:ring-purple-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500 bg-slate-500"></div>
          <span className="select-none ms-3 text-sm font-medium text-heading">
            Show descriptions
          </span>
        </label>

        <div className="flex select-none z-5">
          {/* Loyal Servants Pool */}
          <div className="bg-teal-950 rounded-2xl p-2">
            <div className="text-xl font-bold mb-3">
              Loyal Servants of Arthur
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-h-100 overflow-auto">
              {roles
                .filter((role) => {
                  if (role.alignment !== 'GOOD') return false

                  if (!hasBeenDrafted('Loyal Servant')) {
                    if (role.name === 'Loyal Servant B') return false
                    if (role.name === 'Loyal Servant C') return false
                  }
                  if (!hasBeenDrafted('Loyal Servant B')) {
                    if (role.name === 'Loyal Servant C') return false
                  }
                  if (!hasBeenDrafted('RNG Good')) {
                    if (role.name === 'RNG Good B') return false
                  }

                  return true
                })
                .map((role) => {
                  return (
                    <RoleCard
                      key={role.name}
                      role={role}
                      zone="draft"
                      showDescription={showDescriptions}
                      hasBeenDrafted={hasBeenDrafted(role.name)}
                    />
                  )
                })}
            </div>
          </div>

          {/* Minions Pool */}
          <div className="bg-amber-950 rounded-2xl p-2 select-none">
            <div className="text-xl font-bold mb-3">Minions of Mordred</div>
            <div className="flex flex-wrap justify-center gap-2 max-h-100 overflow-auto">
              {roles
                .filter((role) => {
                  if (role.alignment !== 'EVIL') return false
                  if (!hasBeenDrafted('Minion'))
                    return role.name !== 'Minion B' && role.name !== 'Minion C'
                  if (!hasBeenDrafted('Minion B'))
                    return role.name !== 'Minion C'
                  return true
                })
                .map((role) => {
                  return (
                    <RoleCard
                      key={role.name}
                      role={role}
                      zone="draft"
                      showDescription={showDescriptions}
                      hasBeenDrafted={hasBeenDrafted(role.name)}
                    />
                  )
                })}
            </div>
          </div>
        </div>

        {/* 👇 This is what lets the dragged item escape overflow boundaries */}
        <DragOverlay>
          {activeId ? (
            <RoleCard
              role={roleForId(activeId)}
              zone="draft"
              showDescription={showDescriptions}
              hasBeenDrafted={false}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )

  function hasBeenDrafted(roleName: string) {
    return drafted.filter((r) => r.endsWith(roleName)).length > 0
  }

  function saveRoster() {
    const lineup: Lineup = drafted.map((d) => {
      const [, roleName] = d.split('|')
      return roleName
    })
    const customRosterKey = 'Custom: ' + customRosterName
    const newRosters = {
      ...rosterLineups,
      [customRosterKey]: lineup,
    }
    setRosterLineups(newRosters)
    setActivePreset(customRosterKey)
    console.log('Saved roster:', customRosterName, lineup)
  }

  function deleteRoster() {
    if (!activePreset.startsWith('Custom:')) {
      console.log('Cannot delete non-custom roster:', activePreset)
      return
    }
    const newRosters = { ...rosterLineups }
    delete newRosters[activePreset]
    setRosterLineups(newRosters)
    const remainingRosters = Object.keys(newRosters)
    const firstRoster = remainingRosters.length > 0 ? remainingRosters[0] : ''
    setActivePreset(firstRoster)
    selectRoster(firstRoster)
  }

  function selectRoster(selectedRoster: string) {
    console.log('Selected roster:', selectedRoster)
    const lineup = rosterLineups[selectedRoster]
    const newDrafted = lineup.map((roleName) => `draft|${roleName}`)
    setActivePreset(selectedRoster)
    setIsDrafted(newDrafted)
  }

  function generateAndSetRoster(numPlayers: number){
    const generatedRoster = generateRoster(numPlayers)
    console.log('Generated roster:', generatedRoster)
    const newDrafted = generatedRoster.map((roleName) => `draft|${roleName}`)
    setIsDrafted(newDrafted)
  }

  function roleForId(cardId: string): Role {
    const [_, role] = cardId.split('|')
    return roleForName(role)
  }
  function roleForName(name: string): Role {
    return Roles[name]
  }

  function handleDragEnd(event: any) {
    setActiveId(null)
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
