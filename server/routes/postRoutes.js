const {Router} = require('express')

const {createPost, getPost, getPosts, getCatPosts, deletePost} = require('../controllers/postControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/', authMiddleware, createPost)
router.get('/:id', getPost)
router.get('/', getPosts)
router.get('/categories/:category', getCatPosts)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router