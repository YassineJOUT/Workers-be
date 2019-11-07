import { MongooseModule } from '@nestjs/mongoose'
// export the database module that connects to mongoDb altas on the cloud
export const dbModule = MongooseModule.forRoot('mongodb+srv://yassine:gcbij10WzEPv0CVE@workers-e6e97.gcp.mongodb.net/workers-db?retryWrites=true&w=majority');