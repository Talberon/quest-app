export type Alignment  = "GOOD" | "EVIL"

export interface Role {
    alignment: Alignment
    name: string,
    description: string,
    image: string,
    balance: number, // Positive for good, negative for evil
    shootable: boolean // Has information or mechanics during the game to narrow the Blind Hunter's shot
}

export const Roles: Record<string, Role> = {
    "Cleric": { name: "Cleric", image: "📿", balance: 1, shootable: true, alignment: "GOOD", description: "Knows loyalty of first leader." },
    "Loyal Servant": { name: "Loyal Servant", image: "⚔️", balance: 0, shootable: false, alignment: "GOOD", description: "No special abilities." },
    "Arthur": { name: "Arthur", image: "👑", balance: 1, shootable: true, alignment: "GOOD", description: "Knows Morgan le Fay" },
    "Archduke": { name: "Archduke", image: "🙌", balance: 4, shootable: false, alignment: "GOOD", description: "Can move one ally's hand during Good's Last Stand." },
    "Duke": { name: "Duke", image: "👏", balance: 2, shootable: false, alignment: "GOOD", description: "Can drop one ally's hand during Good's Last Stand." },
    "Apprentice": { name: "Apprentice", image: "👐", balance: 2, shootable: false, alignment: "GOOD", description: "Can delay own second hand during Good's Last Stand." },
    "Troublemaker": { name: "Troublemaker", image: "😨", balance: -1, shootable: true, alignment: "GOOD", description: "Must give red card during loyalty check." },
    "Youth": { name: "Youth", image: "👦", balance: -2, shootable: true, alignment: "GOOD", description: "Must fail quest if flamed." },
    "Arthur/Cleric": { name: "Arthur/Cleric", image: "⛪️", balance: 2, shootable: true, alignment: "GOOD", description: "Randomly choose Arthur or Cleric and tuck the other role away in secret." },
    "Trouble/Youth": { name: "Trouble/Youth", image: "😱", balance: -2, shootable: true, alignment: "GOOD", description: "Randomly choose Troublemaker or Youth and tuck the other role away in secret." },
    "Morgan le Fay": { name: "Morgan le Fay", image: "❤️‍🔥", shootable: false, balance: -2, alignment: "EVIL", description: "May fail a quest, even when flamed." },
    "Blind Hunter": { name: "Blind Hunter", image: "🏹", shootable: false, balance: 1, alignment: "EVIL", description: "Does not know evil. Can shoot Cleric plus another role, or just Arthur in the post-game." },
    "Minion": { name: "Minion", image: "😈", shootable: false, balance: 0, alignment: "EVIL", description: "No special abilities." },
    "Trickster": { name: "Trickster", image: "🤥", shootable: false, balance: -3, alignment: "EVIL", description: "May lie when checked for loyalty or as first leader during pre-game." },
    "Revealer": { name: "Revealer", image: "🫣", shootable: false, balance: 1, alignment: "EVIL", description: "Reveals self at the end of the third failing quest." },
    "Scion": { name: "Scion", image: "🙈", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Is known by Morgan le Fay" },
    "Lunatic": { name: "Lunatic", image: "🤪", shootable: false, balance: 1, alignment: "EVIL", description: "Must fail every quest when possible." },
    "Brute": { name: "Brute", image: "💪", shootable: false, balance: 1, alignment: "EVIL", description: "Cannot fail Quest 4 or 5." },
    "Changeling": { name: "Changeling", image: "😶‍🌫️", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Evil does not know them." },
    "Mutineer": { name: "Mutineer", image: "🎭", shootable: false, balance: 2, alignment: "EVIL", description: "We don't talk about the Mutineer" },
}