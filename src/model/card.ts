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
    "Arthur": { name: "Arthur", image: "👑", balance: 1, shootable: true, alignment: "GOOD", description: "Knows Morgan le Fay" },
    "Cleric": { name: "Cleric", image: "📿", balance: 1, shootable: true, alignment: "GOOD", description: "Knows loyalty of first leader." },
    "Archduke": { name: "Archduke", image: "🙌", balance: 4, shootable: false, alignment: "GOOD", description: "Can move one ally's hand during Good's Last Stand." },
    "Duke": { name: "Duke", image: "👏", balance: 2, shootable: false, alignment: "GOOD", description: "Can drop one ally's hand during Good's Last Stand." },
    "Apprentice": { name: "Apprentice", image: "👐", balance: 2, shootable: false, alignment: "GOOD", description: "Can delay own second hand during Good's Last Stand." },
    "Troublemaker": { name: "Troublemaker", image: "😨", balance: -1, shootable: true, alignment: "GOOD", description: "Must give red card during loyalty check." },
    "Youth": { name: "Youth", image: "👦", balance: -2, shootable: true, alignment: "GOOD", description: "Must fail quest if flamed." },
    "LoyalServant": { name: "LoyalServant", image: "⚔️", balance: 0, shootable: false, alignment: "GOOD", description: "No special abilities." },
    "RngArthurCleric": { name: "RngArthurCleric", image: "⛪️", balance: 2, shootable: true, alignment: "GOOD", description: "Randomly choose Arthur or Cleric and tuck the other role." },
    "RngTroubleYouth": { name: "RngTroubleYouth", image: "😱", balance: -2, shootable: true, alignment: "GOOD", description: "Randomly choose Troublemaker or Youth and tuck the other role." },
    "Morgan le Fay": { name: "Morgan le Fay", image: "❤️‍🔥", shootable: false, balance: -2, alignment: "EVIL", description: "May fail a quest, even when flamed." },
    "Trickster": { name: "Trickster", image: "🤥", shootable: false, balance: -3, alignment: "EVIL", description: "May lie when checked for loyalty or as first leader during pre-game." },
    "BlindHunter": { name: "BlindHunter", image: "🏹", shootable: false, balance: 1, alignment: "EVIL", description: "Does not know evil. Can shoot Cleric+1 or Arthur in the post-game." },
    "Revealer": { name: "Revealer", image: "🫣", shootable: false, balance: 1, alignment: "EVIL", description: "Reveals self at the end of the third failing quest." },
    "Scion": { name: "Scion", image: "🙈", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Is known by Morgan le Fay" },
    "Lunatic": { name: "Lunatic", image: "🤪", shootable: false, balance: 1, alignment: "EVIL", description: "Must fail every quest when possible." },
    "Brute": { name: "Brute", image: "3️⃣", shootable: false, balance: 1, alignment: "EVIL", description: "Cannot fail Quest 4 or 5." },
    "Minion": { name: "Minion", image: "😈", shootable: false, balance: 0, alignment: "EVIL", description: "No special abilities." },
    "Changeling": { name: "Changeling", image: "😶‍🌫️", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Evil does not know them." },
}