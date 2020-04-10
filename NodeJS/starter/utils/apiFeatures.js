class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //BASIC FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // sort=price,ratings -> sort=price ratings
      const sortObj = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortObj);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldObj = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fieldObj);
    } else {
      this.query = this.query.select('-__v'); //exclude __v variable
    }
    return this;
  }

  pagination() {
    /** ?page=1&limit=5 */
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
