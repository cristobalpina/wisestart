function fillSelectWithAreas(areas, select){
	let option = '<option value="0">-- Comunas --</option>';
	select.append(option);
	for(let area of areas){
		let option = '<option value="'+area.id+'">'+area.name+'</option>';
		select.append(option);
	}
}