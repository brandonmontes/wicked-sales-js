require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select *
  from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  const sql = `
  select *
  from "products"
  where "productId" = $1;`;
  const values = [productId];
  db.query(sql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  } else {
    const sql = `
  select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
 where "c"."cartId" = $1
  `;
    const cartId = req.session.cartId;
    db.query(sql, [cartId])
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  const sql = `
    select "price",
           "productId"
      from "products"
      where "productId" = $1;
  `;
  const id = [productId];
  if (isNaN(productId) || productId <= 0) {
    return next(new ClientError('productId must be a positive integer', 400));
  }
  db.query(sql, id)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`cannot find product with productId ${productId}`, 400);
      }
      if (req.session.cartId) {
        return (
          {
            cartId: req.session.cartId,
            productId: result.rows[0].productId,
            price: result.rows[0].price
          }
        );
      } else {
        const sql = `
           insert into "carts" ("cartId", "createdAt")
              values (default, default)
              returning "cartId";
             `;
        return db.query(sql)
          .then(firstResult => {
            return (
              {
                cartId: firstResult.rows[0].cartId,
                productId: result.rows[0].productId,
                price: result.rows[0].price
              }
            );
          });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const params = [req.session.cartId, result.productId, result.price];
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId";
      `;
      return db.query(sql, params)
        .then(secondResult => secondResult.rows[0]);
    })
    .then(result => {
      const cartItemId = result.cartItemId;
      const sql = `
        select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1;
     `;
      return db.query(sql, [cartItemId])
        .then(result => {
          const cartItem = result.rows[0];
          return res.status(201).json(cartItem);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!cartId) {
    return next(new ClientError('Missing cart session', 400));
  }
  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    return next(new ClientError('Missing checkout field(s)', 400));
  }
  const sql = `
  insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
  values ($1, $2, $3, $4)
  returning *
  `;
  const values = [cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, values)
    .then(result => { res.status(201).json(result.rows[0]); })
    .then(result => {
      const sql = `
      delete from "carts"
      where "cartId" = $1
      returning *
      `;
      const values = [cartId];
      db.query(sql, values)
        .then(secondResult => { res.json(secondResult.rows[0]); })
        .then(secondResult => {
          const sql = `
          delete from "cartItems"
          where "cartId" = $1
          returning *
          `;
          const values = [cartId];
          db.query(sql, values)
            .then(thirdResult => res.json(thirdResult.rows[0]))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}
);

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
