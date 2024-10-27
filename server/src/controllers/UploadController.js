export const uploadFile = (req, res) => {
  const file = req.file;
  res.status(200).json({ filename: file.filename });
};
