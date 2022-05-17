// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core/src/authentication/withApiAuthRequired'

type Data = {
  name: string
}

export default withApiAuthRequired((
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  res.status(200).json({ name: 'John Doe' })
}, { permissions: [] });
