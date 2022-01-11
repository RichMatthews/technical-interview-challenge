var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");
var multer = require("multer");
const fs = require("fs");
const path = require("path");

let generateDogs = () => {
  return new Promise((res, rej) => {
    fs.readdir("public/images", (err, files) => {
      return res(files.map((file) => ({ id: path.parse(file).name })));
    });
  });
};

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage });

var schema = buildSchema(`
  type Query {
    images: String
  }
`);

var root = {
  images: async () => {
    return await generateDogs().then((a) => JSON.stringify(a));
  },
};

var app = express();
app.use(cors());
app.use(express.static("public"));

app.post("/upload", upload.single("file123"), async (req, res) => {
  const dogsList = await generateDogs();
  return res.send({ images: dogsList });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
