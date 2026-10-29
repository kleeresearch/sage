const currentPage = document.body.dataset.page || 'home';
const navItems = [['people','People'],['publications','Publications'],['research','Research'],['teaching','Teaching'],['news','News'],['join','Join']];
const header = document.querySelector('#site-header');
if (header) header.innerHTML = `<a class="logo" href="index.html"><strong>SAGE</strong><span>Sustainability Analytics, Governance &amp; Environment Lab</span></a><button class="menu" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav">${navItems.map(([slug,label])=>`<a class="${currentPage===slug?'active':''}" href="${slug}.html">${label}</a>`).join('')}</nav>`;
const footer = document.querySelector('#site-footer');
if (footer) footer.innerHTML = `<a class="footer-brand" href="index.html"><strong>SAGE Lab</strong><span>Data · Policy · Sustainability</span></a><p>Adelphi University<br>Garden City, New York</p><p><a href="mailto:kylee@adelphi.edu">kylee@adelphi.edu</a><br><a href="join.html">Join the lab →</a></p><small>© ${new Date().getFullYear()} SAGE Lab</small>`;
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
async function getData(path){const response=await fetch(path);if(!response.ok)throw new Error(`${response.status}`);return response.json();}
function setContent(selector,html){const node=document.querySelector(selector);if(node)node.innerHTML=html;}
function fail(selector){setContent(selector,'<p class="loading">Content will be available when the site is published.</p>');}
const renderMember=member=>`<article class="person-card"><div class="person-photo">${member.photo?`<img src="${member.photo}" alt="${member.name}">`:`<span>${member.initials}</span>`}</div><div class="person-body"><p class="kicker">${member.role}</p><h3>${member.name}</h3><p>${member.affiliation}</p><p class="small">${member.interests}</p></div></article>`;
const renderPublication=item=>`<article class="paper-row"><div class="paper-year">${item.year}</div><div><p class="kicker">${item.venue}</p><h3>${item.title}</h3><p>${item.description}</p></div>${item.url?`<a class="arrow-link" href="${item.url}" target="_blank" rel="noopener">DOI ↗</a>`:''}</article>`;
const renderNews=item=>`<article class="news-card">${item.image?`<img src="${item.image}" alt="${item.title}">`:'<div class="news-placeholder"><span>SAGE</span></div>'}<div class="card-body"><time>${item.date}</time><h3>${item.title}</h3><p>${item.description||''}</p>${item.url?`<a class="arrow-link" href="${item.url}" target="_blank" rel="noopener">Read more ↗</a>`:''}</div></article>`;
const renderResearch=item=>`<article class="research-card"><div class="research-art art-${item.color}"><span>${item.number}</span><b>${item.short}</b></div><div class="card-body"><p class="kicker">${item.status}</p><h3>${item.title}</h3><p>${item.description}</p><div class="tags">${item.methods.map(x=>`<span>${x}</span>`).join('')}</div></div></article>`;
const renderCourse=item=>`<article class="course-row"><div><p class="kicker">${item.code}</p><span>${item.term}</span></div><div><h3>${item.title}</h3><p>${item.description}</p></div></article>`;
async function populate(){
 if(document.querySelector('#member-grid')){try{const d=await getData('content/members.json');setContent('#member-grid',d.map(renderMember).join(''));}catch{fail('#member-grid');}}
 if(document.querySelector('#publication-list')){try{let d=await getData('content/publications.json');if(document.body.dataset.limit)d=d.slice(0,Number(document.body.dataset.limit));setContent('#publication-list',d.map(renderPublication).join(''));}catch{fail('#publication-list');}}
 if(document.querySelector('#news-grid')){try{let d=await getData('content/news.json');if(document.body.dataset.limit)d=d.slice(0,Number(document.body.dataset.limit));setContent('#news-grid',d.map(renderNews).join(''));}catch{fail('#news-grid');}}
 if(document.querySelector('#research-grid')){try{let d=await getData('content/research.json');if(document.body.dataset.limit)d=d.slice(0,Number(document.body.dataset.limit));setContent('#research-grid',d.map(renderResearch).join(''));}catch{fail('#research-grid');}}
 if(document.querySelector('#course-list')){try{const d=await getData('content/teaching.json');setContent('#course-list',d.map(renderCourse).join(''));}catch{fail('#course-list');}}
}
populate();
