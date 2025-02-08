import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
    res.send('sign is successfull...')
}

export const login = async (req: Request, res: Response) => {
    res.send('Login is successfull...')
}

export const logout = async (req: Request, res: Response) => {
    res.send('logout is successfull...')
}