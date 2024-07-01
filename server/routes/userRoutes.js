const {Router} = require('express')

const {registerUser, loginUser, getUser} = require(
    "../controllers/userControllers"
)
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/:id", getUser)

module.exports = router