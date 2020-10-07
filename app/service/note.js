const Service = require('egg').Service;
const fs = require('fs');

class NoteService extends Service {
  async create() {
    const res = await this.app.mysql.insert('itemList', {
      title: '无标题',
      content: '',
      createTime: Date.now(),
    });
    if (res.affectedRows === 1) {
      return await this.item(res.insertId);
    } else {
      return false;
    }
  }
  async delete(id) {
    const res = await this.app.mysql.delete('itemList', {
      id,
    });
    return res.affectedRows === 1;
  }
  async list() {
    const res = await this.app.mysql.select('itemList', {
      columns: ['id', 'title', 'content', 'createTime', 'updateTime'],
      orders: [['createTime', 'desc']],
    });
    res.map((item) => {
      const date = new Date(item.createTime);
      item.createTimeShow = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      return item;
    });
    return res;
  }
  async item(id) {
    const res = await this.app.mysql.select('itemList', {
      where: { id: id },
      columns: ['id', 'title', 'content', 'createTime', 'updateTime'],
    });
    if (res.length > 0) {
      const item = res[0];
      const date = new Date(item.createTime);
      item.createTimeShow = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      return item;
    } else {
      return false;
    }
  }
  async update() {
    const data = this.ctx.request.body;
    data.createTimeShow && delete data.createTimeShow;
    const res = await this.app.mysql.update('itemList', data);
    return res.affectedRows === 1;
  }
  async upload() {
    const result = await this.ctx.curl(
      'http://privilege-sso.vmic.xyz/api/upload',
      {
        method: 'POST',
        dataType: 'json',
        files: fs.createReadStream(this.ctx.request.files[0].filepath),
      }
    );
    if (result.data.code === 0) {
      return result.data.url;
    }
  }
}

module.exports = NoteService;
