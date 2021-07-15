export default function handler(req, res) {
  setTimeout(() => {
    const {email} = req.body
    res.status(200).json({ error: false, message: `successful subscription to ${email}` });
  }, 2000);
}
