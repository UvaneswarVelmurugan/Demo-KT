describe('OAuth2', () =>
{
    let accessToken="";
     it('Get OAuth2 Access token', () =>
     {
        cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs: {
                client_id: '69219699d29976947368',
                client_secret: 'b9d226a73faf232620a1fc3e86f1a0c1127b23f9',
                code: '3cb8f2af44e95706ca7d'
            }
        })
        .then((response) => {
            const params=response.body.split('&');
            accessToken=params[0].split("=")[1];  
        })
     })

     it('OAuth2 Request', () =>
     {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer '+accessToken
            }
        })
        .then((response) => {
            expect(response.status).equal(200)
            expect(response.body[0].id).equal(614719809)
        })
     })
})