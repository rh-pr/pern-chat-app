import 'express'

declare module "express-serve-static-core" {
  interface Request {
    file?: Express.Multer.File; // for multer
    user?: {
        id: string,
    }
  }
}