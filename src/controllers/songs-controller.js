import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import {Song} from './../db/models/models.js';

export default {
  //creates new song
  create: asyncHandler(async (req, res, next) => {
    const {title, authorId} = req.body;
    //TODO check 'if exist'  
    const song = await Song.create({title, authorId});
    return res.status(201).json(song);
  }),

  //gets list of songs
  getAll: asyncHandler(async (req, res, next) => {
    let {authorId, title, createdAt, page, limit} = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit;
    let songs;
    if (!authorId && !title && !createdAt) {
      songs = await Song.findAndCountAll({limit, offset});
    }
    if (authorId && !title && !createdAt) {
      // query via ','
      const authorIdArr = authorId.split(',');
      songs = await Song.findAndCountAll({where:{authorId: authorIdArr}, limit, offset})
    }    
    if (!authorId && title && !createdAt) {
      songs = await Song.findAndCountAll({where:{title:{[Op.like]: `%${title}%`}}, limit, offset})
    }
    if (!authorId && !title && createdAt) {
      songs = await Song.findAndCountAll({where:{createdAt}, limit, offset})
    } 
    return res.status(200).json(songs);
  }),

  //gets the song
  getOne: asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const song = await Song.findOne({where:{id}});
    return res.status(200).json(song);
  }),

    //updates the song
    update: asyncHandler(async (req, res, next) => {
      const {id} = req.params;
      const {title} = req.body;
      const song = await Song.findOne({where:{id}});
      await song.update({title});
      return res.status(200).send('Song updated');
    }),
  
    //delete the song
    delete: asyncHandler(async (req, res, next) => {
      const {id} = req.params;
      await Song.destroy({where: {id}});
      return res.status(200).send('Song deleted');
    })
}