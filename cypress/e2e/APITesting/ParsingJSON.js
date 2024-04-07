describe('Parsing JSON data', () =>
{
    it('JSON Parse', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products'
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
            expect(response.body[0].id).equal(1)
            expect(response.body[0].title).equal("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
            expect(response.body[0].price).equal(109.95)
            expect(response.body[0].rating.rate).equal(3.9)

            expect(response.body[19].id).equal(20)
            expect(response.body[19].title).equal("DANVOUY Womens T Shirt Casual Cotton Short")
            expect(response.body[19].price).equal(12.99)
            expect(response.body[19].rating.rate).equal(3.6)
        })
    })
        it('JSON complex Parse', () =>
    {
        let totalPrice=0
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
            qs: {limit: 5}
        })
        .then((response) =>
        {
            expect(response.status).equal(200)
            response.body.forEach(element => {
                totalPrice=totalPrice+element.price;
            });
            expect(totalPrice).equal(899.23)
        })
    })
})