const db = require('../../config/config.js');
const queries = require('../../queries/accessment_query');
const cloudinary = require("cloudinary").v2;


const postAccessmentImage  = async (req, res, next) => {
  try {
     const { filename: image } = req.file;
    const { question_id } = req.params;
    const newfilepath = `${req.file.destination}/resize/${image}`;
    await sharp(req.file.path)
      .resize({ width: 328, height: 328 })
      .png()
      .toFile(path.resolve(req.file.destination, "resize", image));
    const response = await coverpage(req.file.path, question_id, newfilepath);
    res.status(200).json({
      status: "success",
      message: "profile picture upload successfully",
      url: response.secure_url,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const coverpage = async (filepath, question_id, newfilepath) => {
  const response = await cloudinary.uploader.upload(newfilepath, {
    folder: "enyata"
  });
  fs.unlinkSync(newfilepath);
  fs.unlinkSync(filepath);
  await db.none(queries.postImage, [response.secure_url, question_id])
  return response
}

const createAccessment = async (req, res) => {
    let {duration} = req.body;
    let question = JSON.stringify(req.body.question)
    try {
        const accessmentForm= await db.any(queries.accessmentForm, [question,duration])
        console.log(accessmentForm)
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment created',
            data: accessmentForm
        })
    } catch (error) {
        res.status(500).json({
          message: 'An error has ocurred',
          error
      })
    }
}

const getAccessment = async(req, res) => {
  try {
    const accessmentForm = await db.any(queries.getAccessment)
    return res.status(200).json({
      status: 'Success',
      message: 'Accessment returned',
      data: accessmentForm
    })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const updateAccessment = async (req, res) => {
    let { id } = req.params;
    let question = JSON.stringify(req.body.question)
    let {batch,duration,instruction,correct_answer,image} = req.body;
    try {
        const accessmentForm = await db.any(queries.updateAccessment, [question,batch,duration,instruction,correct_answer,image, id])
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Updated',
            data: accessmentForm
        })
    } catch (error) {
        res.status(500).json({
        message: 'An error has ocurred',
        error
    })
    }
}

// const postAccessmentImage = async(req, res) => {
//   let {image} = req.body;
//   const imageData = await cloudinary.uploader.upload(image)
//   console.log(imageData)
//   req.body.image = imageData.secure_url;
  

//   try {
      
//         const accessmentForm = await db.any(queries.postImage, [image])
//         return res.status(200).json({
//             status: 'Success',
//             message: 'Score Added',
//             data: accessmentForm
//         })
//   } catch (error) {
//     console.log(err)
//         return err;
//   }
// }

const getOneAccessment = async (req, res) => {
  let { id } = req.params;
  try {
     const accessmentForm = await db.any(queries.getOneAccessment, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Retrieved',
            data: accessmentForm
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const deleteAccessment = async (req, res) => {
  let { id } = req.params;
  try {
     db.none(queries.deleteAccessment, [id]);
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Removed',
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}




module.exports = {
  createAccessment,
  getAccessment,
  updateAccessment,
  deleteAccessment,
  getOneAccessment ,
  postAccessmentImage
}