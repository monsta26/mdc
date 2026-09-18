let cards = (typeof CARD_DATA !== 'undefined' && Array.isArray(CARD_DATA)) ? CARD_DATA : [];
window.DECK_CARD_DATA = window.DECK_CARD_DATA || {};
if(Array.isArray(cards) && !Array.isArray(window.DECK_CARD_DATA.salamangreat)) window.DECK_CARD_DATA.salamangreat = cards;
let currentDeck = 'salamangreat';
let currentSection = 'revision';
let currentView = 'home';
let groupFilter = 'all';
let salamangreatFilter = false;
let deckFilter = 'all';
let collectionFilter = 'all';
let roleFilter = 'all';

// Card type/subtype classification shown in the card detail view and used by the Roles filter.
const CARD_CLASSIFICATION = {
  'Cynet Mining': ['Spell','Normal'],
  'Triple Tactics Talent': ['Spell','Normal'],
  'Pot of Desires': ['Spell','Normal'],
  'Salamangreat Sanctuary': ['Spell','Field'],
  'Will of the Salamangreat': ['Spell','Normal'],
  'Called by the Grave': ['Spell','Quick-Play'],
  'Salamangreat Circle': ['Spell','Normal'],
  'Crossout Designator': ['Spell','Quick-Play'],
  'Salamangreat Charge': ['Spell','Normal'],
  'Evenly Matched': ['Trap','Normal'],
  'Infinite Impermanence': ['Trap','Normal'],
  'Salamangreat Rage': ['Trap','Normal'],
  'Salamangreat Roar': ['Trap','Counter'],
  'Maxx "C"': ['Monster','Effect'],
  'Ash Blossom & Joyous Spring': ['Monster','Effect'],
  'Droll & Lock Bird': ['Monster','Effect'],
  'Nibiru, the Primal Being': ['Monster','Effect'],
  'Effect Veiler': ['Monster','Effect'],
  'EM:P Meowmine': ['Monster','Effect'],
  'Salamangreat of Fire': ['Monster','Effect'],
  'Salamangreat Gazelle': ['Monster','Effect'],
  'Salamangreat Spinny': ['Monster','Effect'],
  'Salamangreat Foxy': ['Monster','Effect'],
  'Salamangreat Weasel': ['Monster','Effect'],
  'Code of Soul': ['Monster','Effect'],
  'Lady Debug': ['Monster','Effect'],
  'Salamangreat Jack Jaguar': ['Monster','Effect'],
  'Speedroid Terrortop': ['Monster','Effect'],
  'Speedroid Taketomborg': ['Monster','Effect'],
  'Cyberse Wicckid': ['Monster','Link'],
  'Hiita the Fire Charmer, Ablaze': ['Monster','Link'],
  'Brotherhood of the Fire Fist - Horse Prince': ['Monster','Synchro'],
  'Super Starslayer TY-PHON - Sky Crisis': ['Monster','Xyz'],
  'Salamangreat Miragestallio': ['Monster','Xyz'],
  'Salamangreat Balelynx': ['Monster','Link'],
  'Salamangreat Sunlight Wolf': ['Monster','Link'],
  'Splash Mage': ['Monster','Link'],
  'S:P Little Knight': ['Monster','Link'],
  'Decode Talker Heatsoul': ['Monster','Link'],
  'Promethean Princess, Bestower of Flames': ['Monster','Link'],
  'Salamangreat Pyro Phoenix': ['Monster','Link'],
  'Salamangreat Raging Phoenix': ['Monster','Link']
};
function cardClassification(c){
  const value=CARD_CLASSIFICATION[c?.name];
  if(value) return {type:value[0], subtype:value[1]};
  return {type:c?.cardType || c?.type || '', subtype:c?.cardSubtype || c?.subtype || ''};
}

// Master Duel Forbidden/Limited List effective September 3, 2026.
// 0 = Forbidden, 1 = Limited 1, 2 = Limited 2, 3 = Unlimited/not listed.
const BANLIST = {
  'Called by the Grave': 'forbidden',
  'Maxx \"C\"': 'limited1',
  'Droll & Lock Bird': 'limited2',
  'Dracotail Mululu': 'limited2',
  'Ketu Dracotail': 'limited2',
  'Fiendsmith Engraver': 'limited2',
  'K9-66A Jokul': 'limited2',
  'Kashtira Unicorn': 'limited2',
  'Kewl Tune Cue': 'limited2',
  'Necroface': 'limited2',
  'Marshmao⋆Yummy': 'limited2',
  'Tearlaments Scheiren': 'limited2',
  'Vanquish Soul Jiaolong': 'limited2',
  'Vanquish Soul Razen': 'limited2',
  'Zoodiac Ratpier': 'limited2',
  'Kewl Tune Vision': 'limited2',
  'Radiant Typhoon Chant': 'limited2',
  'Radiant Typhoon Vision': 'limited2',
  'Runick Freezing Curses': 'limited2',
  'Runick Slumber': 'limited2',
  'Runick Tip': 'limited2',
  'Treasures of the Kings': 'limited2',
  'D.D. Dynamite': 'limited2',
  'Red Reboot': 'limited2',
  'Solemn Judgment': 'limited2',
  'Amano-Iwato': 'limited1',
  'Ame No Habakiri': 'limited1',
  'Bystial Magnamhut': 'limited1',
  'Dimension Shifter': 'limited1',
  'Dracotail Lukias': 'limited1',
  'Exodia the Forbidden One': 'limited1',
  'Ext Ryzeal': 'limited1',
  'Fairy Tale - Snow': 'limited1',
  'Herald of Orange Light': 'limited1',
  'Inspector Boarder': 'limited1',
  'Keldo the Sacred Protector': 'limited1',
  'Kewl Tune Mix': 'limited1',
  'Kewl Tune Reco': 'limited1',
  'Maliss P Chessy Cat': 'limited1',
  'Maliss P Dormouse': 'limited1',
  'Maliss P White Rabbit': 'limited1',
  'Mudora the Sword Oracle': 'limited1',
  'PSY-Framegear Gamma': 'limited1',
  'Snake-Eye Ash': 'limited1',
  'Superheavy Samurai Soulpiercer': 'limited1',
  'Sword Ryzeal': 'limited1',
  'Tearlaments Kashtira': 'limited1',
  'Tenpai Dragon Chundra': 'limited1',
  'Blaze Fenix, the Burning Bombardment Bird': 'limited1',
  'Tearlaments Kitkallos': 'limited1',
  'Predaplant Verte Anaconda': 'limited1',
  'Herald of the Arc Light': 'limited1',
  'PSY-Framelord Omega': 'limited1',
  'T.G. Hyper Librarian': 'limited1',
  'Performapal Five-Rainbow Magician': 'limited1',
  'Zoodiac Broadbull': 'limited1',
  'Allure of Darkness': 'limited1',
  'Bonfire': 'limited1',
  'Branded Fusion': 'limited1',
  'Card Destruction': 'limited1',
  'Crossout Designator': 'limited1',
  'Floowandereeze and the Magnificent Map': 'limited1',
  'Foolish Burial': 'limited1',
  'Foolish Burial Goods': 'limited1',
  'Gold Sarcophagus': 'limited1',
  'Harpie\'s Feather Duster': 'limited1',
  'Heavy Storm': 'limited1',
  'Instant Fusion': 'limited1',
  'Maliss in Underground': 'limited1',
  'Mitsuruigi Prayers': 'limited1',
  'Monster Reborn': 'limited1',
  'One Day of Peace': 'limited1',
  'One for One': 'limited1',
  'Pot of Duality': 'limited1',
  'Pot of Extravagance': 'limited1',
  'Pressured Planet Wraitsoth': 'limited1',
  'Rahu Dracotail': 'limited1',
  'Reinforcement of the Army': 'limited1',
  'Runick Destruction': 'limited1',
  'Runick Fountain': 'limited1',
  'Sangen Kaimen': 'limited1',
  'Sky Striker Mecha - Hornet Drones': 'limited1',
  'Stake your Soul!': 'limited1',
  'Sungen Summoning': 'limited1',
  'Super Polymerization': 'limited1',
  'Synchro Overtake': 'limited1',
  'That Grass Looks Greener': 'limited1',
  'WANTED: Seeker of Sinful Spoils': 'limited1',
  'Anti-Spell Fragrance': 'limited1',
  'Gozen Match': 'limited1',
  'Rivalry of Warlords': 'limited1',
  'Skill Drain': 'limited1',
  'Solemn Judgement': 'limited1',
  'Solemn Strike': 'limited1',
  'Solemn Warning': 'limited1',
  'Synchro Zone': 'limited1',
  'Tearlaments Sulliek': 'limited1',
  'There Can Only Be One': 'limited1'
};
const BANLIST_META = {
  forbidden:{label:'Forbidden',limit:0},
  limited1:{label:'Limited 1',limit:1},
  limited2:{label:'Limited 2',limit:2}
};
function banStatus(c){ return BANLIST[c?.name] || 'unlimited'; }
function banLabel(c){ return BANLIST_META[banStatus(c)]?.label || ''; }
function banIcon(c){
  const status=banStatus(c);
  if(status==='unlimited') return '';
  const label=banLabel(c);
  const symbol=status==='forbidden'?'∕':status==='limited1'?'1':'2';
  return `<span class="mdm-ban-icon ${status}" title="${label}" aria-label="${label}">${symbol}</span>`;
}

const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const detail = document.querySelector('#detail');
const sectionNav = document.querySelector('#sectionNav');

const roleOptions = [
  ['starter','Starter'],['extender','Extender'],['searcher','Searcher'],['combo','Combo Piece'],['payoff','Payoff'],
  ['interaction','Interaction'],['handtrap','Hand Trap'],['boardbreaker','Board Breaker'],['protection','Protection'],
  ['recovery','Recovery / Recycler'],['consistency','Consistency'],['spell','Spell'],['trap','Trap'],['garnet','Garnet / Brick']
];
const STORE = 'master_duel_practice_tool_v1';
let state = loadState();

function loadState(){try{return JSON.parse(localStorage.getItem(STORE))||{}}catch{return {}}}
function saveState(){localStorage.setItem(STORE,JSON.stringify(state))}
function deckState(){state.decks ||= {}; state.decks[currentDeck] ||= {}; return state.decks[currentDeck]}
function getMeta(c){return deckState().cards?.[c.name] || {owned:c.targetCopies||0,fav:false,note:''}}
function setMeta(c,patch){deckState().cards ||= {}; deckState().cards[c.name]={...getMeta(c),...patch}; saveState()}
function owned(c){return Number(getMeta(c).owned)||0}
function needed(c){return Math.max(0,(c.targetCopies||0)-owned(c))}
function imagePath(c){return `cards/${c.imageId || c.id}.jpg`}
function uniqueCards(list){
  const seen=new Set();
  return (Array.isArray(list)?list:[]).filter(c=>{
    if(!c || !c.id || !c.name) return false;
    const key=String(c.id);
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function setDeck(id){
  const deck=DECKS.find(d=>d.id===id);
  if(!deck) return;
  currentDeck=id;
  currentView='deck';
  cards=uniqueCards(window.DECK_CARD_DATA && Array.isArray(window.DECK_CARD_DATA[id]) ? window.DECK_CARD_DATA[id] : []);
  groupFilter='all';
  salamangreatFilter=false;
  deckFilter='all';
  collectionFilter='all';
  roleFilter='all';
  const searchEl=document.querySelector('#search');
  if(searchEl){searchEl.value='';searchEl.dataset.value='';}
  sectionNav.classList.remove('hide');
  document.querySelector('#homeBtn')?.parentElement?.classList.remove('home-active');
  document.querySelector('#homeBtn')?.classList.remove('on','hide');
  setSection('revision');
}

function goHome(){
  currentView='home';
  document.querySelector('#homeBtn').classList.add('on','hide');
  document.querySelector('#sectionNav').classList.add('hide');
  const searchEl=document.querySelector('#search');
  if(searchEl){searchEl.value='';searchEl.dataset.value='';}
  document.querySelector('#revisionTools')?.remove();
  renderHome();
}

function setSection(section){
  currentSection=section;
  currentView='deck';
  document.querySelectorAll('.section-btn').forEach(b=>b.classList.toggle('on',b.dataset.section===section));
  const isRevision=section==='revision';
  sectionNav.classList.toggle('revision-active',isRevision);
  document.querySelector('#search')?.classList.toggle('hide',!isRevision);
  render();
}

function cardRoles(c){
  // Preserve explicit roles, while always adding the broad Spell/Trap role
  // from the card classification. Spell/Trap cards can have custom roles too,
  // so we must not return early when c.roles already exists.
  const roles=Array.isArray(c.roles) ? c.roles.map(r=>String(r).toLowerCase()) : [];
  const role=String(c.role||'').toLowerCase();
  const text=`${c.remember||''} ${(c.useFor||[]).map(x=>x.text||'').join(' ')}`.toLowerCase();
  const classification=cardClassification(c);
  if(classification.type==='Spell') roles.push('spell');
  if(classification.type==='Trap') roles.push('trap');
  const add=(key,...words)=>{if(words.some(w=>role.includes(w)||text.includes(w))) roles.push(key)};
  add('starter','starter','search'); add('extender','extender','revive','special summon','recursion');
  add('searcher','search'); add('combo','combo','enabler'); add('payoff','payoff','boss','removal');
  add('interaction','interaction','removal','disruption','hand trap','board breaker');
  add('handtrap','hand trap'); add('boardbreaker','board breaker'); add('protection','protect');
  add('recovery','recursion','recycle','revive','gy'); add('consistency','consistency','utility','search');
  if(role.includes('brick')||role.includes('garnet')) roles.push('garnet');
  return [...new Set(roles)];
}

function matches(c){
  const searchEl=document.querySelector('#search');
  const q=(searchEl?.value||'').toLowerCase().trim();
  if(q && !(`${c.name} ${c.role} ${(c.roles||[]).join(' ')} ${c.association} ${c.rarity}`.toLowerCase().includes(q))) return false;
  if(salamangreatFilter && !String(c.association||'').toLowerCase().includes('salamangreat')) return false;
  if(groupFilter==='engine' && c.group!=='engine') return false;
  if(groupFilter==='staple' && c.group!=='staple') return false;
  if(deckFilter!=='all' && (c.deckSection||'main')!==deckFilter) return false;
  if(collectionFilter==='owned' && owned(c)<=0) return false;
  if(collectionFilter==='craft' && needed(c)<=0) return false;
  if(collectionFilter==='favorite' && !getMeta(c).fav) return false;
  if(roleFilter!=='all' && !cardRoles(c).includes(roleFilter)) return false;
  return true;
}

function updateSearchControls(){
  const tools=document.querySelector('#revisionTools');
  const searchEl=document.querySelector('#search');
  const isRevision=currentSection==='revision' && currentView==='deck';
  if(searchEl){
    searchEl.classList.toggle('hide',!isRevision);
    searchEl.value=searchEl.dataset.value || '';
    if(!searchEl.dataset.wired){
      searchEl.addEventListener('input',()=>{searchEl.dataset.value=searchEl.value;render()});
      searchEl.dataset.wired='1';
    }
  }
  if(!isRevision){
    tools?.remove();
    return;
  }
  const deck=DECKS.find(d=>d.id===currentDeck);
  const archetypeName=deck?.name || 'Archetype';
  const markup=`
    <nav class="card-filters universal-filters" aria-label="Card filters">
      <button type="button" data-f="all" data-scope="group" class="filter-btn ${(!salamangreatFilter && groupFilter==='all' && deckFilter==='all' && collectionFilter==='all' && roleFilter==='all')?'on':''}">All</button>
      <button type="button" data-f="main" data-scope="deck" class="filter-btn ${deckFilter==='main'?'on':''}">Main Deck</button>
      <button type="button" data-f="extra" data-scope="deck" class="filter-btn ${deckFilter==='extra'?'on':''}">Extra Deck</button>
      <button type="button" data-f="salamangreat" data-scope="archetype" class="filter-btn ${salamangreatFilter?'on':''}">${archetypeName}</button>
      ${[['engine','Engine'],['staple','Staples']].map(([f,t])=>`<button type="button" data-f="${f}" data-scope="group" class="filter-btn ${f===groupFilter?'on':''}">${t}</button>`).join('')}
      ${[['owned','Owned'],['craft','Need to Craft'],['favorite','Favorites']].map(([f,t])=>`<button type="button" data-f="${f}" data-scope="collection" class="filter-btn ${f===collectionFilter?'on':''}">${t}</button>`).join('')}
      <select id="roleFilter" class="role-select" aria-label="Filter by card role">
        <option value="all">Roles</option>${roleOptions.map(([v,t])=>`<option value="${v}" ${v===roleFilter?'selected':''}>${t}</option>`).join('')}
      </select>
    </nav>
    <div class="summary" id="summary"></div>`;
  if(!tools){
    const el=document.createElement('div');
    el.id='revisionTools';
    el.className='revision-tools';
    document.querySelector('main#app').before(el);
  }
  const liveTools=document.querySelector('#revisionTools');
  liveTools.innerHTML=markup;
  liveTools.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
    const scope=b.dataset.scope;
    const filter=b.dataset.f;
    const currentlySelected = (filter==='all' && !salamangreatFilter && groupFilter==='all' && deckFilter==='all' && collectionFilter==='all' && roleFilter==='all') ||
      (scope==='archetype' && salamangreatFilter) || (scope==='group' && groupFilter===filter) || (scope==='deck' && deckFilter===filter) || (scope==='collection' && collectionFilter===filter);
    // Exactly one filter may be active. Clicking the active filter returns to All.
    groupFilter='all'; salamangreatFilter=false; deckFilter='all'; collectionFilter='all'; roleFilter='all';
    if(!currentlySelected && filter!=='all'){
      if(scope==='archetype') salamangreatFilter=true;
      else if(scope==='group') groupFilter=filter;
      else if(scope==='deck') deckFilter=filter;
      else if(scope==='collection') collectionFilter=filter;
    }
    render();
  }));
  liveTools.querySelector('#roleFilter')?.addEventListener('change',e=>{
    groupFilter='all'; salamangreatFilter=false; deckFilter='all'; collectionFilter='all';
    roleFilter=e.target.value;
    render();
  });
}

function featuredCard(deck, item){
  if(typeof item === 'string') {
    const data=cards.find(c=>c.name===item);
    return data || {name:item, id:null, role:'Featured card'};
  }
  return item;
}

function renderHome(){
  const appEl=document.querySelector('#app');
  if(!appEl) return;
  document.querySelector('#pageTitle').textContent='Master Duel Companion';
  document.querySelector('#pageSubtitle').textContent='Your Master Duel decks, revision cards and practice tools.';
  document.querySelector('#homeBtn')?.parentElement?.classList.add('home-active');
  appEl.innerHTML=`<section class="home-intro"><div class="home-intro-copy"><div class="home-kicker">MASTER DUEL</div><h2>Your decks</h2><p>Pick a deck to revise cards, learn combos or start practicing.</p></div><div class="deck-count">${DECKS.length} deck${DECKS.length===1?'':'s'}</div></section><section class="deck-grid" aria-label="Deck library"></section>`;
  const grid=appEl.querySelector('.deck-grid');
  DECKS.forEach(deck=>{
    const featured=(deck.featuredCards||[]).map(item=>featuredCard(deck,item));
    const card=document.createElement('article');
    card.className=`deck-tile ${deck.comingSoon?'is-coming':''}`;
    card.innerHTML=`<div class="deck-tile-head"><div class="deck-title-wrap"><div class="deck-icon">${deck.emoji||'🎴'}</div><div><div class="home-deck-name">${esc(deck.name)}</div><p>${esc(deck.subtitle||'')}</p></div></div>${deck.comingSoon?'<span class="coming-badge">Coming soon</span>':'<span class="open-hint">Open deck →</span>'}</div><div class="featured-label">KEY CARDS</div><div class="featured-cards"></div>`;
    const fc=card.querySelector('.featured-cards');
    featured.forEach(c=>{
      const item=document.createElement('div'); item.className='featured-card';
      if(c.id){
        item.innerHTML=`<img src="cards/${c.imageId || c.id}.jpg" alt="${esc(c.name)}" loading="lazy"><div class="featured-name">${esc(c.name)}</div>`;
        const img=item.querySelector('img');
        img.addEventListener('error',()=>{img.outerHTML='<div class="featured-missing">CARD<br>IMAGE</div>'},{once:true});
      } else {
        item.innerHTML=`<div class="featured-missing text-card"><span>${esc((c.name||'Card').replace('Sky Striker ','').slice(0,18))}</span></div><div class="featured-name">${esc(c.name)}</div>`;
      }
      fc.appendChild(item);
    });
    card.addEventListener('click',()=>{
      if(deck.comingSoon) return;
      setDeck(deck.id);
    });
    grid.appendChild(card);
  });
}

function render(){
  const appEl=document.querySelector('#app');
  if(currentView==='home') return renderHome();
  const deck=DECKS.find(d=>d.id===currentDeck);
  document.querySelector('#pageTitle').textContent=deck?.name || 'Master Duel Practice Tool';
  const deckCards=uniqueCards(window.DECK_CARD_DATA && Array.isArray(window.DECK_CARD_DATA[currentDeck]) ? window.DECK_CARD_DATA[currentDeck] : []);
  if(!appEl) return;
  if(currentSection==='combos') return renderPlaceholder('Combos','This section is ready for Salamangreat combo lines. We will add the combo library here without mixing it into card revision.','🧩','Start with basic 1-card and 2-card lines, then add alternate lines and hand-trap recovery.');
  if(currentSection==='practice') return renderPlaceholder('Practice','This section is ready for interactive practice drills and training scenarios.','🎯','Planned drills: opening-hand practice, hand-trap drills, going-second decisions and resource-management exercises.');

  cards=uniqueCards(window.DECK_CARD_DATA && Array.isArray(window.DECK_CARD_DATA[currentDeck]) ? window.DECK_CARD_DATA[currentDeck] : []);
  updateSearchControls();
  const searchEl=document.querySelector('#search');
  if(!searchEl){appEl.innerHTML='<p class="empty">Revision search could not be loaded.</p>';return;}

  const all=cards.filter(matches);
  document.querySelector('#pageSubtitle').innerHTML=`${esc(deck?.subtitle || '')}<span class="deck-card-count">${all.length} cards</span>`;
  const summary=document.querySelector('#summary');
  const ownedCards=cards.filter(c=>owned(c)>0).length;
  const need=cards.reduce((n,c)=>n+needed(c),0);
  const favs=cards.filter(c=>getMeta(c).fav).length;
  const deckCopies=cards.reduce((n,c)=>n+(c.targetCopies||0),0);
  summary.innerHTML=`<strong>${cards.length}</strong> cards · <strong>${deckCopies}</strong> current-deck copies · <strong>${ownedCards}</strong> owned · <strong>${need}</strong> copies to craft · <strong>${favs}</strong> favorites`;

  appEl.innerHTML='';
  if(!all.length){appEl.innerHTML='<p class="empty">No cards found.</p>';return;}
  const grid=document.createElement('div');
  grid.className='grid';
  appEl.appendChild(grid);
  all.forEach(c=>{
      const m=getMeta(c), n=needed(c);
      const el=document.createElement('article'); el.className='card';
      el.innerHTML=`<img class="pic" src="${imagePath(c)}" alt="${esc(c.name)}" loading="lazy"><div class="body"><div class="name-row"><div><div class="name">${esc(c.name)}</div><div class="role">${esc(c.role)}</div></div><button class="star ${m.fav?'on':''}" type="button" aria-label="Toggle favorite">${m.fav?'★':'☆'}</button></div><div class="tag">${esc(c.remember)}</div><div class="badges"><span class="badge rarity ${c.rarity}">${c.rarity}</span><span class="badge copy-badge">Owned ${owned(c)}/${c.targetCopies||0}</span>${n>0?`<span class="badge craft">Craft ${n}</span>`:''}${banIcon(c)}</div></div>`;
      const img=el.querySelector('img');
      img.addEventListener('error',()=>{img.outerHTML='<div class="pic missing">Add this card image to the <b>cards</b> folder.</div>'},{once:true});
      el.querySelector('.star').addEventListener('click',e=>{e.stopPropagation();setMeta(c,{fav:!m.fav});render()});
      el.addEventListener('click',e=>{if(e.target.closest('.star'))return;openCard(c)});
    grid.appendChild(el);
  });
}

function renderPlaceholder(title,text,icon,detailText){
  app.innerHTML=`<section class="coming"><div class="coming-icon">${icon}</div><div class="deck-kicker">${currentDeck.toUpperCase()}</div><h2>${title}</h2><p>${text}</p><div class="planned"><strong>Planned structure</strong><span>${detailText}</span></div></section>`;
}

function openCard(c){
  const m=getMeta(c), n=needed(c);
  modal.classList.remove('hide'); modal.hidden=false; modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  const rules=c.simpleRules||[c.simple];
  detail.innerHTML=`<div class="detail"><div class="media-col"><div><img class="modal-img" src="${imagePath(c)}" alt="${esc(c.name)}"></div><div class="compact-info"><div class="box"><h3>🎯 ROLE</h3><div class="role-value">${esc(c.role)}</div></div><div class="box card-type-box"><h3>🃏 CARD TYPE</h3><div class="card-type-value"><strong>${esc(cardClassification(c).type || 'Unknown')}</strong>${cardClassification(c).subtype ? `<span class="card-type-subtype">${esc(cardClassification(c).subtype)}</span>` : ''}</div></div>${banIcon(c) ? `<div class="box banlist-box"><h3>⛔ BANLIST</h3><div class="banlist-icon-row">${banIcon(c)}</div></div>` : ''}<div class="box usefor-box"><h3>🚀 WHAT SHOULD I USE THIS FOR?</h3><div class="usefor-list">${(c.useFor||[]).map(u=>`<div class="usefor-item"><span class="usefor-icon">${u.icon}</span><span>${esc(u.text)}</span></div>`).join('')}</div></div></div></div><div class="detail-main"><h2 class="modal-title" id="detail-title">${esc(c.name)}</h2><div class="modal-sub">${esc(c.role)} · <span class="rarity-text ${c.rarity}">${c.rarity}</span> · Craft ${c.craftCost} <span class="rarity-text ${c.rarity}">${c.rarity}</span> CP</div><div class="box"><h3>🧠 REMEMBER</h3><div class="memory">${esc(c.remember)}</div></div><div class="box"><h3>⚡ IN SHORT</h3><div class="rules">${rules.map((r,i)=>`<div class="rule"><span class="rule-num">${i+1}</span><div>${esc(r)}</div></div>`).join('')}</div></div><details class="box"><summary>📜 ORIGINAL CARD TEXT</summary><div class="orig rules" id="orig">Loading current database wording…</div></details><div class="box"><h3>📋 CARD INFO</h3><div class="meta-grid"><div class="meta"><div class="meta-label">Rarity</div><div class="meta-value">${c.rarity}</div></div><div class="meta"><div class="meta-label">Master Duel Banlist</div><div class="meta-value">${banLabel(c)||'Unlimited'}</div></div><div class="meta"><div class="meta-label">Crafting</div><div class="meta-value">${c.craftCost} ${c.rarity} CP</div></div><div class="meta"><div class="meta-label">Deck target</div><div class="meta-value">${c.targetCopies||0} copy/copies</div></div><div class="meta"><div class="meta-label">Need to craft</div><div class="meta-value">${n} copy/copies</div></div></div></div><div class="box"><h3>📦 COLLECTION</h3><div class="collection-actions"><label class="checkline"><input id="ownedCheck" type="checkbox" ${owned(c)>0?'checked':''}> I own this card</label><div class="counter"><button id="minus" type="button">−</button><input id="ownedCount" inputmode="numeric" type="number" min="0" max="99" value="${owned(c)}" aria-label="Owned copies"><button id="plus" type="button">+</button></div><button id="favBtn" class="badge fav" type="button">${m.fav?'★ Favorited':'☆ Favorite'}</button></div></div><div class="box"><h3>🔗 DECK ASSOCIATION</h3><div class="assoc"><span class="badge">${esc(c.deck)}</span><span class="badge">${esc(c.association)}</span><span class="badge">Current deck target: ${c.targetCopies||0}</span></div></div><div class="box"><h3>❤ MY NOTES</h3><textarea id="note" placeholder="Add your own reminder, combo line, matchup note, or mistake to avoid...">${esc(m.note||'')}</textarea></div></div></div>`;
  wireCollection(c);
  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name='+encodeURIComponent(c.name)).then(r=>r.json()).then(j=>{const el=document.querySelector('#orig');if(!el)return;const text=j.data?.[0]?.desc||'Original text unavailable.';const parts=text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)||[text];el.innerHTML=parts.map((p,i)=>`<div class="rule"><span class="rule-num">${i+1}</span><div>${esc(p.trim())}</div></div>`).join('')}).catch(()=>{const el=document.querySelector('#orig');if(el)el.textContent='Connect to the internet to load the original card text.'});
}

function wireCollection(c){
  const ownedCheck=document.querySelector('#ownedCheck'), count=document.querySelector('#ownedCount');
  const update=(v)=>{const n=Math.max(0,Math.min(99,Number(v)||0));count.value=n;setMeta(c,{owned:n});ownedCheck.checked=n>0;render()};
  document.querySelector('#minus').onclick=()=>update(owned(c)-1);document.querySelector('#plus').onclick=()=>update(owned(c)+1);count.onchange=()=>update(count.value);ownedCheck.onchange=()=>update(ownedCheck.checked?Math.max(1,owned(c)):0);document.querySelector('#favBtn').onclick=()=>{setMeta(c,{fav:!getMeta(c).fav});openCard(c)};document.querySelector('#note').oninput=e=>setMeta(c,{note:e.target.value});
}

function closeModal(){modal.classList.add('hide');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
document.querySelector('#x').addEventListener('click',closeModal);document.querySelector('.shade').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelector('#homeBtn').addEventListener('click',goHome);
document.querySelectorAll('.section-btn').forEach(b=>b.onclick=()=>setSection(b.dataset.section));
goHome();
