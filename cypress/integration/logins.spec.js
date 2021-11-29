describe('Login', () => {
    it('Login com credenciais erradas', () => {
        cy.visit('/')
        cy.get('#field-email').type('email@teste.com')
        cy.get('#field-password').type('senha')
        cy.get('.btn').click()

        cy.contains('E-mail e/ou senha inválido(s).').should('be.visible')
    }); 
    
    it('Login sem senha', () => {
        cy.visit('/')
        cy.get('#field-email').type('email@teste.com')
        cy.get('.btn').click()
        
        cy.contains('Por favor, digite sua senha').should('be.visible')
    });
   
    it('Login sem email', () => {
        cy.visit('/')
        cy.get('#field-password').type('senha')
        cy.get('.btn').click()
        
        cy.contains('Por favor, digite seu nome de usuário e sua senha').should('be.visible')
    });

    it('Login sem email e sem senha', () => {
        cy.visit('/')
        cy.get('.btn').click()
        
        cy.contains('Por favor, digite seu nome de usuário e sua senha').should('be.visible')
        
    });

    it('Login com sucesso', () => {
        cy.visit('/')
        cy.get('#field-email').type('admin@forpdi.org')
        cy.get('#field-password').type('12345')
        cy.get('.btn').click()

        cy.get('.app-select > :nth-child(1) > img').should('be.visible')
        cy.get(':nth-child(2) > img').should('be.visible')
        
    })     

    
});