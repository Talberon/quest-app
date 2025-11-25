import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'
import './App.css'
import { RoleCard } from './components/role-card'
import { Roster } from './components/roster'
import { RosterRepository } from './components/roster-respository'
import { generateRoster } from './lib/generate-roster'
import {
  encodeCommaSeparatedRosterToBase64,
  getRosterFromQueryString,
} from './lib/role-utils'
import { type Role, Roles } from './model/roles'
import { DefaultRosters } from './model/rosters'

function App() {
  const roles = Object.values(Roles) //.filter((role) => role.balance === 0)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [drafted, setIsDrafted] = useState<string[]>(
    getRosterFromQueryString().map((role) => `draft|${role.id}`)
  )
  const [showDescriptions, setShowDescriptions] = useState<boolean>(false)

  const savedRosters = localStorage.getItem('savedRosters')
    ? JSON.parse(localStorage.getItem('savedRosters')!)
    : DefaultRosters
  const [rosterLineups, setRosterLineups] =
    useState<Record<string, string[]>>(savedRosters)

  const [customRosterName, setCustomRosterName] = useState<string>('')
  const [activePreset, setActivePreset] = useState<string>(
    Object.keys(rosterLineups)[0] || ''
  )

  return (
    <div className="">
      <div className="sticky top-1 z-10 bg-amber-900 rounded-4xl p-2 shadow-gray-900">
        <div className="z-10 mb-3 text-indigo-950 text-shadow-lg text-2xl font-bold bg-amber-700 p-2 rounded-full">
          <span className="font-serif text-3xl italic">Quest</span> Drafter
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

        <div className="flex gap-2 z-5">
          {/* Loyal Servants Pool */}
          <div className="bg-teal-950 rounded-2xl p-2 select-none">
            <div className="text-xl font-bold mb-3">
              Loyal Servants of Arthur
            </div>
            <div className="flex flex-wrap justify-center gap-2 p-2 max-h-100 overflow-auto">
              {roles
                .filter((role) => {
                  if (role.alignment !== 'GOOD') return false

                  if (!hasBeenDrafted('Loyal Servant')) {
                    if (role.id === 'Loyal Servant B') return false
                    if (role.id === 'Loyal Servant C') return false
                  }
                  if (!hasBeenDrafted('Loyal Servant B')) {
                    if (role.id === 'Loyal Servant C') return false
                  }
                  if (!hasBeenDrafted('RNG Good')) {
                    if (role.id === 'RNG Good B') return false
                  }

                  return true
                })
                .map((role) => {
                  return (
                    <RoleCard
                      key={role.id}
                      role={role}
                      zone="draft"
                      showDescription={showDescriptions}
                      hasBeenDrafted={hasBeenDrafted(role.id)}
                    />
                  )
                })}
            </div>
          </div>

          {/* Minions Pool */}
          <div className="bg-amber-950 rounded-2xl p-2 select-none">
            <div className="text-xl font-bold mb-3">Minions of Mordred</div>
            <div className="flex flex-wrap justify-center gap-2 p-2 max-h-100 overflow-auto">
              {roles
                .filter((role) => {
                  if (role.alignment !== 'EVIL') return false
                  if (!hasBeenDrafted('Minion'))
                    return role.id !== 'Minion B' && role.id !== 'Minion C'
                  if (!hasBeenDrafted('Minion B')) return role.id !== 'Minion C'
                  return true
                })
                .map((role) => {
                  return (
                    <RoleCard
                      key={role.id}
                      role={role}
                      zone="draft"
                      showDescription={showDescriptions}
                      hasBeenDrafted={hasBeenDrafted(role.id)}
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
      <div className="py-2">
        Unofficial fan tool for Quest/Avalon Big Box.{' '}
        <a href="https://indieboardsandcards.com/our-games/avalon-big-box/">
          Support the original devs
        </a>
        .
      </div>
    </div>
  )

  function hasBeenDrafted(roleName: string) {
    return drafted.filter((r) => r.endsWith(roleName)).length > 0
  }

  function saveRoster() {
    const lineup: string[] = drafted.map((d) => {
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

    localStorage.setItem('savedRosters', JSON.stringify(newRosters))
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
    setRoster(newDrafted)
  }

  function generateAndSetRoster(numPlayers: number) {
    const generatedRoster = generateRoster(numPlayers)
    console.log('Generated roster:', generatedRoster)
    const newDrafted = generatedRoster.map((roleName) => `draft|${roleName}`)
    setRoster(newDrafted)
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
      setRoster([...new Set([...drafted, cardId])])
    }

    // Remove card from Roster
    if ((zone === 'roster' && !event.over) || event.over?.id !== 'roster') {
      console.log('Dragged out of roster, removing', role)
      const newDrafted = drafted.filter((r) => r.endsWith(role) === false)
      setRoster(newDrafted)
    }
  }

  function setRoster(draftedRoles: string[]) {
    // Get the current URL
    const currentUrl = new URL(window.location.href)

    const base64Roster = encodeCommaSeparatedRosterToBase64(
      draftedRoles.map((cardId) => {
        const [_, role] = cardId.split('|')
        return role
      })
    )

    currentUrl.searchParams.set('roster', base64Roster) // Adds 'paramName=paramValue' or updates its value if it already exists

    const newUrl = currentUrl.toString()
    //Update query params
    window.history.pushState({}, '', newUrl)

    //Set state
    setIsDrafted(draftedRoles)
  }
}

export default App
