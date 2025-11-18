import type { Lineup } from '../model/rosters'

interface RosterRepositoryProps {
  activePreset: string
  customRosterName: string
  deleteRoster: () => void
  rosterLineups: Record<string, Lineup>
  saveRoster: () => void
  selectRoster: (selectedRoster: string) => void
  setCustomRosterName: React.Dispatch<React.SetStateAction<string>>
}

export function RosterRepository({
  activePreset,
  customRosterName,
  deleteRoster,
  rosterLineups,
  saveRoster,
  selectRoster,
  setCustomRosterName,
}: RosterRepositoryProps) {
  return (
    <>
      <div id="load-roster">
        <div id="select-roster">
          <span className="font-semibold">Saved Rosters:</span>
          <select
            value={activePreset}
            className="mx-2 p-3 rounded-xl bg-slate-700 text-slate-200 min-w-[300px]"
            onChange={(e) => selectRoster(e.target.value)}
          >
            {Object.keys(rosterLineups).map((rosterName) => (
              <option key={rosterName} value={rosterName}>
                {rosterName}
              </option>
            ))}
          </select>
          <span
            onClick={deleteRoster}
            className={`select-none disabled:bg-gray-700 font-semibold rounded-lg p-3 ${activePreset.startsWith('Custom:') ? 'bg-red-600 hover:bg-red-500 active:bg-red-800' : 'bg-gray-600 text-gray-800'}`}
          >
            🗑️ Delete
          </span>
        </div>
      </div>
      <div className="my-2">
        <input
          value={customRosterName}
          onChange={(e) => setCustomRosterName(e.target.value)}
          type="text"
          id="new-roster-name"
          placeholder="New roster name"
          className="mx-2 p-2 rounded-xl bg-slate-700 text-slate-200"
        />
        <span
          onClick={saveRoster}
          className="select-none font-semibold rounded-lg p-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-800"
        >
          Save Current Roster
        </span>
      </div>
    </>
  )
}
