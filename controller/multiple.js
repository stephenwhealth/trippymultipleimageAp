const CountryModel = require("../model/multiple")
const cloudinary = require('../util/cloudinary')

// to create a church data

const created = async(req, res)=>{

    try {
        const {Country, Cities, Description, Reviews} = req.body;
        const Imagesurl = []
        const Publicids = []

        if(req.files && req.files.Images){
            for (const image of req.files.Images){
            const file = await cloudinary.uploader.upload(image.path)
            Imagesurl.push(file.secure_url)
            Publicids.push(file.public_id)
            }
        }

    const newcountry = new CountryModel({
        Country,
        Cities,
        Description,
        Reviews,
        Images: Imagesurl,
        Public_id: Publicids
    })
    
    const savedcountry = await newcountry.save();

    if(!savedcountry) {
        return res.stauts(400).json({
            message: "profile not saved"
        })
    }else{
    res.status(201).json({
        message: "the data was created successfully",
        data: savedcountry
    })
}
    } catch (e) {
    res.status(500).json({
        message: e.message
    })
}};

 
// to read all data

const readall = async(req,res)=>{
    try{

    const readchurch = await CountryModel.find()
    res["status"](200)["json"]({
        message: "this is the information of all data in the database",
        data: readchurch
    })
}catch(error){
    res["status"](400)["json"]("no file found on the database")
}}


// to get one by id

const readone = async(req,res)=>{
    try{
    const id= req.params.id
    const onechurch = await CountryModel.findById(id)
    res["status"](200)["json"]({
        message: `this is the information for club id ${id}`,
        data: onechurch
    })
}catch(error){
    res["status"](400)["json"]("unable to create file")
}}


// find by country name

const naming = async(req,res)=>{
    try {
        const {Country, Cities} = req.body

        const findone = await CountryModel.find({$or: [{Country}, {Cities}]})
        if(!findone){
            res.status(400).json({
                message: 'no details found for the searched location'
            })
        }else{
            res.status(200).json({
                message: `this is the details for the searched location`,
                data: findone
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// updating one file

const updateone = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await CountryModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          message: `country with id: ${productId} not found`,
        });
      }
  
      const { Country, Cities, Description, Reviews } = req.body;
      const updatedImageUrls = [];
      const updatedPublicIds = [];

      const data = {
        Country: Country || product.name,
        Cities: Cities || product.Cities,
        Description: Description || product.Description,
        Reviews : Reviews || product.Reviews
      };
  
      // Handle image update
      if (req.files && req.files.Images) {
        // Delete existing images in Cloudinary
        for (const publicId of product.Public_id) {
          await cloudinary.uploader.destroy(publicId);
        //   console.log(publicId)
        }
  
        // Upload new images and store their URLs and public IDs
        for (const image of req.files.Images) {
            const file = await cloudinary.uploader.upload(image.path);
          updatedImageUrls.push(file.secure_url);
          updatedPublicIds.push(file.public_id)

        }
        // Replace the image URLs and public IDs with the updated ones
        data.Images = updatedImageUrls;
        data.Public_id = updatedPublicIds;
      }
  
      const updatedcountry = await CountryModel.findByIdAndUpdate(productId, data, { new: true });
  
      if (updatedcountry) {
        res.status(200).json({
          message: `${product.Country} details successfully updated`,
          data: updatedcountry,
        });
      } else {
        res.status(400).json({
          message: 'Can not update county',
        });
      }
    } catch (error) {
      res.status(500).json({
        Error: error.message,
      });
    }
  };


// deleting one school

const deleteone = async(req,res)=>{
    try{
        const profile = await CountryModel.findById(req.params.id)
        if (profile) {
            for (const publicId of profile.Public_id) {
                await cloudinary.uploader.destroy(publicId);
              }
            const deleted = await CountryModel.findByIdAndDelete(req.params.id)

                res.status(200).json({
                    message: 'data deleted successfully',
                    data: deleted.Country
                })
        } else {
            res.status(400).json({
                message: 'unable to delete'
            })
        }
}catch(error){
    res["status"](400)["json"](error.message)
}}



module.exports= {created, readall, readone, naming, updateone, deleteone}