export default function handler(req, res) {
  console.log(req.body);
  setTimeout(() => {
    const {email} = req.body


    res.status(200).json({ error: false, message: `successful subscription to ${email}` });
  }, 2000);
}
