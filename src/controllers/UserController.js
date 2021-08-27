const User = require('../models/User')

module.exports = {
  async index(req, res){
    const users = await User.findAll();
    return res.json(users);
  },

  async store(req, res){
    const { name, email } = req.body

    const user = await User.create({ name, email });
    return res.json(user);
  },

  async delete(req, res){
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);

    if(!user){
      return res.status(400).json({ error: 'User not found' })
    }

    await user.destroy(user_id);
    return res.json();
  },

  async update(req, res){
    const { user_id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(user_id);

    if(!user){
      return res.status(400).json({ error: 'User not found' })
    }

    await user.update({ name, email }, {
      where: { 'user_id': user_id}
    });

    return res.json(user);
  }
}