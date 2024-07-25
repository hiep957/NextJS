import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const {id } = req.query;

    try {
        const user = await User.findById(id);
        if(user) {
            res.status(200).json({ user });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(505).json({ message: 'Something went wrong' });
    }
}