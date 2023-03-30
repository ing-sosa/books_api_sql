class books {
	constructor(dg) {
		this.dg = dg;
	}

	insertRecord(jsonData, callBack) {
		var sql =
			'insert into books (title, description, author_id,year_published,isbn,created_at,updated_at) values (?,?,?,?,?, now(),null)';
		var params = [];
		params.push(jsonData['title']);
		params.push(jsonData['description']);
		params.push(jsonData['author_id']);
		params.push(jsonData['year_published']);
		params.push(jsonData['isbn']);
		this.dg.execute(sql, params, callBack);
	}

	getRecords(resourceId, callBack) {
		var sql =
			'select books.*, authors.name as author_name from books INNER JOIN authors ON books.author_id = authors.id';
		var params = [];
		if (resourceId != '') {
			sql = sql + ' where books.id = ?';
			params.push(resourceId);
		}
		this.dg.query(sql, params, callBack);
	}

	updateRecord(resourceId, jsonData, callBack) {
		var sql =
			'update books set title = ?, description = ?, author_id = ?,year_published = ?, isbn = ?,updated_at = now() where id = ?';
		var params = [];
		params.push(jsonData['title']);
		params.push(jsonData['description']);
		params.push(jsonData['author_id']);
		params.push(jsonData['year_published']);
		params.push(jsonData['isbn']);
		params.push(resourceId);
		this.dg.execute(sql, params, callBack);
	}

	deleteRecord(resourceId, callBack) {
		var sql = 'delete from books where id = ?';
		var params = [];
		params.push(resourceId);
		this.dg.execute(sql, params, callBack);
	}
}

module.exports = books;
