const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware__
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://topfive-81abe.web.app",
      "https://topfive-81abe.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g4yea9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Custom middleware to verify JWT token from cookies__
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.tf_token;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorize access, token is not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Unauthorize access, token is not valid" });
      }

      req.decoded = decoded;
      next();
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error in verifyToken middleware" });
  }
};

// Cookie option object__
const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

async function run() {
  try {
    // await client.connect();

    // DB Workshop ST__

    const db = client.db("TopFive");
    const productsCollection = db.collection("products");
    const cartsCollection = db.collection("carts");

    // JSONWEBTOKEN J.W.T__
    app.post("/jwt", async (req, res) => {
      try {
        const email = req.body;

        const token = jwt.sign(email, process.env.JWT_SECRET_ACCESS_TOKEN, {
          expiresIn: "1h",
        });

        res
          .cookie("tf_token", token, cookieOption)
          .send({ message: "Access token set successfully" });
      } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // Add Products__
    app.post("/add-new-product", verifyToken, async (req, res) => {
      try {
        const productData = req.body;
        console.log(productData);

        const result = await productsCollection.insertOne(productData);
        res.status(200).send(result);
      } catch (error) {
        console.error("Error adding product:", error);
        res
          .status(500)
          .send({ message: "Failed to add product", error: error.message });
      }
    });

    // Find products with filters__
    app.get("/get-products", async (req, res) => {
      try {
        const { category, search, sort } = req.query;

        // Start query__
        let query = {};

        // Category filter (if not "all")__
        if (category) {
          query.category = category;
        }

        // Search filter__
        if (search) {
          query.name = { $regex: search, $options: "i" };
        }

        // Build MongoDB query__
        let cursor = productsCollection.find(query);

        // Price sorting__
        if (sort === "asc") {
          cursor = cursor.sort({ price: 1 });
        } else if (sort === "desc") {
          cursor = cursor.sort({ price: -1 });
        }

        const result = await cursor.toArray();
        res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to fetch products" });
      }
    });

    // Add product to cart__
    app.post("/cart-item", verifyToken, async (req, res) => {
      try {
        const cartData = req.body;
        const result = await cartsCollection.insertOne(cartData);
        res.status(200).send(result);
      } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Failed to add item to cart" });
      }
    });

    // Find user carts__
    app.get("/cart-items/:email", verifyToken, async (req, res) => {
      try {
        const email = req.params.email;

        // 1) Get cart items for the user
        const cartItems = await cartsCollection.find({ email }).toArray();

        // 2) Convert productIds to ObjectId
        const productIds = cartItems.map(
          (item) => new ObjectId(item.productId)
        );

        // 3) Get only products that are in the cart
        const products = await productsCollection
          .find({ _id: { $in: productIds } })
          .toArray();

        res.status(200).json(products); // send products only
      } catch (error) {
        console.error("Error fetching cart products:", error);
        res.status(500).json({ message: "Failed to fetch cart products" });
      }
    });

    // Delete cart items__
    app.delete("/delete-product-cart/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { productId: id };
        const result = await cartsCollection.deleteOne(query);

        res.status(200).send(result);
      } catch (error) {
        console.error("Error deleting product from cart:", error);
        res.status(500).send({ message: "Failed to delete product", error });
      }
    });

    // DB Workshop END__

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// Test route__
app.get("/", (req, res) => {
  res.send("TopFive server is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
