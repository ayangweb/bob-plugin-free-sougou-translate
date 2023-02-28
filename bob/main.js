var config = require("./config");

function supportLanguages() {
	return config.languages.map(([language]) => language);
}

async function translate(query, completion) {
	try {
		const { text: keyword, detectFrom, detectTo } = query;

		// 获取请求参数中的语种
		const getLanguage = (detect) =>
			config.languages.find((language) => language[0] === detect)[1];

		const transfrom = getLanguage(detectFrom);

		const transto = getLanguage(detectTo);

		const result = await $http.get({
			url: "https://fanyi.sogou.com/text",
			body: {
				keyword,
				transfrom,
				transto,
				model: "general",
			},
		});

		if (!result?.data) {
			throw new Error();
		}

		$log.info(result.data.match(/"dit":"([^"]*)"/)[1]);

		const toParagraphs = result.data
			.match(/"dit":"([^"]*)"/)[1]
			.split("\\n");

		completion({
			result: {
				from: transfrom,
				to: transto,
				toParagraphs,
			},
		});
	} catch (error) {
		completion({
			error: {
				type: "unknown",
				message: "未知错误",
				addtion: "如果多次请求失败，请联系插件作者！",
			},
		});
	}
}

module.exports = {
	supportLanguages,
	translate,
};
