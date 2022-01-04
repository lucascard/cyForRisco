describe('Plano de Gestão de Riscos', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#field-email').type(Cypress.env('emailLogin'))
            cy.get('#field-password').type(Cypress.env('senhaLogin'))
            cy.get('.btn').click()
        }) 
    })

    it('Criar Plano', () => {
        cy.visit('/')
        
        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[href="#/forrisco/plan-risk/new"]').click()
        cy.get('#field-name').type('Plano de Gestão de Riscos')
    });    
});