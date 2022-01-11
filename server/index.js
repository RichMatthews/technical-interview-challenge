const express = require('express')
const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
// const { buildSchema } = require('graphql')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

let generateDogs = () => {
    return new Promise((res, rej) => {
        fs.readdir('public/images', (err, files) => {
            if (err) {
                rej(err)
            }
            return res(files.map((file) => ({ id: path.parse(file).name, image: path.parse(file).base })))
        })
    })
}

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, cb) {
        cb(null, req.body.dogBreed.toLowerCase().replace(' ', '_') + `.${file.originalname.split('.')[1]}`)
    },
})

const upload = multer({ storage })

// const schema = buildSchema(`
//   type Query {
//     images: String
//   }

//   type Dog {
//     id: String
//     image: String
//   }

//   type FindDog {
//     dog: [Dog]
//   }
// `)

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            dogs: {
                type: GraphQLString,
                resolve: async () => await generateDogs().then((a) => JSON.stringify(a)),
            },
        }),
    }),
})

const root = {
    images: async () => {
        return await generateDogs().then((a) => JSON.stringify(a))
    },
    dog: async () => {
        return 'test'
    },
}

const findDog = {
    dog: async () => {
        return await generateDogs().then((a) => JSON.stringify(a))
    },
}

const app = express()
app.use(cors())
app.use(express.static('public'))

app.post('/upload', upload.single('dogFile'), async (req, res) => {
    const dogsList = await generateDogs()
    return res.send({ images: dogsList })
})

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }),
)

app.use(
    '/dogs',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }),
)
app.listen(4000)
