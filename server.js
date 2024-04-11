    // API Documenation
    import swaggerUi from 'swagger-ui-express'
    import swaggerDoc from 'swagger-jsdoc'
    // packages import
    import express from 'express'
    import 'express-async-errors'
    import dotenv from 'dotenv'
    import colors from 'colors'
    import cors from 'cors'
    import morgan from 'morgan'
    import bodyParser from 'body-parser'
    import cookieParser from 'cookie-parser'
    //seurity packges
    import helmet from 'helmet'
    import xss from 'xss-clean'
    import mongoSanitize from 'express-mongo-sanitize'
    // files import
    import connectDB  from './config/db.js'
    // routes import
    import authRouters from './routers/authRouters.js'
    import errorMiddleware from './middlewares/errorMiddlewares.js'
    import userRouters from './routers/userRouters.js'
    import jobRouters from './routers/jobRouters.js'
    import userAuth from './middlewares/authMiddleware.js'

    // Dot ENV config
    dotenv.config()

    // mongodb connection
    connectDB()
    

    // Swagger api config
    // swagger api ontions
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: 'job Portal Application',
                description: 'Node Express Job Portal Application'
            },
            servers: [
                {
                    url: "http://localhost:8080"
                }
            ],
            security: [{ userAuthth: [] }], // Associate security with all operations
            securityDefinitions: {
                userAuthth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "Enter your bearer token in the format 'Bearer <token>'"
                },
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
        },
        apis: ['./routers/*.js'],
    };
    
    const spec = swaggerDoc(options);
    

    // rest object
    const app = express()

    // middelwares
    app.use(helmet(``))
    app.use(xss())
    app.use(mongoSanitize())
    app.use(express.json())
    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.static('public'));
    app.use(cookieParser())


    // Sử dụng body-parser middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    app.set('view engine', 'ejs')
    // app.set('views', './public/pages'); 


    // routers
    app.use('/api/v1/auth', authRouters)
    app.use('/api/v1/user', userRouters)
    app.use('/api/v1/job', jobRouters)


    // homerouter root
    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))


    // validation middlewares
    app.use(errorMiddleware)

    //port
    const PORT = process.env.PORT || 8080
    // listen
    app.listen(PORT, ()=>{
        console.log(`Node Server is running in ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white)
    })

