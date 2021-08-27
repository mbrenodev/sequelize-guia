const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@vltechautomacao.com.br' 
        }
      },
      include: [
        { 
          association: 'addresses',
          attributes: ['street', 'zipcode', 'number'], 
          where: { street: 'Av Rio Tocantins' }},
        { 
          association: 'techs',
          attributes: ['name'],
          required: false,
          through: {
            attributes: []
          },
          where: {
            name: {
              [Op.like]: 'Delphi%' 
            }
          }
        }
      ]
    })

    return res.json(users);
  }
}