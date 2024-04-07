describe('Post API Calls', () => 
{
    it('Method1 Hardcoded object', () => 
    {
        const requestBody = {
            name: "morpheus",
            job: "leader"
        }
        cy.request({
                    method:'POST',
                    url:'https://reqres.in/api/users',
                    body:requestBody
        })
        .then( (response) =>
        {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq("morpheus")
            expect(response.body.job).to.eq("leader")
        })
    })
        it('Method2 Randomly generating object', () => 
         {
        const requestBody = {
            name: Math.random().toString(5).substring(2),
            job: Math.random().toString(5)
        }
        cy.request({
                    method:'POST',
                    url:'https://reqres.in/api/users',
                    body:requestBody
        })
        .then( (response) =>
        {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq(requestBody.name)
            expect(response.body.job).to.eq(requestBody.job)
        })  
})
        it('Method3 object from fixtures', () => 
        {
        cy.fixture('UserInput').then((data) => {
            const requestBody=data;
            cy.request({
                method:'POST',
                url:'https://reqres.in/api/users',
                body:requestBody
        })
        .then( (response) =>
        {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.eq(requestBody.name)
        expect(response.body.job).to.eq(requestBody.job)

        expect(response.body).has.property('name',requestBody.name)
        expect(response.body).to.have.property('job',requestBody.job)
        })
        })  
})
})