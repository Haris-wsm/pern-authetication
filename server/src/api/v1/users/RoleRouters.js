const router = require('express').Router();
const Role = require('./Role');
const User = require('./User');

router.get('/roles', async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    res.send({ roles });
  } catch (error) {
    next(error);
  }
});

router.put('/roles', async (req, res, next) => {
  let userInDB;

  try {
    for (let user of req.body) {
      userInDB = await User.findByPk(user.id);
      await userInDB.setRoles([...user.roles]);
    }

    res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
