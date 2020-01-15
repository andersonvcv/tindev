const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy
module.exports = {
    async update(request, response){
    // Get HTTP response
    const {github_username, avatar_url ,techs, latitude, longitude} = request.body;
      
    // Check if user is already in the DB
    const dev = await Dev.findOne({github_username});
    if (dev){
      console.log(github_username)
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
      await Dev.updateOne({"github_username": github_username}, {
        $set:{
          "techs": techsArray,
          "location": location,
          "avatar_url": avatar_url,
        }
      });
    }
    return response.json({dev});
  },

  async destroy(request, response){
    // Get HTTP response
    const github_username = request.params.id;
  
    // Check if user is already in the DB
    const dev = await Dev.findOne({github_username});
    if (dev){
      await Dev.deleteOne({"github_username": github_username});
    }
    return response.json({dev});
  },

  async index(request, response){
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    // Get HTTP response
    const { github_username, techs, latitude, longitude } = request.body;
    
    // Check if user is already in the DB
    let dev = await Dev.findOne({github_username});
    if (!dev){
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
    
      // Get gitAPI response
      const gitAPIResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = gitAPIResponse.data;
    
      // Create model
      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }
    // if user is not registered, it will return null, else it returns the user
    return response.json(dev);
  }
};