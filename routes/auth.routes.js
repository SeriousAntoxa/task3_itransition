const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('userName', 'Минимальная длинна имени 1 символ').exists(),
    check('password', 'Минимальная длинна пароля 1 символ').exists(),
    check('email', 'Некорректный email').exists()
  ],
  async (req, res) => {

  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }

    const {userName, email, password} = req.body
    
    const candidate = await User.findOne({userName: userName})
    
    if (candidate) {
      return res.status(400).json({ message: 'Ошибка! Пользователь с таким именем уже существует'})
    }
    console.log('candidate', candidate)
    
    const hashedPassword = await bcrypt.hash(password, 12)

    const DATE = new Date()
    const dateNow = `${DATE.getDate()}-${DATE.getMonth() + 1}-${DATE.getFullYear()} ${DATE.getHours()}:${DATE.getMinutes()}`
    const dateNew = 'don`t login'

    const user = new User({ userName, email, password: hashedPassword, date: dateNow, lastDate: dateNew, state:false, block:false}) 

    await user.save()

    res.status(201).json({ message: 'Пользователь создан'})

  } catch (e) {
    res.status(500).json({ message: 'Ошибка при регистрации! Попробуйте снова'})
  }
})

// /api/auth/login
router.post('/login',
[
  check('userName', 'Введите имя').exists(),
  check('password', 'Введите пароль').exists(),
],
async (req, res) => {
try {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'Некорректные данные при входе'
    })
  }

  const {userName, password} = req.body
  const user = await User.findOne({ userName })

  if (!user) {
    return res.status(400).json({ message: 'Пользователь с таким именем не найден'})
  }

  const isBlocked = await User.block

  if (isBlocked) {
    return res.status(400).json({ message: 'Пользователь заблокирован'})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  
  if (!isMatch) {
    return res.status(400).json({ message: 'Неверный пароль'})
  }

  const token = jwt.sign(
    { userId: user._id },
    config.get('jwtSecret'),
    { expiresIn: '1h' }
  )


  res.json({ token, userId: user._id, block: user.block})

  } catch (e) {
    res.status(500).json({ message: 'Ошибка при авторизации! Попробуйте снова'})
  }
})

module.exports = router

