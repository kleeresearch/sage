const currentPage = document.body.dataset.page || 'home';
const navItems = [['people','People'],['publications','Publications'],['research','Research'],['teaching','Teaching'],['news','News'],['join','Contact']];
const header = document.querySelector('#site-header');
if (header) header.innerHTML = `<a class="logo" href="index.html"><strong>SAGE Lab</strong><span>Sustainability Analytics, Governance &amp; Environment Lab</span></a><button class="menu" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav">${navItems.map(([slug,label])=>`<a class="${currentPage===slug?'active':''}" href="${slug}.html">${label}</a>`).join('')}</nav>`;
const footer = document.querySelector('#site-footer');
if (footer) footer.innerHTML = `<a class="footer-brand" href="index.html"><strong>SAGE Lab</strong><span>Sustainability Analytics, Governance &amp; Environment Lab</span></a><p class="footer-address">Adelphi University<br>Science Building 324<br>South Avenue, Garden City,<br>New York, USA 11530<br>Office: (+1) 516-833-8184</p><p class="footer-contact"><a href="mailto:kylee@adelphi.edu">kylee@adelphi.edu</a><br><a href="join.html">Contact →</a></p><small>© ${new Date().getFullYear()} SAGE Lab</small>`;
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const gmailButton=document.querySelector('.email-panel .button');
if(gmailButton){gmailButton.href='https://mail.google.com/mail/?view=cm&fs=1&to=kylee@adelphi.edu';gmailButton.target='_blank';gmailButton.rel='noopener';}
async function getData(path){const response=await fetch(path);if(!response.ok)throw new Error(`${response.status}`);return response.json();}
function setContent(selector,html){const node=document.querySelector(selector);if(node)node.innerHTML=html;}
function fail(selector){setContent(selector,'<p class="loading">Content will be available when the site is published.</p>');}
const renderMember=member=>`<article class="person-card"><a class="person-card-link" href="person-profile.html?slug=${encodeURIComponent(member.slug)}"><div class="person-photo">${member.photo?`<img src="${member.photo}" alt="${member.name}">`:`<span>${member.initials}</span>`}</div><div class="person-body"><p class="kicker">${member.role}</p><h3>${member.name}</h3><p>${member.affiliation}</p><span class="arrow-link">View profile →</span></div></a></article>`;
const renderPublication=item=>`<article class="paper-row"><div class="paper-year">${item.year}</div>${item.image?`<img class="journal-cover" src="${item.image}" alt="${item.venue} journal cover">`:`<div class="journal-cover journal-cover-placeholder">${item.venue}</div>`}<div><p class="kicker">${item.venue}</p><h3>${item.title}</h3></div>${item.url?`<a class="arrow-link" href="${item.url}" target="_blank" rel="noopener">DOI ↗</a>`:''}</article>`;
const renderNews=item=>`<article class="news-card">${item.image?`<a href="news-article.html?slug=${encodeURIComponent(item.slug)}"><img class="fit-${item.imageFit||'cover'}" src="${item.image}" alt="${item.title}"></a>`:`<a class="news-placeholder" href="news-article.html?slug=${encodeURIComponent(item.slug)}"><span>SAGE</span></a>`}<div class="card-body"><time>${item.date}</time><h3><a class="card-title-link" href="news-article.html?slug=${encodeURIComponent(item.slug)}">${item.title}</a></h3><p>${item.description||''}</p><a class="arrow-link" href="news-article.html?slug=${encodeURIComponent(item.slug)}">Read article →</a></div></article>`;
const renderResearch=item=>`<article class="research-card"><a class="research-card-link" href="research-project.html?slug=${encodeURIComponent(item.slug)}"><div class="research-art art-${item.color}"><span>${item.number}</span><b>${item.short}</b></div><div class="card-body"><p class="kicker">Current Research</p><h3>${item.title}</h3><div class="tags">${item.methods.map(x=>`<span>${x}</span>`).join('')}</div><span class="arrow-link">View project →</span></div></a></article>`;
const renderCourse=item=>`<article class="course-row"><div><p class="course-institution">${item.institution||''}</p><p class="kicker">${item.code}</p>${item.terms?.map(term=>`<span class="course-term">${term}</span>`).join('')||''}</div><div><h3>${item.title}</h3>${item.description?`<p>${item.description}</p>`:''}</div></article>`;
async function populate(){
 if(document.querySelector('#member-grid')){try{const d=await getData('content/members.json');setContent('#member-grid',d.map(renderMember).join(''));}catch{fail('#member-grid');}}
 if(document.querySelector('#publication-list')){try{let d=await getData('content/publications.json');if(document.body.dataset.limit)d=d.slice(0,Number(document.body.dataset.limit));setContent('#publication-list',d.map(renderPublication).join(''));}catch{fail('#publication-list');}}
 if(document.querySelector('#news-grid')){try{let d=await getData('content/news.json');if(document.body.dataset.limit)d=d.slice(0,Number(document.body.dataset.limit));setContent('#news-grid',d.map(renderNews).join(''));}catch{fail('#news-grid');}}
 if(document.querySelector('#research-grid')){try{let d=await getData('content/research.json');if(document.body.dataset.limit)d=d.slice(0,Number(document.body.dataset.limit));setContent('#research-grid',d.map(renderResearch).join(''));}catch{fail('#research-grid');}}
 if(document.querySelector('#course-list')){try{const d=await getData('content/teaching.json');setContent('#course-list',d.map(renderCourse).join(''));}catch{fail('#course-list');}}
}
populate();

async function populateNewsArticle(){
 const root=document.querySelector('#news-article');
 if(!root)return;
 try{
  const slug=new URLSearchParams(window.location.search).get('slug');
  const items=await getData('content/news.json');
  const item=items.find(entry=>entry.slug===slug);
  if(!item)throw new Error('Article not found');
  document.title=`${item.title} | SAGE Lab`;
  const gallery=(item.gallery||[]).map((src,index)=>`<figure><img src="${src}" alt="${item.title}${index?` — image ${index+1}`:''}"></figure>`).join('');
  root.innerHTML=`<article><header class="article-hero"><a class="article-back" href="news.html">← Back to News</a><time>${item.date}</time><h1>${item.title}</h1><p>${item.description||''}</p></header><div class="article-content">${item.body?.map(paragraph=>`<p>${paragraph}</p>`).join('')||''}${gallery?`<div class="article-gallery">${gallery}</div>`:''}${item.source?`<p class="article-source"><a class="text-link" href="${item.source}" target="_blank" rel="noopener">Read the original Adelphi University article ↗</a></p>`:''}</div></article>`;
 }catch{
  root.innerHTML='<section class="article-shell"><h1>Article not found</h1><p><a class="text-link" href="news.html">Return to News</a></p></section>';
 }
}
populateNewsArticle();

async function populateResearchProject(){
 const root=document.querySelector('#research-project');
 if(!root)return;
 try{
  const slug=new URLSearchParams(window.location.search).get('slug');
  const items=await getData('content/research.json');
  const item=items.find(entry=>entry.slug===slug);
  if(!item)throw new Error('Project not found');
  document.title=`${item.title} | SAGE Lab`;
  const gallery=(item.gallery||[]).map((src,index)=>`<figure><img src="${src}" alt="${item.title}${index?` — image ${index+1}`:''}"></figure>`).join('');
  root.innerHTML=`<article><header class="article-hero research-detail-hero"><a class="article-back" href="research.html">← Back to Research</a><p class="detail-status">Current Research</p><h1>${item.title}</h1><div class="detail-tags">${item.methods.map(method=>`<span>${method}</span>`).join('')}</div></header><div class="article-content"><p class="article-lead">${item.description}</p>${item.body?.map(paragraph=>`<p>${paragraph}</p>`).join('')||''}${gallery?`<div class="article-gallery">${gallery}</div>`:''}</div></article>`;
 }catch{
  root.innerHTML='<section class="article-shell"><h1>Project not found</h1><p><a class="text-link" href="research.html">Return to Research</a></p></section>';
 }
}
populateResearchProject();

async function populatePersonProfile(){
 const root=document.querySelector('#person-profile');
 if(!root)return;
 try{
  const slug=new URLSearchParams(window.location.search).get('slug');
  const members=await getData('content/members.json');
  const member=members.find(entry=>entry.slug===slug);
  if(!member)throw new Error('Profile not found');
  document.title=`${member.name} | SAGE Lab`;
  const links=member.links?.length?`<div class="profile-detail-links">${member.links.map(link=>`<a class="button" href="${link.url}"${link.url.startsWith('http')?' target="_blank" rel="noopener"':''}>${link.label}${link.url.startsWith('http')?' ↗':''}</a>`).join('')}</div>`:'';
  root.innerHTML=`<article><header class="profile-hero"><a class="article-back" href="people.html">← Back to People</a><div class="profile-hero-grid"><div class="profile-hero-photo">${member.photo?`<img src="${member.photo}" alt="${member.name}">`:`<span>${member.initials}</span>`}</div><div><p class="detail-status">${member.role}</p><h1>${member.name}</h1><p>${member.affiliation}</p>${links}</div></div></header><div class="article-content"><h2>About</h2>${member.bio?.map(paragraph=>`<p>${paragraph}</p>`).join('')||''}<h2>Research interests</h2><p>${member.interests}</p></div></article>`;
 }catch{
  root.innerHTML='<section class="article-shell"><h1>Profile not found</h1><p><a class="text-link" href="people.html">Return to People</a></p></section>';
 }
}
populatePersonProfile();
