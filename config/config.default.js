exports.keys = 'aaa';

exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

exports.cors = {
  credentials: true,
  origin: (ctx) => ctx.get('origin'),
};

exports.security = {
  csrf: {
    enable: false,
  },
};

exports.multipart = {
  mode: 'file',
};
