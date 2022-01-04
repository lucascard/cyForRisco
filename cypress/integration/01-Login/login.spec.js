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
        cy.get('#field-email').type(Cypress.env('emailLogin'))
        cy.get('#field-password').type(Cypress.env('senhaLogin'))
        cy.get('.btn').click()

        cy.get('.app-select > :nth-child(1) > img').should('be.visible')
        cy.get(':nth-child(2) > img').should('be.visible')
    })     

    it('Redefinir a senha sem inserir o e-mail', () => {
        cy.visit('/')
        cy.get('a > .fpdi-nav-label').click()
        cy.contains('Recupere sua senha').should('be.visible')

        cy.get('.btn-default').click()
        cy.contains('Login').should('be.visible')

        cy.get('a > .fpdi-nav-label').click()
        cy.contains('Recupere sua senha').should('be.visible')

        cy.get('.btn-success').click()
        cy.contains('Campo de e-mail vazio!').should('be.visible')
        
    });
    
    it('Redefinir a senha com email válido', () => {
        cy.visit('/')
        cy.get('a > .fpdi-nav-label').click()
        cy.contains('Recupere sua senha').should('be.visible')

        cy.get('#field-email').type('email@teste.com')
        cy.get('.btn-success').click()
        cy.contains('Atenção').should('be.visible')
        cy.get('.modal-footer > .btn').click()

        cy.contains('Login').should('be.visible')
    });
});