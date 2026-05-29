(() => {
  const scenes = document.querySelectorAll('.scene');
  const sceneNum = document.getElementById('sceneNum');
  const total = scenes.length;

  function go(n){
    n = Math.max(1, Math.min(total, n));
    scenes.forEach(s => s.classList.toggle('active', s.dataset.scene === String(n)));
    sceneNum.textContent = (n === 1) ? 0 : (n - 1);
    document.getElementById('navPrev').disabled = (n === 1);
    document.getElementById('navNext').disabled = (n === total);
    document.querySelectorAll('.scene-dot').forEach(d => {
      d.classList.toggle('active', parseInt(d.dataset.target,10) === n);
    });
  }
  window.__go = go;

  // generic nav buttons
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); go(parseInt(el.dataset.go,10)); });
  });

  document.addEventListener('keydown', e => {
    const cur = document.querySelector('.scene.active');
    const n = parseInt(cur.dataset.scene,10);
    if (e.key === 'ArrowRight' && n < total) go(n+1);
    if (e.key === 'ArrowLeft'  && n > 1) go(n-1);
    if (e.key === 'Escape') go(1);
  });

  // sound toggle
  let soundOn = true;
  const soundBtn = document.getElementById('soundBtn');
  const key = document.getElementById('audioKey');
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.style.background = soundOn ? '#f6f5f1' : '#dcdcdc';
    if (key) key.innerHTML = soundOn
      ? '[<svg width="11" height="11" viewBox="0 0 24 24" style="vertical-align:-1px"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="#222"/></svg> ON]'
      : '[<svg width="11" height="11" viewBox="0 0 24 24" style="vertical-align:-1px"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="#222"/><path d="M16 8l6 8M22 8l-6 8" stroke="#222" stroke-width="2"/></svg> OFF]';
  });

  // ===== Scene 3: album category card =====
  const CATS = [
    { label:'军训 · 大一秋',     title:'迷彩里的我们',       date:'2022.09',           count:'共 24 张',
      body:'第一次穿上不合身的迷彩服，第一次叫你的名字，第一次在操场上躲教官眼神。汗滴在睫毛上的样子，我都记得。' },
    { label:'教室 · 四年',       title:'坐在你后排',         date:'2022 — 2026',       count:'共 38 张',
      body:'课本传过的纸条，下课买的奶茶，被点名时你帮我答到的那句"到"。教室不只是上课的地方，是我每天最期待的地方。' },
    { label:'聚餐 · 大二春',     title:'食堂围一桌',         date:'2023 — 2025',       count:'共 56 张',
      body:'三块钱的麻辣烫，五块钱的盖浇饭，吃过最贵的一顿是你生日那顿火锅。重要的从来不是吃什么，是和谁一起。' },
    { label:'旅行 · 大三夏',     title:'我们的第一次远行',   date:'2024.07',           count:'共 42 张',
      body:'山顶的风，海边的浪，雨夜里的小旅馆。手机没电了，地图也丢了，那一天我们走得最远，也笑得最大声。' },
    { label:'比赛 · 大三秋',     title:'熬到天亮的那场答辩', date:'2024.11',           count:'共 18 张',
      body:'三天没睡觉，咖啡灌成水。台上的你紧张得手抖，台下的我比你还紧张。结果出来那一刻，我们抱在一起跳了。' },
    { label:'毕业典礼 · 大四夏', title:'最后一次合影',       date:'2026.06',           count:'共 12 张',
      body:'学位帽扔向天空的那一秒，我突然不想长大。镜头里你笑得很灿烂，可我知道你回头偷偷抹了眼泪。' },
  ];
  function updateStory(i){
    const c = CATS[i];
    document.getElementById('storyLabel').textContent = c.label;
    document.getElementById('storyTitle').textContent = c.title;
    document.getElementById('storyDate').textContent  = c.date;
    document.getElementById('storyCount').textContent = c.count;
    document.getElementById('storyBody').textContent  = c.body;
    document.getElementById('storyCard').classList.add('flash');
    setTimeout(()=>document.getElementById('storyCard').classList.remove('flash'),300);
  }
  document.querySelectorAll('.thumb-zone').forEach(b => {
    b.addEventListener('click', () => updateStory(parseInt(b.dataset.cat,10)));
  });

  const closeCard = document.getElementById('closeCard');
  if (closeCard) closeCard.addEventListener('click', () => go(2));

  const openLink = document.getElementById('openLink');
  if (openLink) openLink.addEventListener('click', e => {
    e.preventDefault();
    openLink.style.transform='scale(.97)';
    setTimeout(()=>{ openLink.style.transform=''; go(4); },140);
  });

  // ===== Scene 4: place hotspots =====
  const PLACES = [
    { title:'食堂 · 二楼第三排',  body:'你最爱坐窗边那个位子。盖浇饭加蛋，从大一吃到大四。后来我也学会了那样点。' },
    { title:'教学楼 · 305 教室',  body:'第一次见面就坐这间。后来我们故意选同一门选修课，就为了能继续在这里见。' },
    { title:'图书馆 · 三楼自习室',body:'你抢座我占座，桌上摆两本一样的书。窗外的银杏黄了又绿，绿了又黄。' },
    { title:'操场 · 跑道东侧',    body:'你陪我跑过的圈数，比我自己想跑的多得多。冬天天黑得早，路灯一亮你就知道该停了。' },
    { title:'宿舍 · 学三 405',    body:'凌晨两点的卧谈，吃过的泡面，攒过的快递盒。这间宿舍记得我们所有的样子。' },
  ];
  const placeTip = document.getElementById('placeTip');
  document.querySelectorAll('.hs').forEach(g => {
    g.addEventListener('click', () => {
      const i = parseInt(g.dataset.place,10);
      const p = PLACES[i];
      document.getElementById('placeTitle').textContent = p.title;
      document.getElementById('placeBody').textContent  = p.body;
      placeTip.hidden = false;
    });
  });
  const placeClose = document.getElementById('placeClose');
  if (placeClose) placeClose.addEventListener('click', () => { placeTip.hidden = true; });

  // ===== Scene 5: sticky notes highlight on click =====
  document.querySelectorAll('.sticky').forEach(s => {
    s.addEventListener('click', () => {
      document.querySelectorAll('.sticky').forEach(x => x.classList.remove('highlight'));
      s.classList.add('highlight');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.sticky').forEach(x => x.classList.remove('highlight'));
  });

  // top HUD shortcuts
  document.getElementById('menuBtn').addEventListener('click', () => go(1));
  document.getElementById('trophyBtn').addEventListener('click', () => go(total)); // graduation ceremony

  // global nav
  document.getElementById('navPrev').addEventListener('click', () => {
    const n = parseInt(document.querySelector('.scene.active').dataset.scene,10);
    if (n > 1) go(n-1);
  });
  document.getElementById('navNext').addEventListener('click', () => {
    const n = parseInt(document.querySelector('.scene.active').dataset.scene,10);
    if (n < total) go(n+1);
  });
  document.querySelectorAll('.scene-dot').forEach(d => {
    d.addEventListener('click', () => go(parseInt(d.dataset.target,10)));
  });

  // init
  go(1);
})();
