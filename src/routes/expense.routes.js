const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  create,
  list,
  update,
  remove,
} = require("../controllers/expense.controller");

// is file ke saare routes protected hain
router.use(auth);

router.post("/", create);
router.get("/", list);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
