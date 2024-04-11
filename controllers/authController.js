import userModel from "../models/userModel.js"

export const registerController = async (req, res, next)=>{
    const {name, email, password} = req.body

    // validate
    if(!name){
        next('Name is required')
    }
    if(!email){
        next('Email is required')
    }
    if(!password){
        next('Password is required and greater than 6 character')
    }
    const exisitingUser = await userModel.findOne({email})
    if(exisitingUser){
        next('Email already register Please login')

    }
    const user = await userModel.create({name, email, password})
    // token 
    const token = user.createJWT()
    
    res.status(201).send({
        success: true,
        message: 'User created successfilly',
        user:{
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token,
    },)
}

export const loginController = async (req, res, next)=>{
    const {email, password} = req.body
    //validation
    if(!email || !password){
        return next('Please provide All fields')
    }
    // find user by email
    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        return next('Invalid Username or password')
    }
    // compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return next('Invalid Username or password')
    }
    user.password = undefined
    const token = user.createJWT()
    
    res.status(200).json({
        success: true,
        message: 'Login successfully!',
        user,
        token
    })
 
}   


   