const {ObjectId} = require("mongodb");

class AuthorService {
    constructor(client) {
        this.Author = client.db().collection("authors");
    }
    //Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractConactData(payload){
        const author = {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        };
        return author;
    }
    async create(payload){
        const author = this.extractConactData(payload);
        const result = await this.Author.findOneAndUpdate(
            author,
            {  $set: {} },
            {returnDocument: "after", upsert:true}
        );
        return result.value;
    }

    async find(filter){
        const cursor = await this.Author.find(filter);
        return await cursor.toArray();
    }
    async findByName (name){
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id){
        return await this.Author.findOne({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id,payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        
        const update = this.extractConactData(payload);
    
        const result = await this.Author.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        console.log(result.value)
        return result.value;
    }

    async delete(id){
        const result = await this.Author.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll(){
        const result  =await this.Author.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = AuthorService;