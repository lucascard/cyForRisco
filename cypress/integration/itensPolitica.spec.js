describe('Itens da política', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')

            cy.get('#field-email').type('admin@forpdi.org')
            cy.get('#field-password').type('12345')
            cy.get('.btn').click()
        })
    });
        it('Novo item sem preencher o novo campo', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })

            cy.get('.fpdi-new-node-label').click()
            cy.get('.fpdi-card').contains('Novo Item').should('be.visible')

            cy.get('#addIconDocument').click()
            cy.get('.text-left > .btn-success').click()

            cy.contains('As alterações inseridas no novo campo ainda não foram confirmadas. Confirme-as primeiro para salvar a edição')
                .should('be.visible')

            cy.get('.modal-footer > .btn').click()
        });

        it('Novo item sem salvar o título', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })

            cy.get('.fpdi-new-node-label').click()
            cy.get('.fpdi-card').contains('Novo Item').should('be.visible')

            cy.get('#addIconDocument').click()

            cy.get(':nth-child(1) > .form-control').type('Item de texto') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Área de Texto')
            cy.get('.mdi-check').click()// Primeiro botão de salvar

            cy.get('.btn-success').click()
            cy.contains('Existem erros no formulário').should('be.visible')

        });

        it('Novo item com vários campos de texto', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })

            cy.get('.fpdi-new-node-label').click()
            cy.get('.fpdi-card').contains('Novo Item').should('be.visible')

            cy.get('#field-description').type('Título teste') //título do item

            cy.get('#addIconDocument').click()

            cy.get(':nth-child(1) > .form-control').type('Item de texto') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Área de Texto')
            cy.get('.mdi-check').click()// Primeiro botão de salvar

            cy.get('#addIconDocument').click() //adicionando outro campo
            cy.get(':nth-child(1) > .form-control').type('Segundo item de texto') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Área de Texto')
            cy.get('.mdi-check').click()// Primeiro botão de salvar

            cy.get('#addIconDocument').click() //adicionando terceiro campo      
            cy.get(':nth-child(1) > .form-control').type('Terceiro item de texto') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Área de Texto')
            cy.get('.mdi-check').click()// Primeiro botão de salvar

            cy.get('#addIconDocument').click() //adicionando quarto campo
            cy.get(':nth-child(1) > .form-control').type('Quarto item de texto') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Área de Texto')
            cy.get('.mdi-check').click()// Primeiro botão de salvar

            cy.get('.btn-success').click()
            cy.wait(500)
            cy.get('.fpdi-card').contains('Título teste').should('be.visible')
            cy.contains('Item de texto').should('be.visible')
            cy.contains('Segundo item de texto').should('be.visible')
            cy.contains('Terceiro item de texto').should('be.visible')
            cy.contains('Quarto item de texto').should('be.visible')

        });

        it('Editando título do item', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })

            cy.get('[title="Título teste"]').click()
            cy.get('h1 > .dropdown > .dropdown-toggle > .mdi').click() //abrir menu dropdown
            cy.get(':nth-child(1) > a > .mdi > #menu-levels > .fpdi-nav-label').click() //clicar em editar
            cy.get('#field-description').clear().type('Editado e vai ser excluído') //título do item

            cy.get('.btn-success').click()
            cy.contains('Item alterado com sucesso').should('be.visible')

            cy.get('.fpdi-card').contains('Editado e vai ser excluído').should('be.visible')
            cy.reload() //NÃO É O IDEAL
            cy.get('.fpdi-tabs-content > .fpdi-tabs').contains('Editado e vai ser excluído').should('be.visible')

        });
        it('Excluindo item', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })

            cy.get('[title="Editado e vai ser excluído"]').click()
            cy.get('h1 > .dropdown > .dropdown-toggle > .mdi').click() //abrir menu dropdown
            cy.get(':nth-child(2) > a > .mdi > #menu-levels > .fpdi-nav-label').click() //clicar em excluir
            cy.get('.btn-success').click() //confirmar

        });
    
        it('Imagem no campo de texto', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })
            cy.get('.fpdi-new-node-label').click()

            cy.get('#field-description').type('Imagem no texto') //título do item
            cy.get('#addIconDocument').click()

            cy.get(':nth-child(1) > .form-control').type('teste') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Área de Texto')

            const fileName = 'img.png'
            cy.get('.ql-image > svg').attachFile(fileName)

            cy.get('.mdi-check').click()
            cy.get('.btn-success').click()

            //cy.get('.mdi-check').click()// Primeiro botão de salvar
        });

        it.only('Upload de imagem', () => {
            cy.visit('/')

            cy.get(':nth-child(2) > .app-select--card-bt > span').click()
            cy.get('.forrisco-app-sidebar').find('[title="Matriz"]').click({ multiple: true })
            cy.get('.fpdi-new-node-label').click()

            cy.get('#field-description').type('Upload de imagem') //título do item
            cy.get('#addIconDocument').click()

            cy.get(':nth-child(1) > .form-control').type('teste') //Nome do campo
            cy.get('#selectFieldType-undefined').select('Upload de Arquivo(PDF ou imagem)')

            cy.get(':nth-child(1) > .fpdi-tabs-nav > a > :nth-child(2) > .fpdi-nav-label').click()

            const fileName = 'img.png'
            cy.get('[id="file-upload-field"]').attachFile(fileName)

            cy.get('.mdi-check').click()
            cy.contains('Arquivo enviado com sucesso').should('be.visible')

            cy.get('.btn-success').click()

            cy.contains('Item salvo com sucesso').should('be.visible')
            
            cy.get('.fpdi-card').contains('img.png').should('be.visible')
            
        });
})