import express from 'express'
import "dotenv-safe/config";
export const notFound = (req: express.Request, res:express.Response, next: express.NextFunction)=>{
    const error = new Error(`not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandle = (err: Error,_: express.Request, res:express.Response)=>{
    const statusCode = res.statusCode === 200? 500: res.statusCode
    res.status(statusCode)
     res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null: err.stack
    })
}