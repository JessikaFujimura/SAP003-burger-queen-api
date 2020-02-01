import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './server/routes/ProductRoutes';
import orderRoutes from './server/routes/OrderRoutes';
import tableRoutes from './server/routes/TableRoutes';

const app = express();

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Listagem de produtos'
}))

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})

export default app;