/// <reference types = "Cypress" />

describe('Authentications', () =>
{
    it('Basic Auth', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth:{
                user: 'postman',
                pass: 'password'
            }
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })
    it('digest Auth', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth:{
                username: 'postman',
                password: 'password',
                method: 'digest' 
            }
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })
    const token='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'
    it('Bearer Token Auth', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers:{
                Authorization: 'Bearer '+token 
            }
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
        })
    })
    it('API Key Auth', () =>
    {
        cy.request({
            method: 'GET',
            url: 'api.openweathermap.org/data/2.5/forecast/daily',
            qs:{
                q: "Delhi",
                appid: 'fe9c5cddb7e01d747b4611c3fc9eaf2c'
            }
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
        })
    })
})