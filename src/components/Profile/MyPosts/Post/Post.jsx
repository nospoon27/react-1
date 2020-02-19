import React from 'react';
import s from './Post.module.css';

function Post(p) {
  return (
    <div className={s.item}>
    <img src="https://wallbox.ru/wallpapers/main/201342/85860345f3d86cc.jpg" />
      {p.message}
    </div>
  );
}

export default Post;