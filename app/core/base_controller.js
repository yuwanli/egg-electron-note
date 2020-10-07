const { Controller } = require('egg');
class BaseController extends Controller {
  success(data = {}, message) {
    this.ctx.body = {
      code: 0,
      data,
      message,
    };
  }

  error(code, message) {
    this.ctx.body = {
      code,
      message,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
