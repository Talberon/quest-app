export type Alignment  = "GOOD" | "EVIL"

export interface Role {
    alignment: Alignment
    name: string,
    description: string,
    balance: number, // Positive for good, negative for evil
    shootable: boolean // Has information or mechanics during the game to narrow the Blind Hunter's shot
}

export const Roles: Role[] = [
    { name: "Arthur", balance: 1, shootable: true, alignment: "GOOD", description: "Knows Morgan le Fay" },
    { name: "Cleric", balance: 1, shootable: true, alignment: "GOOD", description: "Knows loyalty of first leader." },
    { name: "Archduke", balance: 4, shootable: false, alignment: "GOOD", description: "Can move one hand during Good's Last Stand." },
    { name: "Duke", balance: 2, shootable: false, alignment: "GOOD", description: "Can drop one hand during Good's Last Stand." },
    { name: "Apprentice", balance: 2, shootable: false, alignment: "GOOD", description: "Can delay second hand during Good's Last Stand." },
    { name: "Troublemaker", balance: -1, shootable: true, alignment: "GOOD", description: "Must give red card during loyalty check." },
    { name: "Youth", balance: -2, shootable: true, alignment: "GOOD", description: "Must fail quest if flamed." },
    { name: "LoyalServant", balance: 0, shootable: false, alignment: "GOOD", description: "" },
    { name: "RngArthurCleric", balance: 2, shootable: true, alignment: "GOOD", description: "Randomly choose Arthur or Cleric and tuck the other role." },
    { name: "RngTroubleYouth", balance: -2, shootable: true, alignment: "GOOD", description: "Randomly choose Troublemaker or Youth and tuck the other role." },

    { name: "Morgan le Fay",shootable: false, balance: -2, alignment: "EVIL", description: "May fail a quest, even when flamed." },
    { name: "Trickster", shootable: false, balance: -3, alignment: "EVIL", description: "May lie when checked for loyalty or as first leader during pre-game." },
    { name: "BlindHunter", shootable: false, balance: 1, alignment: "EVIL", description: "Does not know evil. Can shoot Cleric+1 or Arthur in the post-game." },
    { name: "Revealer", shootable: false, balance: 1, alignment: "EVIL", description: "Reveals self at the end of the final quest." },
    { name: "Scion", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Is known by Morgan le Fay" },
    { name: "Lunatic", shootable: false, balance: 1, alignment: "EVIL", description: "Must fail every quest when possible." },
    { name: "Brute", shootable: false, balance: 1, alignment: "EVIL", description: "Cannot fail Quest 4 or 5." },
    { name: "Minion", shootable: false, balance: 0, alignment: "EVIL", description: "" },
    { name: "Changeling", shootable: false, balance: 2, alignment: "EVIL", description: "Does not know evil. Evil does not know them." },
]