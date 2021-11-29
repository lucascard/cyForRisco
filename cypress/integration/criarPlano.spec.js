describe('Forrisco', () => {
    beforeEach(() => {
        cy.session('login ForRisco', () => {
            cy.visit('/');

            cy.get('#field-email').type('admin@forpdi.org')
            cy.get('#field-password').type('12345')
            cy.get('.btn').click()
            
        })
    });
    it('Criar Nova Política', () => {
        cy.visit('/')
        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[href="#/forrisco/policy/new"]').click() //Nova política
        cy.get('#field-name').type('Política de Teste')
        cy.get('#field-description').type('Política de Teste')
        cy.get('#field-risk-type').select('1')
        

        
    });
    
});