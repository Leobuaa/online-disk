import React, { Component } from 'react';

class BodyContent extends Component {
  constructor(props) {
   super(props);
  }

  render() {
    const lists = [];
    const size = 30;

    for (let i = 0; i < size; i++) {
      lists.push({
        id: i,
        title: '生活大爆炸',
        size: '223MB',
        updatedAt: '2016-11-28 11:22:30',
        checked: false,
      });

      lists.push({
        id: i + size,
        title: '神探夏洛克',
        size: '588MB',
        updatedAt: '2016-11-28 12:20:11',
        checked: false,
      });
   }

    const fileLists = lists.map((obj) =>
      <li className="list-group-item" key={obj.id}>
        <div className="check">
          <input type="checkbox" />
        </div>
        <div className="title">{obj.title}</div>
        <div className="size">{obj.size}</div>
        <div className="updatedAt">{obj.updatedAt}</div>
      </li>
    );

    return (
      <div className="body-content">
        <div className="body-title">
          <p>全部文件</p>
          <ul className="list-group">
            <li className="list-group-item" key='listTitle'>
              <div className="check">
                <input type="checkbox" />
              </div>
              <div className="title">文件名</div>
              <div className="size">文件大小</div>
              <div className="updatedAt">修改时间</div>
            </li>
          </ul>
        </div>
        <div className="file-list">
          <ul className="list-group">
            {fileLists}
          </ul>
        </div>
      </div>
    );
  }
}

export default BodyContent;
