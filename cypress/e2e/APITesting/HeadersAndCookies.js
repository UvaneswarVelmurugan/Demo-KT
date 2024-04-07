describe('Headers and Cookies', () =>
{
    let Auth=null;
    before('Passing User data', () =>
    {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                'Content-Type': 'application/json'
            },
            body:{
                clientName: 'ABC',
                clientEmail: Math.random().toString(5).substring(2)+"@gmail.com"
            }
        })
        .then((response) =>
        {
                Auth=response.body.accessToken
        })
    })
    it('Passing Access Token', () =>
    {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Auth
            },
            body:{
                bookId: 1,
                customerName: 'xyzas'
            }
        })
        .then((response) =>
        {
            expect(response.status).equal(201)
            expect(response.body.created).to.eq(true);
        })
    })
    it('Getting Order data', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Auth,
                'cookie': 'cookieName=MyCookie'
             }
            //,
            // cookies:{
            //     'cookieName': 'MyCookie'
            // }
        })
        // .then((response) =>
        // {
        //     expect(response.status).equal(200)
        //     expect(response.body).has.length(1);
        // })
        .then((response) => {
            const cookies = response.headers['MyCookie'];
            expect(response.status).equal(200)
            expect(response.body).has.length(1);
            console.log(cookies);
          });
    })
})