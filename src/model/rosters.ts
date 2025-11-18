export type Lineup = string[]

export const DefaultRosters: Record<string, Lineup> = {
    "Blank Slate": ["Morgan le Fay", "Blind Hunter", "Cleric"],
    "Standard 4": ["RNG Good A", "RNG Good B", "Morgan le Fay", "Blind Hunter"],
    "Standard 5": ["RNG Good A", "RNG Good B", "Morgan le Fay", "Blind Hunter", "Minion"],
    "Standard 6": ["Cleric", "Trouble/Youth", "Duke", "Morgan le Fay", "Blind Hunter", "Minion"],
    "Standard 7": ["Cleric", "Trouble/Youth", "Duke", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B"],
    "Standard 8": ["Cleric", "Trouble/Youth", "Duke", "Loyal Servant", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B"],
    "Standard 9": ["Cleric", "Trouble/Youth", "Archduke", "Loyal Servant", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B", "Minion C"],
    "Standard 10": ["Cleric", "Trouble/Youth", "Archduke", "Duke", "Morgan le Fay", "Blind Hunter", "Minion", "Minion B", "Minion C"],
}