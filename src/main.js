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

		if (!result?.data) throw new Error();

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
			},
		});
	}
}

module.exports = {
	supportLanguages,
	translate,
};
