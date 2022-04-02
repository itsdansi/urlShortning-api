const router = require("express").Router();
const UrlController = require("./../Controllers/urlController");
const auth = require("./../Middleware/auth");

router.post("/", UrlController.create);
router.get("/", auth, UrlController.getAll);
router.get("/:shortUrl", UrlController.getOne);

module.exports = router;
