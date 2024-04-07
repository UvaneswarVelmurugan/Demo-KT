describe('GoRest API Chaining', () =>
{
    const auth_token='Bearer d3ba60e16372e48448be750c1bf8f65f48887f5905e2016787a095e5f9b4def1'
    it('create, update, delete user', () =>
    {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            body:{
                name:'John Kenedy',
                gender: 'male',
                email: Math.random().toString(5).substring(2)+"@gmail.com",
                status: 'active'
            },
            
        .then((response)=>{
        expect(response.status).equal(201)
        const userid=response.body.id

        cy.request({
            method: 'PUT',
            url: `https://gorest.co.in/public/v2/users/${userid}`,
            body: {
                name: 'Scott'
            },
            headers:{
                Authorization:auth_token
            }
        })
        .then((response)=>{
            expect(response.status).equal(200)
            expect(response.body.name).equal('Scott')

            cy.request({
                method: 'DELETE',
                url: `https://gorest.co.in/public/v2/users/${userid}`,
                headers:{
                    Authorization:auth_token
                }
            })
            .then((response)=>{
                expect(response.status).equal(204)
            })
        })
    })
    })
})