 
const Url = {
	 scan:"/json/dinguser_getData",
	 submit:"/json/dinguser_insertJson",
	 getLastestData:""
}
const config = { 
	Url 
}
export default JSON.parse(JSON.stringify(config).replace(/\s/g, ''));