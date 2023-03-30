class authors {
	constructor(dg) {
		this.dg = dg;
	}

	insertRecord(jsonData, callBack) {
		var sql = 'insert into authors (name, created_at, updated_at) values (?, now(),null)';
		var params = [];
		params.push(jsonData['name']);
		this.dg.execute(sql, params, callBack);
	}

	getRecords(resourceId, callBack) {
		var sql = 'select * from authors';
		var params = [];
		if (resourceId != '') {
			sql = sql + ' where authors.id = ?';
			params.push(resourceId);
		}
		this.dg.query(sql, params, callBack);
	}

	updateRecord(resourceId, jsonData, callBack) {
		var sql = 'update authors set name = ?, updated_at = now() where id = ?';
		var params = [];
		params.push(jsonData['name']);
		params.push(resourceId);
		this.dg.execute(sql, params, callBack);
	}

	deleteRecord(resourceId, callBack) {
		var sql = 'delete from authors where id = ?';
		var params = [];
		params.push(resourceId);
		this.dg.execute(sql, params, callBack);
	}
}

module.exports = authors;
