import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    let decocedData;

    if (token && isCustomAuth) {
      decocedData = jwt.verify(token, "TestSignIn");

      req.userId = decocedData.id;
    } else {
      decocedData = jwt.decode(token);

      req.userId = decocedData.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
