const xml2js=require('xml2js')
const parser=new xml2js.Parser({explicitArray: false});

describe('Parsing XML', () =>
{
    //const xmlPayLoad="<Pet><id>0</id><Category><id>0</id><name>string</name></Category><name>doggie</name><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><Tag><id>0</id><name>string</name></Tag></tags><status>available</status></Pet>"
    //const xmlpayload = cy.readfile('cypress/fixtures/xmlData.xml').its(Elementlement)
    
    let petId=null;

    before('Sending Pet Details', () =>
    {
        cy.fixture('xmlData.xml').then((xmlData) => {
          
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            body: xmlData,
            headers: {
                'Content-Type':'application/xml',
                'accept':'application/xml'
            }
        })
        .then((response) =>
        {
            expect(response.status).to.eq(200)
            parser.parseString(response.body,(err,result) => {
                petId=result.Pet.id;
            })
        })
    })
    })

    it('Getting Pet Details', () =>
    {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/'+petId,
            headers: {
                'accept':'application/xml'
            }
        })
        .then((response) =>
        {
            expect(response.status).to.eq(200)
            parser.parseString(response.body,(err,result) => {
                expect(result.Pet.name).to.eq("doggie")
                expect(result.Pet.id).to.eq(petId)
            })
        })
    })
})