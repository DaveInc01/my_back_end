import {Request} from 'express'

export type reqWithParam<T> = Request<T>
export type reqWithQuery<T> = Request<{},{},{},T>
export type reqWithBody<T> = Request<{},{},T>