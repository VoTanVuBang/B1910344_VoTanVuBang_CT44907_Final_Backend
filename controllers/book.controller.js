const { MongoAPIError } = require("mongodb");
const BookService = require("../services/book.service");
const MongDB = require("../utils/mongodb.util");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req,res,next) =>{
    try{
        const bookService = new BookService(MongoDB.client);    
        const document = await bookService.create(req.body);
        
        return res.send(document);
    }catch(error){
        return next(
            new MongoAPIError(500,"An error occurred while creating the contact")
        );
    }
};

exports.update = async(req,res,next) =>{
    try {
      
        const bookService = new BookService(MongDB.client);
      
        const document = await bookService.update(req.params.id, req.body);
        if(!document) {
            return next(new MongoAPIError(404,"Book not found"));
        }
        return res.send({
            message:"Book was updated successfully"
        });
    }catch(error){
        return next (
            new MongoAPIError(500,`Error updating book with id=${req.params.id}`)
        );
    }
};

exports.findAll = async (req,res, next) =>{
    let documents = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await bookService.findByName(name);
        }else {
            documents = await bookService.find({});
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
        const bookService = new BookService(MongDB.client);
        const document = await bookService.findById(req.params.id);
        if(!document) {
            return next(new MongoAPIError(404,"Book not found"));
        }
        return res.send(document);
    }catch(error){
        return next(new MongoAPIError(500,`Error retrieving book with id=${req.params.id}`)
        );
    }
};

exports.delete =async (req,res,next) =>{
    try{
        const bookService = new BookService(MongDB.client);
        const document = await bookService.delete(req.params.id);
        if(!document){
            return next(new MongoAPIError(404, "Book not found"));
        }
        return res.send({
            message : "Book was deleted successfully"
        });
    }catch(error){
        return next(
            new MongoAPIError(500, `Could not delete book with id=${req.params.id}`)
        );
    }
};

exports.deleteAll =async (req,res,next) =>{
    try{
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({
            message: `${deletedCount} books were deleted successfully`,
        });
    }catch(error){
        return next (
            new MongoAPIError(500,`Error delete books`)
        );    }
};