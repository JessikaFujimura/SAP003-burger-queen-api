import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

const product = {
  menu: 'allDay',
  name: 'Bolo',
  price: '5.00',
  type: 'doces',
}
const order = {
  client: 'Jessika',
  status: 'em produção',
  table: 1,
  waiter: 'João',
}
const table = {
  option: "bovino",
  quant: 1,
  productId: 2,
  orderId: 2,
  typeId: 2,
}


describe('Testing the tables endpoints:', () => {

  it('It should create a tables', (done) => {
    chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          id: 2,
          menu: product.menu,
          name: product.name,
          price: product.price,
          type: product.type,
        })
        chai.request(app)
          .post('/api/orders')
          .set('Accept', 'application/json')
          .send(order)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.data).to.include({
              id: 2,
              client: order.client,
              status: order.status,
              table: order.table,
              waiter: order.waiter,
            })
            chai.request(app)
              .post('/api/tables')
              .set('Accept', 'application/json')
              .send(table)
              .end((err, res) => {
                expect(res.status).to.equal(201)
                expect(res.body.data).to.include({
                  id: 1,
                  option: table.option,
                  quant: table.quant,
                  productId: table.productId,
                  orderId: table.orderId,
                  typeId: table.typeId,
                })
                done()
              })
          })
      })
  })

  it('It should not create a table with incomplete parameters', (done) => {
    const tables = {
      quant: 3,
      orderId: 2,
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(tables)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all tables', (done) => {
    chai.request(app)
      .get('/api/tables')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('option')
        res.body.data[0].should.have.property('quant')
        res.body.data[0].should.have.property('productId')
        res.body.data[0].should.have.property('orderId')
        res.body.data[0].should.have.property('typeId')
        done()
      })
  })

  it('It should get a particular table', (done) => {
    const tableId = 1
    chai.request(app)
      .get(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log("erro get all tables", res.body);
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('option')
        res.body.data.should.have.property('quant')
        res.body.data.should.have.property('productId')
        res.body.data.should.have.property('orderId')
        res.body.data.should.have.property('typeId')
        done()
      })
  })

  it('It should not get a particular table with invalid id', (done) => {
    const tableId = 8888
    chai.request(app)
      .get(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
        .eql(`Cannot find Table with the id ${tableId}`)
        done()
      })
  })

  it('It should not get a particular table with non-numeric id', (done) => {
    const tableId = 'aaa'
    chai.request(app)
      .get(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
        .eql('Please input a valid numeric value')
        done()
      })
  })

  it('It should update a table', (done) => {
    const tableId = 1
    const updatedTable = {
      id: tableId,
      option: "vegetariano",
      quant: 2,
      productId: 2,
      orderId: 2,
      typeId: 2,
    }
    chai.request(app)
      .put(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedTable.id)
        expect(res.body.data.option).equal(updatedTable.option)
        expect(res.body.data.quant).equal(updatedTable.quant)
        expect(res.body.data.productId).equal(updatedTable.productId)
        expect(res.body.data.orderId).equal(updatedTable.orderId)
        expect(res.body.data.typeId).equal(updatedTable.typeId)
        done()
      })
  })

  it('It should not update a table with invalid id', (done) => {
    const tableId = '9999'
    const updatedTable = {
      id: tableId,
      option: "vegetariano",
      quant: 2,
      productId: 2,
      orderId: 2,
      typeId: 2,
    }
    chai.request(app)
      .put(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
                            .eql(`Cannot find Table with the id: ${tableId}`)
        done()
      })
  })

  it('It should not update a table with non-numeric id value', (done) => {
    const tableId = 'ggg'
    const updatedTable = {
      id: tableId,
      option: "vegetariano",
      quant: 2,
      productId: 2,
      orderId: 2,
      typeId: 2,
    }
    chai.request(app)
      .put(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value')
        done()
      })
  })


  it('It should delete a table', (done) => {
    const tableId = 1
    chai.request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.include({})
        done()
      })
  })

  it('It should not delete a table with invalid id', (done) => {
    const tableId = 777
    chai.request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
                            .eql(`Table with the id ${tableId} cannot be found`)
        done()
      })
  })

  it('It should not delete a table with non-numeric id', (done) => {
    const tableId = 'bbb'
    chai.request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  })
})