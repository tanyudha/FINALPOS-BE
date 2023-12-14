//DOCUMENTS tuh array of object

export const mapDocumentsToObject = (arr, id = "id") => {
	let res: any = {};
	arr.map((row) => {
		res[row[id]] = row;
	});
	return res;
};

export const getIdListFromDocuments = (obj, id = "id") => {
	let res = [];
	obj.map((row) => {
		if (row.id) res.push(row[id]);
	});
	return res;
};
