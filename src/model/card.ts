export type Alignment  = "GOOD" | "EVIL"

export interface Role {
    alignment: Alignment
    name: string,
    description: string,
    image: string,
    balance: number, // Positive for good, negative for evil
    shootable: boolean // Has information or mechanics during the game to narrow the Blind Hunter's shot
}

export const Roles: Role[] = [
    { image: "👑", name: "Arthur", balance: 1, shootable: true, alignment: "GOOD", description: "Knows Morgan le Fay" },
    { image: "📿", name: "Cleric", balance: 1, shootable: true, alignment: "GOOD", description: "Knows loyalty of first leader." },
    { image: "🙌", name: "Archduke", balance: 4, shootable: false, alignment: "GOOD", description: "Can move one ally's hand during Good's Last Stand." },
    { image: "👏", name: "Duke", balance: 2, shootable: false, alignment: "GOOD", description: "Can drop one ally's hand during Good's Last Stand." },
    { image: "👐", name: "Apprentice", balance: 2, shootable: false, alignment: "GOOD", description: "Can delay own second hand during Good's Last Stand." },
    { image: "😨", name: "Troublemaker", balance: -1, shootable: true, alignment: "GOOD", description: "Must give red card during loyalty check." },
    { image: "👦", name: "Youth", balance: -2, shootable: true, alignment: "GOOD", description: "Must fail quest if flamed." },
    { image: "⚔️", name: "LoyalServant", balance: 0, shootable: false, alignment: "GOOD", description: "No special abilities." },
    { image: "⛪️", name: "RngArthurCleric", balance: 2, shootable: true, alignment: "GOOD", description: "Randomly choose Arthur or Cleric and tuck the other role." },
    { image: "😱", name: "RngTroubleYouth", balance: -2, shootable: true, alignment: "GOOD", description: "Randomly choose Troublemaker or Youth and tuck the other role." },
    { image: "❤️‍🔥", name: "Morgan le Fay",shootable: false, balance: -2, alignment: "EVIL", description: "May fail a quest, even when flamed." },
    { image: "🤥", name: "Trickster", shootable: false, balance: -3, alignment: "EVIL", description: "May lie when checked for loyalty or as first leader during pre-game." },
    { image: "🏹", name: "BlindHunter", shootable: false, balance: 1, alignment: "EVIL", description: "Does not know evil. Can shoot Cleric+1 or Arthur in the post-game." },
    { image: "🫣", name: "Revealer", shootable: false, balance: 1, alignment: "EVIL", description: "Reveals self at the end of the final quest." },
    { image: "🙈", name: "Scion", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Is known by Morgan le Fay" },
    { image: "🤪", name: "Lunatic", shootable: false, balance: 1, alignment: "EVIL", description: "Must fail every quest when possible." },
    { image: "3️⃣", name: "Brute", shootable: false, balance: 1, alignment: "EVIL", description: "Cannot fail Quest 4 or 5." },
    { image: "😈", name: "Minion", shootable: false, balance: 0, alignment: "EVIL", description: "No special abilities." },
    { image: "😶‍🌫️", name: "Changeling", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Evil does not know them." },
]