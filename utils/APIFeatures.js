module.exports = class APIFeatures {
  /**
   * Handles the various API querying features such as filtering, sorting & fieldLimiting
   * @param {Object} reqQuery The req.query object
   * @param {String} tableName the table to be queried from the database
   */
  constructor(reqQuery, tableName) {
    this.queryString = reqQuery;
    this.table = tableName;
    this.SQLWhereClause = 'WHERE ';
    this.SQLOrderByClause = '';
    this.SQLSelectClause = '';
    this.SQLLimitQueryResultsClause = '';
    this.values = [];
  }

  /**
   * This method basically filters the req.query object of the standard query fields ('sort', 'limit', 'page', 'fields').
   * to create the `WHERE` clause of the SQL statement
   */
  filter() {
    let obj = { ...this.queryString };
    //TODO: Define the unwanted fields and remove them from the req.query Object
    const excludedFields = ['sort', 'limit', 'page', 'fields', 'searchField'];
    excludedFields.forEach((el) => delete obj[el]);

    //TODO: Removing fields that don't have comparison operators as keys
    let tempStr = '';
    let i = 0;
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value !== 'object') {
        tempStr += `${key} = ${'?'}`;

        this.values.push(Number.isNaN(+value) ? value : +value);

        if (i < Object.entries(obj).length - 1) tempStr += ' AND ';

        delete obj[key];

        i++;
      }
    }
    this.SQLWhereClause += tempStr;

    const operationSymbols = {
      gte: '>=',
      gt: '>',
      lte: '<=',
      lt: '<',
    };
    let queryStr = JSON.stringify(obj);
    //NOTE:The code below Replaces the standard comparision operators used in request queries [lt],[gte]
    // with the traditonal ones (>,<=,<,>=)
    queryStr = queryStr.replaceAll(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `${operationSymbols[match]}`
    );

    let whereClause = '';
    let fields = Object.keys(JSON.parse(queryStr)); // results in --> [ 'user_id', 'age' ]
    let OperatorValuePairs = Object.values(JSON.parse(queryStr)); // results in --> [ { '>=': '4' }, { '<=': '90' } ]

    OperatorValuePairs.forEach((el, i) => {
      for (const [operator, val] of Object.entries(el)) {
        whereClause += `${fields[i]} ${operator} ?`;
        this.values.push(+val);
        //NOTE:The line below Places the 'AND'keyword in-between the conditionals
        if (i < OperatorValuePairs.length - 1) whereClause += ' AND ';
      }
    });

    this.SQLWhereClause += whereClause;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.SQLOrderByClause = ' ORDER BY ';

      const [sortByFields, arrangementOrder] = this.queryString.sort.split(':');

      this.SQLOrderByClause += sortByFields; //--> ORDER BY blah,blah

      if (!arrangementOrder || arrangementOrder.toLowerCase() === 'asc') {
        this.SQLOrderByClause += ' ASC'; //--> ORDER BY blah,blah ASC
      }

      if (arrangementOrder?.toLowerCase() === 'desc') {
        this.SQLOrderByClause += ' DESC'; //--> ORDER BY blah,blah DESC
      }
    }
    return this;
  }

  fieldLimit() {
    if (!this.queryString.fields || this.queryString.fields === '') {
      this.SQLSelectClause = 'SELECT * FROM ';
    } else {
      let selectedFields = this.queryString.fields;
      this.SQLSelectClause = `SELECT ${selectedFields} FROM `;
    }
    return this;
  }
  /**
   *
   * @param {String} searchVal The search string
   * @returns
   */
  search(searchVal) {
    this.SQLWhereClause += `${this.queryString.user_id ? ' AND' : ''} ${
      this.queryString.searchField
    } LIKE '%${searchVal}%'`;

    return this;
  }

  limitQueryResults() {
    if (this.queryString.limit || this.queryString.limit !== '') {
      this.SQLLimitQueryResultsClause = ` LIMIT ${+this.queryString.limit}`;
    }
    return this;
  }
  /**
   *
   * @returns The entire SQL query string with the question mark place holders
   */
  getSQLQueryString() {
    return (
      this.SQLSelectClause +
      `${this.table} ` +
      this.SQLWhereClause +
      this.SQLOrderByClause +
      this.SQLLimitQueryResultsClause
    );
  }
};
