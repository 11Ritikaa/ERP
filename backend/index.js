// imports
import 'express-async-errors';
import express from "express"
import cors from "cors"
import { connectDB } from "./db/connectDB.js"
import { SERVER } from "./config/config.js"
import notFound from "./middlewares/route-not-found.js";
import { errorHandlerMiddleware as globalErrorHandler } from "./middlewares/error-handler.js";


// instantiation
let server_instance = undefined;
const app = express();
const corsOptions = {
  origin: 'https://your-frontend-domain.com', // allowed domains and sub domains
  methods: ['GET', 'POST'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // allowed custom headers
  credentials: true, // allow cookies and authentication headers
  maxAge: 600 // caching the prefight request
};


//middlewares
app.use(cors({maxAge:600}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routers 
import productRouter from './routes/prouct_routes.js';
import variantRoutes from './routes/variantRoutes.js';
import categoryRoutes from "./routes/categoryRoutes.js"
// health route
app.get("/main/health-check", (req, res) => {
  return res.status(200).json({ hello: "world" })
})

//routes

app.use("/api/products", productRouter );
app.use("/api/variants", variantRoutes );
app.use("/api/category", categoryRoutes)




// server kill switch
app.use("/server-shutdown",(req, res)=>{
  res.send('server shutting downn')
  shutdown();
});

// route not found and global error handler
app.use(notFound);
app.use(globalErrorHandler);

const port = SERVER.SERVER_PORT;
const hostname = SERVER.SERVER_HOSTNAME;

const start = async () => {
  try {
    await connectDB();
    server_instance = app.listen(port, () => {
      console.log(`Server Started @host ${hostname} :  ${port} ...`)
    });
  } catch (error) {
    console.error(error)
  }
};

const shutdown = () => {
  console.log('\n---SERVER SHUTDOWN----\n');
  if (!server_instance) {
    console.error('Server instance is undefined. Exiting with error code.');
    process.exit(1);
  }
  server_instance.close((err) => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    } else {
      console.log('----SHUTDOWN COMPLETE----');
      process.exit(0);
    }
  });
}

start();

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

