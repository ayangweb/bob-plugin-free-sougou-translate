const languages = [
	["auto"],
	["zh-Hans", "zh-CHS"],
	["ar"],
	["pl"],
	["da"],
	["de"],
	["ru"],
	["fr"],
	["fi"],
	["ko"],
	["nl"],
	["cs"],
	["pt"],
	["ja"],
	["sv"],
	["th"],
	["tr"],
	["es"],
	["hu"],
	["en"],
	["it"],
	["vi"],
].map((language) =>
	language.length > 1 ? language : [language[0], language[0]]
);

exports.languages = languages;
