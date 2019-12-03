/*
  * @file-description : this file connects to the mongoDb altas database on the cloud
  * @author{Yassine JOUT} yassinejout@gmail.com
*/

// Import the required modules
import { MongooseModule } from '@nestjs/mongoose'
//export the database module that connects to mongoDb altas on the cloud
export const dbModule = MongooseModule.forRoot('mongodb+srv://<>@workers-e6e97.gcp.mongodb.net/workers-db?retryWrites=true&w=majority');