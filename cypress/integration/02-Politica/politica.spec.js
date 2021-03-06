describe('Nova política', () => {
    beforeEach(() => {
        cy.session('login ForRisco', () => {
            cy.visit('/');

            cy.get('#field-email').type(Cypress.env('emailLogin'));
            cy.get('#field-password').type(Cypress.env('senhaLogin'));
            cy.get('.btn').click()
        })
    });

    it('Salvar sem preencher nada', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[href="#/forrisco/policy/new"]').click() //Nova política

        cy.get('.btn-success').click()
        cy.contains('Existem erros no formulário').should('be.visible')

        cy.get('#field-name')
            .parents().find('[class="formAlertError"]').should('contain', 'Este campo obrigatório')
    })

    it('Salvar sem preencher Probabilidade e Impacto', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[href="#/forrisco/policy/new"]').click() //Nova política

        cy.get('#field-name').type('Nova política')
        cy.get('#field-risk_level_1').type('Crítico')
        cy.get('#field-risk_cor_1').select('Vermelho')

        cy.get('#field-nline').type('6')
        cy.get('#field-ncolumn').type('6')

        cy.get('.btn-primary > .fpdi-nav-label').click()

        cy.get('table').should('not.exist')
    });

    it('Criando Política que deve ser excluída', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[href="#/forrisco/policy/new"]').click() //Nova política

        cy.get('#field-name').type('Política que deve ser excluída')
            .invoke('attr', 'maxlength').should('eq', '240');

        cy.get('#field-description').type('Essa política foi desenvolvida no intuito de dar suporte para a criação do Plano de Gestão de Riscos 2018-2020')
            .invoke('attr', 'maxlength').should('eq', '9900');

        cy.get('#field-risk-vigencia-begin').type('01/01/2018')
        cy.get('#field-risk-vigencia-end').type('31/12/2018')

        for (let i = 0; i < 4; i++) {
            cy.get('[style="position: relative; bottom: 5px;"] > .mdi').click()
        }

        cy.get('#field-risk_level_1').type('Crítico')
            .invoke('attr', 'maxlength').should('eq', '30');

        cy.get('#field-risk_level_2').type('Alto')
        cy.get('#field-risk_level_3').type('Moderado')
        cy.get('#field-risk_level_4').type('Pequeno')
        cy.get('#field-risk_level_5').type('exclusão')

        cy.get('#field-risk_cor_1').select('Vermelho')
        cy.get('#field-risk_cor_2').select('Amarelo')
        cy.get('#field-risk_cor_3').select('Verde')
        cy.get('#field-risk_cor_4').select('Azul')

        cy.get(':nth-child(17) > [style="display: inline-flex;"] > :nth-child(3) > a > .mdi').click()

        cy.get('#field-nline').type('5')

        cy.get('#field-probability_1').type('Elevada')
            .invoke('attr', 'maxlength').should('eq', '30');

        cy.get('#field-probability_2').type('Muito alta')
        cy.get('#field-probability_3').type('Alta')
        cy.get('#field-probability_4').type('Média')
        cy.get('#field-probability_5').type('Baixa')

        cy.get('#field-probability_description_1').type('Deve ser Elevada')
            .invoke('attr', 'maxlength').should('eq', '30');

        cy.get('#field-probability_description_2').type('Deve ser Muito Alta')
        cy.get('#field-probability_description_3').type('Deve ser Alta')
        cy.get('#field-probability_description_4').type('Deve ser Média')
        cy.get('#field-probability_description_5').type('Deve ser Baixa')

        cy.get('#field-ncolumn').type('3')

        cy.get('#field-impact_1').type('Alto')
            .invoke('attr', 'maxlength').should('eq', '30');

        cy.get('#field-impact_2').type('Médio')
        cy.get('#field-impact_3').type('Baixo')

        cy.get('#field-impact_description_1').type('Deve ser Alto')
            .invoke('attr', 'maxlength').should('eq', '999');

        cy.get('#field-impact_description_2').type('Deve ser Médio')
        cy.get('#field-impact_description_3').type('Deve ser Baixo')

        cy.get('.btn-primary > .fpdi-nav-label').click()

        cy.get('#field-\\[0\\,0\\]').select('Elevada')
        cy.get('#field-\\[1\\,0\\]').select('Muito alta')
        cy.get('#field-\\[2\\,0\\]').select('Alta')
        cy.get('#field-\\[3\\,0\\]').select('Média')
        cy.get('#field-\\[4\\,0\\]').select('Baixa')

        cy.get('#field-\\[0\\,1\\]').select('Alto')
        cy.get('#field-\\[1\\,1\\]').select('Alto')
        cy.get('#field-\\[2\\,1\\]').select('Moderado')
        cy.get('#field-\\[3\\,1\\]').select('Moderado')
        cy.get('#field-\\[4\\,1\\]').select('Pequeno')
        cy.get('#field-\\[5\\,1\\]').select('Baixo')

        cy.get('#field-\\[0\\,2\\]').select('Crítico')
        cy.get('#field-\\[1\\,2\\]').select('Crítico')
        cy.get('#field-\\[2\\,2\\]').select('Alto')
        cy.get('#field-\\[3\\,2\\]').select('Moderado')
        cy.get('#field-\\[4\\,2\\]').select('Moderado')
        cy.get('#field-\\[5\\,2\\]').select('Médio')

        cy.get('#field-\\[0\\,3\\]').select('Crítico')
        cy.get('#field-\\[1\\,3\\]').select('Crítico')
        cy.get('#field-\\[2\\,3\\]').select('Alto')
        cy.get('#field-\\[3\\,3\\]').select('Alto')
        cy.get('#field-\\[4\\,3\\]').select('Alto')
        cy.get('#field-\\[5\\,3\\]').select('Alto')

        cy.get('.btn-success').click()
        cy.contains('Política criada com sucesso!').should('be.visible')
        cy.contains('Política que deve ser excluída').should('be.visible')
    });

    it('Editar Política', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[title="Política que deve ser excluída"]').click({ multiple: true })

        cy.get('h1 > .dropdown > .dropdown-toggle > .mdi').click() //abrir menu dropdown
        cy.get('#level-menu > :nth-child(1) > a').click()//clicar em editar

        cy.get('#field-name').clear().type('Esta política deve ser excluída')
        cy.get('#field-description').clear().type('Esta política foi alterada para testar a funcionalidade de deletar política.')
        cy.get('.btn-success').click()
        cy.contains('Política atualizada com sucesso!').should('be.visible')
    })

    it('Deletar Política', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[title="Esta política deve ser excluída"]').click({ multiple: true })

        cy.get('h1 > .dropdown > .dropdown-toggle > .mdi').click() //abrir menu dropdown
        cy.get('#level-menu > :nth-child(2) > a').click()//clicar em deletar
    });
});