const Controller = require('../core/base_controller');

class NoteController extends Controller {
  async create() {
    const ctx = this.ctx;
    const res = await ctx.service.note.create();
    if (res) {
      this.success(res);
    } else {
      this.error(200, '创建失败');
    }
  }
  async delete() {
    const ctx = this.ctx;
    const res = await ctx.service.note.delete(ctx.request.body.id);
    if (res) {
      this.success();
    } else {
      this.error(200, '删除失败');
    }
  }
  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.note.list();
    this.success(list);
  }
  async item() {
    const ctx = this.ctx;
    const res = await ctx.service.note.item(ctx.query.id);
    if (res) {
      this.success(res);
    } else {
      this.error(200, '找不到数据');
    }
  }
  async update() {
    const res = await this.ctx.service.note.update();
    if (res) {
      this.success({}, '保存成功');
    }
  }
  async upload() {
    const res = await this.ctx.service.note.upload();
    this.ctx.body = {
      location: res,
    };
  }
}

module.exports = NoteController;
