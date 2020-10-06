const Service = require('egg').Service;
const fs = require('fs');

class ItemService extends Service {
  async list() {
    const res = await this.app.mysql.select('itemList', {
      columns: ['id', 'title', 'content', 'createTime', 'updateTime'],
    });
    res.map((item) => {
      item.createTime = new Date(item.createTime).getTime();
      item.updateTime = new Date(item.updateTime).getTime();
      return item;
    });
    return res;
  }
  async update() {
    const data = this.ctx.request.body;
    data.updateTime = new Date(data.updateTime);
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
    console.log('>>> service upload', result.data, typeof result);
    if (result.data.code === 0) {
      return result.data.url;
    }
  }
}

module.exports = ItemService;
