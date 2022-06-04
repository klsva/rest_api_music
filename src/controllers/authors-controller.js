import { Op } from 'sequelize';
import {Author} from './../db/models/models.js';
import { ERR } from '../error-types.js';
import { authorsException } from '../exceptions/authors.js';

export default {
  //creates new author
  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (authorsException.includes(name.toUpperCase())) {
        return res.status(200).send('You cannot add this Author');
      }
      //TODO check 'if exist'
      const author = await Author.create({name});
      return res.status(201).json(author);
    } catch (err) {
      next(ERR.CANNOT_CREATE_AUTHOR);
    }
  },

  //gets list of authors
  getAll: async (req, res, next) => {
    try {
      let {name, createdAt, page, limit} = req.query;      
      page = page || 1;
      limit = limit || 15;
      let offset = page * limit - limit;
      let authors;
      if (!name && !createdAt ) {
        authors = await Author.findAndCountAll({limit, offset});
      }
      if (name && !createdAt) {
        authors = await Author.findAndCountAll({where:{name:{[Op.like]: `%${name}%`}}, limit, offset});
      }
      if (!name && createdAt) {
        authors = await Author.findAndCountAll({where:{createdAt}, limit, offset});        
      }
      return res.status(200).json(authors);
    } catch (err) {
      next(ERR.BAD_REQUEST);
    }
  },

  //gets the author
  getOne: async (req, res, next) => {
    try {
      const {id} = req.params;
      const author = await Author.findOne({where:{id}});
      return res.status(200).json(author);
    } catch (err) {
      next(ERR.BAD_REQUEST);
    }    
  },

  //updates the author
  update: async (req, res, next) => {
    try {
      const {id} = req.params;
      const {name} = req.body;
      const author = await Author.findOne({where:{id}});
      await author.update({name});
      return res.status(200).send('Author updated');
    } catch (err) {
      next(ERR.CANNOT_UPDATE_AUTHOR);
    }
  },

  //delete the author
  delete: async (req, res, next) => {
    try {
      const {id} = req.params;
      await Author.destroy({where: {id}});
      return res.status(200).send('Author deleted');
    } catch (err) {
      next(ERR.CANNOT_DELETE_AUTHOR)
    }
  }
}