import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import {Author} from './../db/models/models.js';
import { authorsException } from '../exceptions/authors.js';

export default {
  //creates new author
  create: asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (authorsException.includes(name.toUpperCase())) {
      return res.status(200).send('You cannot add this Author');
    }
    //TODO check 'if exist'
    const author = await Author.create({name});
    return res.status(201).json(author);
  }),

  //gets list of authors
  getAll: asyncHandler(async (req, res, next) => {
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
  }),

  //gets the author
  getOne: asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const author = await Author.findOne({where:{id}})
    return res.status(200).json(author);

  }),

  //updates the author
  update: asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;
    const author = await Author.findOne({where:{id}});
    await author.update({name});
    return res.status(200).send('Author updated');
  }),

  //delete the author
  delete: asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    await Author.destroy({where: {id}});
    return res.status(200).send('Author deleted');
  })
}