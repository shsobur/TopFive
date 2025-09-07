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

const { MongoClient, ServerApiVersion } = require("mongodb");
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
    await client.connect();

    // DB Workshop ST__

    const db = client.db("TopFive");
    const usersCollection = db.collection("users");

    // JSONWEBTOKEN J.W.T__
    app.post("/jwt", async (req, res) => {
      try {
        const email = req.body;
        console.log(email);

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

    // DB Workshop END__

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
