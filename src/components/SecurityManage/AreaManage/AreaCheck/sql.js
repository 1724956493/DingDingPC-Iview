 //select * from t where a='[h]' and b="[hh]"  params.h=5
function sqlFormat(sql, params) {
	for(var key in params) {
		var reg = new RegExp("(\\[)" + key + "(\\])", "g");
		sql = sql.replace(reg, params[key])
	}
	return sql
}
export default {
	scanData(pk) {
		let where = "where dr=0  and  pk_area='[pk]' order by ts desc";
		let params = {
			where: {
				pk
			}
		}
		where = sqlFormat(where, params.where)
		return {
			select: "*",
			from: "{ad_area}",
			where
		}
	},
	contentData(pk) {
		let where = "where dr=0  and  pk_area='[pk]' order by ts desc";
		let params = {
			where: {
				pk
			}
		}
		where = sqlFormat(where, params.where)
		return {
			select: "*",
			from: "{ad_area_checkcontents}",
			where
		}
	},
	submitData(impdata){
		return {
			tableName: "ad_area_report",
			insertJson: JSON.stringify(impdata)
		}
	}
}