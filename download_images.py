from pathlib import Path
from urllib.request import urlopen, Request

cards = [
    ('Salamangreat of Fire',11962031),('Salamangreat Gazelle',26889158),('Salamangreat Spinny',52277807),('Salamangreat Foxy',94620082),
    ('Salamangreat Weasel',57357130),('Code of Soul',74652966),('Lady Debug',16188701),('Salamangreat Jack Jaguar',56003780),
    ('Speedroid Terrortop',81275020),('Speedroid Taketomborg',53932291),('Ash Blossom & Joyous Spring',14558127),('Maxx C',23434538),
    ('Droll & Lock Bird',94145021),('Nibiru, the Primal Being',27204311),('Cynet Mining',57160136),('Triple Tactics Talent',25311006),
    ('Salamangreat Sanctuary',1295111),('Will of the Salamangreat',64178424),('Called by the Grave',24224830),('Salamangreat Circle',52155219),
    ('Crossout Designator',65681983),('Salamangreat Charge',83533296),('Evenly Matched',15693423),('Infinite Impermanence',10045474),
    ('Salamangreat Rage',14934922),('Salamangreat Roar',51339637),('Brotherhood of the Fire Fist - Horse Prince',74168099),
    ('Super Starslayer TY-PHON - Sky Crisis',93039339),('Salamangreat Miragestallio',87327776),('Salamangreat Balelynx',14812471),('Salamangreat Sunlight Wolf',87871125),
    ('Splash Mage',59859086),('S:P Little Knight',29301450),('Decode Talker Heatsoul',61245672),
    ('Promethean Princess, Bestower of Flames',2772337),('Salamangreat Pyro Phoenix',31313405),('Salamangreat Raging Phoenix',57134592),
    # Effect Veiler's database ID is 97268401, but its current YGOPRODeck image is 97268402.
    ('Effect Veiler',97268402),('EM:P Meowmine',48017189),('Pot of Desires',35261759),('Cyberse Wicckid',52698008),('Hiita the Fire Charmer, Ablaze',48814566),
]
folder = Path(__file__).resolve().parent / 'cards'
folder.mkdir(exist_ok=True)
for name, cid in cards:
    dest = folder / f'{cid}.jpg'
    if dest.exists() and dest.stat().st_size > 1000:
        print(f'Already exists: {name}')
        continue
    print(f'Downloading {name}...')
    urls = [
        f'https://images.ygoprodeck.com/images/cards/{cid}.jpg',
        f'https://images.ygoprodeck.com/images/cards_small/{cid}.jpg',
        f'https://images.ygoprodeck.com/images/cards_cropped/{cid}.jpg',
    ]
    last_error = None
    for attempt in range(1, 4):
        for url in urls:
            try:
                req = Request(url, headers={'User-Agent':'Mozilla/5.0'})
                with urlopen(req, timeout=30) as r:
                    data = r.read()
                if len(data) < 1000:
                    raise RuntimeError('Image response was unexpectedly small')
                dest.write_bytes(data)
                print(f'  OK: {url}')
                last_error = None
                break
            except Exception as e:
                last_error = e
        if last_error is None:
            break
        import time
        time.sleep(attempt)
    if last_error is not None:
        print(f'FAILED: {name}: {last_error}')
print('Done.')
