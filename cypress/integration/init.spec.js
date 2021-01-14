describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true)
  })
})

describe('Client', () => {
  it('visits the app', () => {
    cy.visit('/')
  })
})

describe('API', () => {
  it('visits the api endpoint /test', () => {
    cy.visit('http://localhost:4000/test')
  })
})
