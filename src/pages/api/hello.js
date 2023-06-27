// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//"https://clients.ncr.dole.gov.ph/isc/api/authentication.php?getCurrentStatus=UB-NCR-2023-06-0002307"


export default async function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
