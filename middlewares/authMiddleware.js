import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(500).send({message:"Auth failed"});
    }
    const token = authHeader.split(" ")[1];

    try{
       const payload = await JWT.verify(token, process.env.JWT_SECRET_KEY);
       req.user = { userId: payload.userId };
       next();  // why this is neccessary?is it to execute further code of controller!
    } catch(error) {
        res.status(500).send({message: error});
    }
};

export default userAuth;