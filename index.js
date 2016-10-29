'use strict';

const cheerio = require('cheerio');
const request = require('request-promise');

var options = {
	url : 'http://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx',
	method: 'GET',
	headers: {'Connection':'Close'}
};

function parseBody(body){
	if (body.indexOf('No hemos encontrado resultados') !== -1){
		return -1;
	}
	var $ = cheerio.load(body);
	var infoTable = $('.wigdet-content li').eq(0).html();
	var entregaTable = $('.wigdet-content').eq(1).html();
	var hitosTable = $('.addresses').html();

	//Parsing infoTable
	var infoResp = {};
	try{
		cheerio.load(infoTable)('li').each((i,elem)=> {
			var key = elem.children[0].children[0].data.replace(':','').toLowerCase().replace(/ /g, '_');
			infoResp[key] = elem.children[1].data.trim();
		});
	}catch(e){}
		

	//Parsing entregaTable
	var entregaResp = {};
	try{
		cheerio.load(entregaTable)('li').each((i,elem)=> {
			if (elem.children[0].children[0].data){
				var key = elem.children[0].children[0].data.replace(':','').toLowerCase().replace(/ /g, '_');
				entregaResp[key] = elem.children[1].data.trim();
			}
		});
		if (entregaResp['hora_entrega']){
			entregaResp['fecha_entrega'] += ' ' + entregaResp['hora_entrega'];
			delete entregaResp['hora_entrega'];
		}

	}catch(e){}

	//Parsing hitosTable
	var hitosResp = [];
	try{
		cheerio.load(hitosTable)('tr').each((i,elem)=> {
			if (i !== 0){
				var fecha = elem.children[0].children[0].data;
				var hora = elem.children[1].children[0].data;
				var actividad = elem.children[2].children[0].data;
				hitosResp.push({
					'fecha': fecha + ' ' + hora,
					'actividad': actividad
				});
			}
		});
	}catch(e){}
	
	return {
		info: infoResp,
		entrega: entregaResp,
		hitos: hitosResp
	};
}

function getTrackingInfo(idPedido){
	options.qs = {
		'DATA' : idPedido
	};
	return request(options).then(body => {
		return parseBody(body);
	});
}

module.exports = function (trackingIdArray){
	return Promise.all(trackingIdArray.map(t=>{
		return getTrackingInfo(t);
	}));
};

