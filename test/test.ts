
const { gql } = require('apollo-server-express');
const { apolloClient, connectToDb, dropTestDb, closeDbConnection } = require('./testSetup');
const { ObjectId } = require('mongodb');

// const { userService } = require('../frontend/src/services/userService')
const { CardService } = require('../frontend/src/services/cardService')

beforeAll(async () => {
  await connectToDb()
  await dropTestDb()
});

afterAll(async () => {
  await dropTestDb()
  await closeDbConnection()
});

test('Is Jest working?', () => {
  expect(1 + 1).toBe(2)
})

test('Resolver working', async () => {
  expect.assertions(1)

  const res = await apolloClient.query({
    query: gql`{
      name
    }`
  })

  expect(res.data.name).toEqual('Peter')
})

// test('Test getUsers', async () => {
//   expect.assertions(1)
//
//   const getUsers = await userService.getUsers((res:any) => res)
//   expect(getUsers).toEqual([])
//
// })
//
// test('Test addUser', async () => {
//   expect.assertions(1)
//
//   const addUser = await userService.addUser((res:any) => res,'Testname')
//   expect(addUser[0].value).toEqual('Testname')
//
// })
//
// test('Test deleteUser', async () => {
//   expect.assertions(3)
//
//   const getUsers2 = await userService.getUsers((res:any) => res)
//   expect(getUsers2.length).toBe(1)
//   expect(getUsers2[0].value).toEqual('Testname')
//
//
//   const deleteUser = await userService.deleteUser((res:any) => res,getUsers2[0].id)
//   expect(deleteUser).toEqual(getUsers2[0].id)
//
// })
//
// test('Test getUsers3', async () => {
//   expect.assertions(1)
//
//   const getUsers3 = await userService.getUsers((res:any) => res)
//   expect(getUsers3).toEqual([])
//
// })

const dispatcher = {
  addCard: (a:any) => a,
  addCards: (a:any) => a,
  deleteCard: (a:any) => a,
  setStatus: (a:any) => a,
  setTitle: (a:any) => a,
  setOwner: (a:any) => a,
}

const cardService = CardService.getInstance(dispatcher, apolloClient)

test('Test getCards', async () => {

expect.assertions(1)

  const getCards = await cardService.getCards()
  expect(getCards).toEqual([])

})

test('Test addCard', async () => {

  expect.assertions(1)

  const addCard = await cardService.addCard({status:'todo'})
  expect(addCard.status.value).toEqual('todo')

})

test('Test deleteCard', async () => {

  expect.assertions(3)

  const getCards2 = await cardService.getCards()
  expect(getCards2.length).toEqual(1)
  expect(getCards2[0].status.value).toEqual('todo')

  const deleteCard = await cardService.deleteCard(getCards2[0].id)
  expect(deleteCard).toEqual(getCards2[0].id)

  })

test('Test getCards3', async () => {

  expect.assertions(1)

  const getCards3 = await cardService.getCards()
  expect(getCards3).toEqual([])

})
