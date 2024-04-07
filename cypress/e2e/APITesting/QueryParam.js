describe('Query Parameter demo', () =>
{
    it('Passing Query Parameter', () =>
    {
        const queryParam={page: 2}
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            qs: queryParam
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
            expect(response.body.page).equal(2)
            expect(response.body.data).has.length(6)
            expect(response.body.data[0]).has.property('id',7)
            expect(response.body.data[0]).has.property('first_name',"Michael")
        })
    })
})