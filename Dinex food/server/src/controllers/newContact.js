import Contact from "../models/contactModel.js";

export const Newcontact = async ( req,res,next)=>{
    try {
        const{ fullName, email, mobileNumber, enquire} = req.body;

        if ( !fullName || !email || !mobileNumber || !enquire ){
            const error = new Error("All Felids required");
            error.statusCode = 400;
            return next(error);
        }

        const newContact = await Contact.create({
            fullName,
            email,
            mobileNumber,
            enquire,
        });

        console.log(newContact);

        res.status(201).json({message:"Yoo got your message. We will get back to you soon"})

    } catch (error) {
        next(error);
    }
}