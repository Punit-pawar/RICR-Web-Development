export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    console.log("I am adding the Menu");

    console.log("Body", req.body);
    console.log("Files", req.files);
  } catch (error) {
    next(error);
  }
};