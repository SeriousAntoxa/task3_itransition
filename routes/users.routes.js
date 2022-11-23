const {Router} = require('express')
const User = require('../models/User')
const router = Router()

// /api/users
router.get(
  '/',
  async (req, res) => {
  try {
    const users = await User.find()
    re.json(users)
  } catch (e) {
    res.status(500).json({ message: 'Ошибка!'})
  }
})

module.exports = router

