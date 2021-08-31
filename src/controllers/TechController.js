const User = require('../models/User')
const Tech = require("../models/Tech");

module.exports = {
  async index(req, res){
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      // include: { association: 'techs'}
      include: { 
        association: 'techs',
        attributes: ['id', 'name'], 
        through: { 
          attributes: ['user_id']    
        }
      }
    })

    if(!user){
      return res.status(400).json({ error: 'User not found' })
    }

    return res.json(user.techs)
  },

  async store(req, res){
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if(!user){
      return res.status(400).json({ error: 'User not found' })
    }

    const [ tech ] = await Tech.findOrCreate({
      where: { name }
    });

    await user.addTech(tech);

    return res.json(tech)
  },

  async delete(req, res){
    const { user_id, id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'techs'}
    });
    
    const tech = await Tech.findByPk(id, {
      include: { association: 'users'}
    });

    if(!user || !tech){
      return res.status(400).json({ error: 'User not found' })
    }

    await tech.destroy(tech);

    return res.json();
  },

  async updade(req, res){
    const { user_id, id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id, {
      include: { association: 'techs'}
    });
    
    const tech = await Tech.findByPk(id, {
      include: { association: 'users'}
    });

    if(!user || !tech){
      return res.status(400).json({ error: 'User not found' })
    }

    await tech.update({ name }, {
      where: { 'id': id}
    })

    return res.json(tech)
  }
};