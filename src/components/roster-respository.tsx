import { copyRosterToClipboard } from '../lib/role-utils'
import { Roles } from '../model/roles'

interface RosterRepositoryProps {
  activePreset: string
  customRosterName: string
  deleteRoster: () => void
  rosterLineups: Record<string, string[]>
  saveRoster: () => void
  selectRoster: (selectedRoster: string) => void
  setCustomRosterName: React.Dispatch<React.SetStateAction<string>>
  generateRoster: (numPlayers: number) => void
}

export function RosterRepository({
  activePreset,
  customRosterName,
  deleteRoster,
  rosterLineups,
  saveRoster,
  selectRoster,
  setCustomRosterName,
  generateRoster,
}: RosterRepositoryProps) {
  return (
    <div className="flex flex-wrap gap-1 justify-center content-baseline">
      <div id="load-roster" className="md:flex-1 flex-nowrap text-nowrap">
        <div id="select-roster">
          <span className="font-semibold">Preset:</span>
          <select
            value={activePreset}
            className="ml-2 p-2 rounded-l-xl bg-slate-700 text-slate-200 min-w-[50px]"
            onChange={(e) => selectRoster(e.target.value)}
          >
            {Object.keys(rosterLineups).map((rosterName) => (
              <option key={rosterName} value={rosterName}>
                {rosterName}{' '}
                {rosterLineups[rosterName]
                  .map((roleName) => Roles[roleName])
                  .sort((a, b) => a.balance - b.balance)
                  .sort((role) => (role.alignment === 'GOOD' ? -1 : 1))
                  .map((role) => role.image)
                  .join('')}
              </option>
            ))}
          </select>
          <span
            onClick={deleteRoster}
            className={`select-none disabled:bg-gray-700 font-semibold rounded-r-lg px-3 py-2 ${activePreset.startsWith('Custom:') ? 'bg-red-600 hover:bg-red-500 active:bg-red-800' : 'bg-gray-600 text-gray-800'}`}
          >
            🅧
          </span>
        </div>
      </div>
      <div className="md:flex-1 flex-nowrap text-nowrap">
        <input
          value={customRosterName}
          onChange={(e) => setCustomRosterName(e.target.value)}
          maxLength={20}
          type="text"
          id="new-roster-name"
          placeholder="New roster name"
          className="p-1.5 pl-3 rounded-l-xl placeholder:text-gray-100 placeholder:italic bg-slate-900 text-slate-200"
        />
        <span
          onClick={(_) => customRosterName && saveRoster()}
          className={`${!customRosterName ? 'disabled text-gray-800 bg-gray-600' : 'bg-purple-600 hover:bg-purple-500 active:bg-purple-800'} select-none font-semibold rounded-r-lg p-2 `}
        >
          Save Current Roster
        </span>
      </div>

      <div className="bg-indigo-900 shadow-2xl rounded-full p-3">
        <span className="font-semibold select-none">Generate Lineup:</span>{' '}
        {[4, 5, 6, 7, 8, 9, 10, 11].map((numPlayers) => (
          <span
            key={numPlayers}
            className={`mx-1 px-3 py-2 select-none ${numPlayers % 2 == 0 ? 'bg-teal-700 hover:bg-teal-600 active:bg-teal-800' : 'bg-amber-700 hover:bg-amber-600 active:bg-amber-800'} rounded-full cursor-pointer`}
            onClick={() => generateRoster(numPlayers)}
          >
            {numPlayers}
          </span>
        ))}
      </div>

      {/* Share Button */}
      <span
        onClick={copyRosterToClipboard}
        className="select-none text-nowrap font-semibold flex-nowrap bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-800 rounded-full px-3 py-3"
      >
        Share Roster 🔗
      </span>
    </div>
  )
}
