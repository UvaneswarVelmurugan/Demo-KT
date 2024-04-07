describe('API Chaining', () =>
{
    it('Getting all the Posts', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
            const postid=response.body[0].userId
            return postid
        })      
        .then((postid) =>
        {
            cy.request({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/comments?',
                qs:{
                    postId: postid
                }
            })
            .then((response)=>
            {
                expect(response.status).equal(200)
                expect(response.body).to.have.length(5);
            })
        })      
    })
})