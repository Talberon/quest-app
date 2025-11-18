import './App.css'
import { Roles } from './model/card'
import { RoleCard } from './components/role-card'
import { DndContext } from '@dnd-kit/core'
import { Roster } from './components/roster'
import { useState } from 'react'
import { DefaultRosters, type Lineup } from './model/rosters'

function App() {
  const roles = Object.values(Roles) //.filter((role) => role.balance === 0)

  const [drafted, setIsDrafted] = useState<string[]>([
    'draft|Cleric',
    'draft|Morgan le Fay',
    'draft|Blind Hunter',
  ])
  const [showDescriptions, setShowDescriptions] = useState<boolean>(true)
  const [rosterLineups, setRosterLineups] = useState<Record<string, Lineup>>(DefaultRosters)
  const [customRosterName, setCustomRosterName] = useState<string>("My First Roster")

  return (
    <div>
      {/* Dropdown */}
      <div>
        <div>
        <span className='font-semibold'>Saved Rosters:</span>
        <select
          className="mx-2 p-3 rounded-xl bg-slate-700 text-slate-200 min-w-[300px]"
          onChange={(e) => {
            const selectedRoster = e.target.value
            console.log('Selected roster:', selectedRoster)
            const lineup = rosterLineups[selectedRoster]
            const newDrafted = lineup.map((roleName) => `draft|${roleName}`)
            setIsDrafted(newDrafted)
          }}
        >
          {Object.keys(rosterLineups).map((rosterName) => (
            <option key={rosterName} value={rosterName}>
              {rosterName}
            </option>
          ))}
        </select>
        </div>
          <div className="my-2">
            <input value={customRosterName} onChange={(e) => setCustomRosterName(e.target.value)} type="text" id="new-roster-name" placeholder="New roster name" className="mx-2 p-2 rounded-xl bg-slate-700 text-slate-200"/>
            <span onClick={saveRoster} className='select-none font-semibold bg-purple-600 rounded-lg p-3 hover:bg-purple-500 active:bg-purple-800'>Save Current Roster</span>
          </div>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {/* Roster */}
        <Roster children={drafted} />

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

        {/* Loyal Servants Pool */}
        <div className="grid grid-cols-2">
          <div className="bg-teal-950 rounded-2xl p-2">
            <div className="text-xl font-bold mb-3">
              Loyal Servants of Arthur
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {roles
                .filter((role) => {
                  if (role.alignment !== 'GOOD') return false;
                  if (!hasBeenDrafted('Loyal Servant')) return role.name !== 'Loyal Servant B' && role.name !== 'Loyal Servant C';
                  if (!hasBeenDrafted('Loyal Servant B')) return role.name !== 'Loyal Servant C';
                  return true;
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
          <div className="bg-amber-950 rounded-2xl p-2">
            <div className="text-xl font-bold mb-3">Minions of Mordred</div>
            <div className="flex flex-wrap justify-center gap-2">
              {roles
                .filter((role) => {
                  if (role.alignment !== 'EVIL') return false;
                  if (!hasBeenDrafted('Minion')) return role.name !== 'Minion B' && role.name !== 'Minion C';
                  if (!hasBeenDrafted('Minion B')) return role.name !== 'Minion C';
                  return true;
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
    const newRosters = {
      ...rosterLineups,
      [customRosterName]: lineup,
    }
    setRosterLineups(newRosters)
    console.log('Saved roster:', customRosterName, lineup)
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
