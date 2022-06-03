import {Author} from './../db/models/models.js';
import { ERR } from '../../error-types.js';

export default {
  //creates new author
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const author = await Author.create({name});
      return res.status(201).json(author);
    } catch (err) {
      next(ERR.CANNOT_CREATE_AUTHOR);
    }
  },

  //gets list of authors
  getAll: async (req, res) => {
    try {
      const authors = await Author.findAll();
      return res.status(200).json(authors);
    } catch (err) {
      next(ERR.BAD_REQUEST);
    }
  },

  //gets the author
  getOne: async (req, res) => {
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


