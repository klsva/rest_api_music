import { Op } from 'sequelize';
import {Song} from './../db/models/models.js';
import { ERR } from '../error-types.js';

export default {
  //creates new song
  create: async (req, res, next) => {
    try {
      const {title, authorId} = req.body;
      //TODO check 'if exist'  
      const song = await Song.create({title, authorId});
      return res.status(201).json(song);
    } catch (err) {
      next(ERR.CANNOT_CREATE_SONG);
    }    
  },

  //gets list of songs
  getAll: async (req, res, next) => {
    try {
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
    } catch (err) {
      next(ERR.BAD_REQUEST);
    }
  },

  //gets the song
  getOne: async (req, res, next) => {
    try {
      const {id} = req.params;
      const song = await Song.findOne({where:{id}});
      return res.status(200).json(song);
    } catch (err) {
      next(ERR.BAD_REQUEST);
    }
  },

    //updates the song
    update: async (req, res, next) => {
      try {
        const {id} = req.params;
        const {title} = req.body;
        const song = await Song.findOne({where:{id}});
        await song.update({title});
        return res.status(200).send('Song updated');
      } catch (err) {
        next(ERR.CANNOT_UPDATE_SONG);
      }
    },
  
    //delete the song
    delete: async (req, res, next) => {
      try {
        const {id} = req.params;
        await Song.destroy({where: {id}});
        return res.status(200).send('Song deleted');
      } catch (err) {
        next(ERR.CANNOT_DELETE_SONG)
      }
    }
}