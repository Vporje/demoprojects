import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) {
      return next(createError(403, "Token is invalid!"));
    }
    request.user = user;
    next();
  });
};

//verifying User
export const verifyUser = (request, response, next) => {
  verifyToken(request, response, next, () => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!!"));
    }
  });
};


//verifying Admin
export const verifyAdmin = (request,response,next) =>(
  
  verifyToken(request, response, next, ()=>{
    if (request.user.isAdmin){
      next()
    }else{
      return next(createError(403, "You are not authorized!!"));
    }
  })
)
