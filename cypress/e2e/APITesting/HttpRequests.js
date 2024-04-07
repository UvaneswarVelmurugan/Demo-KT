describe('Http Requests', () =>
{
    it('GET Request', () => 
    {
        cy.request('GET','https://reqres.in/api/users/2')
        .its('status')
        .should('equal',200);
    })
    it('POST Request', () => 
    {
        cy.request({
                    method:'POST',
                    url:'https://reqres.in/api/users',
                    body:{
                            name: "morpheus",
                            job: "leader"
                        }
        })
        .its('status')
        .should('equal',201);
    })
    it('PUT Request', () => 
    {
        cy.request({
                    method:'PUT',
                    url:'https://reqres.in/api/users/2',
                    body:{
                            name: "morpheus",
                            job: "leader",
                            id: "1"
                        }
        })
        .its('status')
        .should('equal',200);
    }) 
    it('Delete Request', () => 
    {
        cy.request({
                    method:'DELETE',
                    url:'https://reqres.in/api/users/2'
        })
        .its('status')
        .should('equal',204);
    })
})