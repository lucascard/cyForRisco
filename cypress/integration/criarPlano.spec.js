describe('Nova política', () => {
    beforeEach(() => {
        cy.session('login ForRisco', () => {
            cy.visit('/');

            cy.get('#field-email').type('admin@forpdi.org')
            cy.get('#field-password').type('12345')
            cy.get('.btn').click()
            
        })
    });

    it('Criando plano completo', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .app-select--card-bt > span').click()
        cy.get('.forrisco-app-sidebar').find('[href="#/forrisco/policy/new"]').click() //Nova política

        cy.get('#field-name').type('Política de Gestão de Riscos - 2018')
        .invoke('attr', 'maxlength').should ('eq', '240');

        cy.get('#field-description').type('Essa política foi desenvolvida no intuito de dar suporte para a criação do Plano de Gestão de Riscos 2018-2020')
        .invoke('attr', 'maxlength').should ('eq', '9900');

        cy.get('#field-risk-vigencia-begin').type('01/01/2018')
        cy.get('#field-risk-vigencia-end').type('31/12/2018')

        for (let i = 0; i <4; i++) {
        cy.get('[style="position: relative; bottom: 5px;"] > .mdi').click()
        }

        cy.get('#field-risk_level_1').type('Crítico')
        .invoke('attr', 'maxlength').should ('eq', '30');

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
        .invoke('attr', 'maxlength').should ('eq', '30');

        cy.get('#field-probability_2').type('Muito alta')
        cy.get('#field-probability_3').type('Alta')
        cy.get('#field-probability_4').type('Média')
        cy.get('#field-probability_5').type('Baixa')

        cy.get('#field-probability_description_1').type('Deve ser Elevada')
        .invoke('attr', 'maxlength').should ('eq', '30');

        cy.get('#field-probability_description_2').type('Deve ser Muito Alta')
        cy.get('#field-probability_description_3').type('Deve ser Alta')
        cy.get('#field-probability_description_4').type('Deve ser Média')
        cy.get('#field-probability_description_5').type('Deve ser Baixa')
        
        cy.get('#field-ncolumn').type('3')

        cy.get('#field-impact_1').type('Alto')
        .invoke('attr', 'maxlength').should ('eq', '30');

        cy.get('#field-impact_2').type('Médio')
        cy.get('#field-impact_3').type('Baixo')

        cy.get('#field-impact_description_1').type('Deve ser Alto')
        .invoke('attr', 'maxlength').should ('eq', '30');

        cy.get('#field-impact_description_2').type('Deve ser Médio')
        cy.get('#field-impact_description_3').type('Deve ser Baixo')
        







        
    });
});