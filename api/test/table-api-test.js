import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the tables endpoints:', () => {
  
  it('It should create a tables', (done) => {
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
      option: null,
      quant: 1,
      productId: 2,
      orderId: 2,
      typeId: null,
    }
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
          .send(product)
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

  // it('It should get a particular table', (done) => {
  //   const tableId = 1
  //   chai.request(app)
  //     .get(`/api/products/${tableId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       console.log(err)
  //       expect(res.status).to.equal(200)
  //       res.body.data.should.have.property('id')
  //       res.body.data.should.have.property('option')
  //       res.body.data.should.have.property('quant')
  //       res.body.data.should.have.property('productId')
  //       res.body.data.should.have.property('orderId')
  //       res.body.data.should.have.property('typeId')
  //       done()
  //     })
  // })

  // it('It should not get a particular product with invalid id', (done) => {
  //   const productId = 8888
  //   chai.request(app)
  //     .get(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       res.body.should.have.property('message')
  //                           .eql(`Cannot find Product with the id ${productId}`)
  //       done()
  //     })
  // })

  // it('It should not get a particular p with non-numeric id', (done) => {
  //   const productId = 'aaa'
  //   chai.request(app)
  //     .get(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400)
  //       res.body.should.have.property('message')
  //                           .eql('Please input a valid numeric value')
  //       done()
  //     })
  // })

  // it('It should update a table', (done) => {
  //   const tableId = 1
  //   const updatedTable = {
  //     id: tableId,
  //     menu: 'allDay',
  //     name: 'Pão de queijo',
  //     price: '5.00',
  //     type: 'nenhum',
  //   }
  //   chai.request(app)
  //     .put(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedProduct)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200)
  //       expect(res.body.data.id).equal(updatedProduct.id)
  //       expect(res.body.data.menu).equal(updatedProduct.menu)
  //       expect(res.body.data.price).equal(updatedProduct.price)
  //       expect(res.body.data.type).equal(updatedProduct.type)
  //       done()
  //     })
  // })

  // it('It should not update a product with invalid id', (done) => {
  //   const productId = '9999'
  //   const updatedProduct = {
  //     id: productId,
  //     menu: 'allDay',
  //     name: 'Pão de queijo',
  //     price: '5.00',
  //     type: 'nenhum',
  //   }
  //   chai.request(app)
  //     .put(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedProduct)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       res.body.should.have.property('message')
  //                           .eql(`Cannot find product with the id: ${productId}`)
  //       done()
  //     })
  // })

  // it('It should not update a product with non-numeric id value', (done) => {
  //   const productId = 'ggg'
  //   const updatedProduct = {
  //     id: productId,
  //     menu: 'allDay',
  //     name: 'Pão de queijo',
  //     price: '5.00',
  //     type: 'nenhum',
  //   }
  //   chai.request(app)
  //     .put(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedProduct)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400)
  //       res.body.should.have.property('message')
  //                           .eql('Please input a valid numeric value')
  //       done()
  //     })
  // })


  // it('It should delete a product', (done) => {
  //   const productId = 1
  //   chai.request(app)
  //     .delete(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200)
  //       expect(res.body.data).to.include({})
  //       done()
  //     })
  // })

  // it('It should not delete a product with invalid id', (done) => {
  //   const productId = 777
  //   chai.request(app)
  //     .delete(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       res.body.should.have.property('message')
  //                           .eql(`Product with the id ${productId} cannot be found`)
  //       done()
  //     })
  // })

  // it('It should not delete a product with non-numeric id', (done) => {
  //   const productId = 'bbb'
  //   chai.request(app)
  //     .delete(`/api/products/${productId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400)
  //       res.body.should.have.property('message').eql('Please provide a numeric value')
  //       done()
  //     })
  // })
})