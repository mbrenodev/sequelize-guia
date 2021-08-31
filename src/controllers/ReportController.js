const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@hotmail.com' 
        }
      },
      include: [
        { 
          association: 'addresses',
          attributes: ['street', 'zipcode', 'number'], 
          where: { street: 'Rua Rio Negro' }},
        { 
          association: 'techs',
          attributes: ['name'],
          required: false,
          through: {
            attributes: []
          },
          where: {
            name: {
              [Op.like]: 'JavaScript%' 
            }
          }
        }
      ]
    })

    return res.json(users);
  }
}