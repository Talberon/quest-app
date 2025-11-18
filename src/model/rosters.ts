export type Lineup = string[]

export const DefaultRosters: Record<string, Lineup> = {
    "Blank Slate": ["Morgan le Fay", "Blind Hunter", "Cleric"],
    "Director's Cut 4P": ["RNG Good A", "RNG Good B", "Morgan le Fay", "Blind Hunter"],
    "Director's Cut 5P": ["RNG Good A", "RNG Good B", "Morgan le Fay", "Blind Hunter", "Minion"],
    "Director's Cut 6P": ["Cleric", "Trouble/Youth", "Duke", "Morgan le Fay", "Blind Hunter", "Minion"],
    "Director's Cut 7P": ["Cleric", "Trouble/Youth", "Duke", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B"],
    "Director's Cut 8P": ["Cleric", "Trouble/Youth", "Duke", "Loyal Servant", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B"],
    "Director's Cut 9P": ["Cleric", "Trouble/Youth", "Archduke", "Loyal Servant", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B", "Minion C"],
    "Director's Cut 10P": ["Cleric", "Trouble/Youth", "Archduke", "Duke", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B", "Minion C"],
}