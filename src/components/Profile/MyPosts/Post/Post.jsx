import React from 'react';
import s from './Post.module.css';

function Post(p) {
  return (
    <div className={s.item}>
      <div><img alt={p.message} src="https://wallbox.ru/wallpapers/main/201342/85860345f3d86cc.jpg" /></div>
        <div className={s.message}>{p.message}</div>
    </div>
  );
}

export default Post;