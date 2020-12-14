import globalReducer from "./globalreducer"

export const reducer:ICardReducer = {
  // Delete a card by id
  deleteCard: (state:Card[], id:string) => state.filter(i => i.id !== id),

  // Create a new card
  addCard: (state:Card[], card:Card):Card[] => [card, ...state],

  // Add multiple new cards
  addCards: (state:Card[], cards:Card[]):Card[] => [...cards, ...state],

  // Set the status of an item
  setStatus: (state:Card[], id:string, status:CardStatus):Card[] =>
    state.map(i =>
      i.id === id
        ? {
            ...i,
            status
          }
        : i
    ),

  // Set the label of an item
  setTitle: (state:Card[], id:string, title:string):Card[] =>
    state.map(i =>
      i.id === id
        ? {
            ...i,
            title
          }
        : i
    ),

    // Set the owner of an item
    setOwner: (state:Card[], id:string, owner:string):Card[] =>
      state.map(i =>
        i.id === id
          ? {
              ...i,
              owner
            }
          : i
      )

}

export default globalReducer(
  // Load cards from local storage
  // JSON.parse(localStorage.getItem("cards") || "[]"),
  [],
  reducer
  // On state change, persist to local storage
  // cards => localStorage.setItem("cards", JSON.stringify(cards))
)
