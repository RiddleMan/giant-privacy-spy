const express = require('express');

module.exports = (mainPath, options) => {
    const mainRouter = express.Router();
    const router = express.Router(options);

    mainRouter.use(mainPath, router);

    router.main = mainRouter;

    return router;
};
