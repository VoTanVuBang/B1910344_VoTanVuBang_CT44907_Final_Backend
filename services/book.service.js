const {ObjectId} = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("books");
    }
    //Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractConactData(payload){
        const book = {
            name: payload.name,
            price: payload.price,
            detail: payload.detail,
            id_author:payload.id_author,
        };
        return book;
    }
    async create(payload){
        const book = this.extractConactData(payload);
        const result = await this.Book.findOneAndUpdate(
            book,
            {  $set: {} },
            {returnDocument: "after", upsert:true}
        );
        return result.value;
    }

    async find(filter){
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }
    async findByName (name){
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id){
        return await this.Book.findOne({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id,payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        
        const update = this.extractConactData(payload);
    
        const result = await this.Book.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        console.log(result.value)
        return result.value;
    }

    async delete(id){
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll(){
        const result  =await this.Book.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;