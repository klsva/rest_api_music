import {Song} from './../db/models/models.js';
import { ERR } from '../../error-types.js';

export default {
  //creates new song
  create: async (req, res, next) => {
    try {
      const {title, authorId} = req.body;      
      const song = await Song.create({title, authorId});
      return res.status(201).json(song);
    } catch (err) {
      next(ERR.CANNOT_CREATE_SONG);
    }    
  },

  //gets list of songs
  getAll: async (req, res) => {
    try {
      let {authorId, page, limit} = req.query;
      page = page || 1;
      limit = limit || 15;
      let offset = page * limit - limit;
      let songs;
      if (!authorId) {
        songs = await Song.findAndCountAll({limit, offset});
      }
      if (authorId) {
        console.log(authorId);
        const authorIdArr = authorId.split(',');
        console.log(authorIdArr);
        songs = await Song.findAndCountAll({where:{authorId: authorIdArr}, limit, offset})
      }    
      return res.status(200).json(songs);
    } catch (err) {
      next(ERR.BAD_REQUEST);
    }
  },

  //gets the song
  getOne: async (req, res) => {
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
        const {name} = req.body;
        const author = await Author.findOne({where:{id}});
        await author.update({name});
        return res.status(200).send('Author updated');
      } catch (err) {
        next(ERR.CANNOT_UPDATE_SONG);
      }
    },
  
    //delete the song
    delete: async (req, res, next) => {
      try {
        const {id} = req.params;
        await Author.destroy({where: {id}});
        return res.status(200).send('Author deleted');
      } catch (err) {
        next(ERR.CANNOT_DELETE_SONG)
      }
    }
}


