// 引入 koa 框架
const Koa = require("koa2");

// 引入处理 post 数据的插件
const bodyParser = require("koa-bodyparser");

// 引入 koa 路由
const KoaRouter = require("koa-router");

// 引入 axios
const axios = require("axios");

// 创建服务器实例
const app = new Koa();

// 创建路由实例
const router = new KoaRouter();

// 使用bodyParser
app.use(bodyParser());

// 使用路由
app.use(router.routes(), router.allowedMethods());

// 监听端口
app.listen("5678", () => {
	console.log("端口号为 5678 的服务器已经启动！");
});

// 翻译 api
router.post("/translate", async (ctx) => {
	// body 传 keyword(所译文本) 和 transto(目标语言，查看 bob 文件夹可得知)
	const {
		body: { keyword, transto },
	} = ctx.request;

	const { data } = await axios.get("https://fanyi.sogou.com/text", {
		params: {
			keyword,
			transfrom: "auto",
			transto,
			model: "general",
		},
	});

	const text = data.match(/"dit":"([^"]*)"/);

	ctx.body = text;
});
