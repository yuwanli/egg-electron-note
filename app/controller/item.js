const Controller = require('../core/base_controller');

class ItemController extends Controller {
  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.item.list();
    this.success(list);
  }
  async update() {
    const res = await this.ctx.service.item.update();
    if (res) {
      this.success({}, '保存成功');
    }
  }
  async upload() {
    const res = await this.ctx.service.item.upload();
    this.ctx.body = {
      location: res,
    };
  }
}

module.exports = ItemController;
