const { MongoAPIError } = require("mongodb");
const AuthorService = require("../services/author.service");
const MongDB = require("../utils/mongodb.util");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req,res,next) =>{
    try{
        const authorService = new AuthorService(MongoDB.client);    
        const document = await authorService.create(req.body);
        
        return res.send(document);
    }catch(error){
        return next(
            new MongoAPIError(500,"An error occurred while creating the contact")
        );
    }
};

exports.update = async(req,res,next) =>{
    try {
      
        const authorService = new AuthorService(MongDB.client);
      
        const document = await authorService.update(req.params.id, req.body);
        if(!document) {
            return next(new MongoAPIError(404,"author not found"));
        }
        return res.send({
            message:"author was updated successfully"
        });
    }catch(error){
        return next (
            new MongoAPIError(500,`Error updating author with id=${req.params.id}`)
        );
    }
};

exports.findAll = async (req,res, next) =>{
    let documents = [];

    try {
        const authorService = new AuthorService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await authorService.findByName(name);
        }else {
            documents = await authorService.find({});
        }
    }catch (error){
        return next(
            new MongoAPIError(500,"an error occured while creating the contact")
        );
    }
    return res.send(documents);
};

exports.findOne =  async(req,res,next) =>{
    try{
        const authorService = new AuthorService(MongDB.client);
        const document = await authorService.findById(req.params.id);
        if(!document) {
            return next(new MongoAPIError(404,"Author not found"));
        }
        return res.send(document);
    }catch(error){
        return next(new MongoAPIError(500,`Error retrieving author with id=${req.params.id}`)
        );
    }
};

exports.delete =async (req,res,next) =>{
    try{
        const authorService = new AuthorService(MongDB.client);
        const document = await authorService.delete(req.params.id);
        if(!document){
            return next(new MongoAPIError(404, "author not found"));
        }
        return res.send({
            message : "author was deleted successfully"
        });
    }catch(error){
        return next(
            new MongoAPIError(500, `Could not delete author with id=${req.params.id}`)
        );
    }
};

exports.deleteAll =async (req,res,next) =>{
    try{
        const authorService = new AuthorService(MongoDB.client);
        const deletedCount = await authorService.deleteAll();
        return res.send({
            message: `${deletedCount} authors were deleted successfully`,
        });
    }catch(error){
        return next (
            new MongoAPIError(500,`Error delete authors`)
        );    }
};