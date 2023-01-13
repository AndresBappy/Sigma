import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { Bet } from 'interfaces/bet';

type Data = {
  success: boolean;
  bets?: Bet[];
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/bets.json', 'utf8');

  res.status(200).json({ success: true, bets: JSON.parse(fileContents) });
}
