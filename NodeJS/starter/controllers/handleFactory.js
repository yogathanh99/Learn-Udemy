const tryCatchAsync = require('../utils/tryCatchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) =>
  tryCatchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('No document found with this ID', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Delete successful',
      data: null,
    });
  });
