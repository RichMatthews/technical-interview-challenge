import express, { Request, Response } from 'express'
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const generateDogs = () => {
    return new Promise((res, rej) => {
        fs.readdir('public/images', (err: NodeJS.ErrnoException, files: string[]) => {
            if (err) {
                rej(err)
            }
            return res(files.map((file) => ({ id: path.parse(file).name, image: path.parse(file).base })))
        })
    })
}

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: (req: Request, file: Express.Multer.File, cb: (a: null, b: string) => void) => {
        cb(null, req.body.dogBreed.toLowerCase().replace(' ', '_') + `.${file.originalname.split('.')[1]}`)
    },
})

const upload = multer({ storage })
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            dogs: {
                type: GraphQLString,
                resolve: async () => await generateDogs().then((dogList) => JSON.stringify(dogList)),
            },
        }),
    }),
})

const root = {
    images: async () => {
        return await generateDogs().then((dogList) => JSON.stringify(dogList))
    },
}

const app = express()
app.use(cors())
app.use(express.static('public'))

app.post('/upload', upload.single('dogFile'), async (_, res: Response) => {
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
