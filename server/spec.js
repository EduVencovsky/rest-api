const app = require('./server')
const request = require('supertest')
const expect = require('chai').expect
require('colors')

describe('[LIONS]'.yellow, () => {

    let firstLion = {
        name: 'Lion King',
        age: 100
    }

    let secondLion = {
        name: "Edu", 
        age: 20
    }

    let lionId = ''

    it('should post an lions', done => {
        request(app)
            .post('/lions')
            .set('Accept', 'application/json')
            .send(firstLion)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((error, res) => {                
                expect(res.body.id).to.be.an('string')
                lionId = res.body.id
                expect(res.body).to.be.an('object')
                done()
            })
    })

    it('should change firstLion to secondLion', done => {
        request(app)
            .put('/lions/' + lionId)
            .set('Accept', 'application/json')
            .send(secondLion)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, res) => {
                let lion = res.body
                expect(lion).to.be.an('object')
                expect(lion.name).to.equal('Edu')
                secondLion = lion
                done()
            })
    })

    it('should get secondLion', done => {
        request(app)
            .get('/lions/' + lionId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, res) => {
                expect(res.body).to.be.eql(secondLion)
                done()
            })
    })

    it('should delete secondLion', done => {
        request(app)
            .delete('/lions/' + lionId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, res) => {
                expect(res.body).to.be.eql(secondLion)
                done()
            })
    })

    it('should get no lions', done => {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, res) => {
                expect(res.body).to.be.eql([])
                done()
            })
    })

})
