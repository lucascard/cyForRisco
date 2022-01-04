describe('Login', () => {
    it.only('Login com sucesso', () => {
        cy.request({
            url: 'http://localhost:8081/forpdi/api/user/login',
            method: 'POST',
            body: {
                email: Cypress.env('emailLogin'),
                password: Cypress.env('senhaLogin')
            }
        }).its('body.data.token').should('not.be.empty')
            .then(token => {
                cy.request({
                    url: 'http://localhost:8081/forpdi/api/item/new',
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: {
                        "item": {
                            "name": "título tex",
                            "description": "",
                            "policy": {
                                "name": "Matriz",
                                "description": "Essa política foi desenvolvida no intuito de dar suporte para a criação do Plano de Gestão de Riscos 2018-2020",
                                "validityBegin": "01/01/2018 00:00:00",
                                "validityEnd": "31/12/2018 00:00:00",
                                "nline": 5,
                                "ncolumn": 3,
                                "probability": "[Elevada][Muito alta][Alta][Média][Baixa]",
                                "impact": "[Alto][Médio][Baixo]",
                                "matrix": "[0,0]Elevada;[0,1]Alto;[0,2]Crítico;[0,3]Crítico;[1,0]Muito alta;[1,1]Alto;[1,2]Crítico;[1,3]Crítico;[2,0]Alta;[2,1]Moderado;[2,2]Alto;[2,3]Alto;[3,0]Média;[3,1]Moderado;[3,2]Moderado;[3,3]Alto;[4,0]Baixa;[4,1]Pequeno;[4,2]Moderado;[4,3]Alto;[5,1]Baixo;[5,2]Médio;[5,3]Alto",
                                "PIDescriptions": "{\"PIDescriptions\":{\"idescriptions\":[{\"description\":\"Deve ser Alto\",\"value\":\"Alto\"},{\"description\":\"Deve ser Médio\",\"value\":\"Médio\"},{\"description\":\"Deve ser Baixo\",\"value\":\"Baixo\"}],\"pdescriptions\":[{\"description\":\"Deve ser Elevada\",\"value\":\"Elevada\"},{\"description\":\"Deve ser Muito Alta\",\"value\":\"Muito alta\"},{\"description\":\"Deve ser Alta\",\"value\":\"Alta\"},{\"description\":\"Deve ser Média\",\"value\":\"Média\"},{\"description\":\"Deve ser Baixa\",\"value\":\"Baixa\"}]}}",
                                "archived": false,
                                "levels": 0,
                                "id": 15,
                                "deleted": false
                            },
                            "fieldItem": [{
                                "name": "nomeCampoText",
                                "isText": true,
                                "description": "<p>teste text</p>",
                                "fileLink": ""
                            }]
                        }
                    }
                }).then(res => console.log(res))
            })
    })
})