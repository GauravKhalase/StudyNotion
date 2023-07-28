const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allcategories = await Category.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      message: "All category returned successfully",
      data: allcategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;
    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();
    //validation
    if (!selectedCategory) {
      console.log("Category not found.")
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    //get coursesfor different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
          path: "courses",
          match: { status: "Published" },
        })
      .exec();

      if (!differentCategories) {
        return res.status(404).json({
          success: false,
          message: "Data Not Found",
        });
      }

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: {
        path: "instructor",
    },
    })
    .exec()
  const allCourses = allCategories.flatMap((category) => category.courses)
  const mostSellingCourses = allCourses
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10)

    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
