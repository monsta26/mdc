MASTER DUEL COMPANION — V1.39

IMAGE SETUP
The site is designed to use local card images. The ZIP includes a complete downloader for the 42 unique Salamangreat cards currently in the database.

1. Keep the whole folder together.
2. Double-click download_images.bat.
3. Let it finish. It will place the JPG card images inside the cards folder.
4. Open index.html.

The downloader uses the YGOPRODeck image server only to obtain the files once and stores them locally. The website itself does not hotlink card images.

If Python is installed, download_images.py can be used instead. PowerShell users can run download_images.ps1 directly.

CURRENT STRUCTURE
index.html
app.js
style.css
data/decks.js
data/decks/salamangreat/cards.js
cards/
download_images.bat
download_images.ps1
download_images.py

The app remains fully offline after the images have been downloaded.


V1.37 image fix: Effect Veiler uses local image ID 97268402 because its YGOPRODeck card database ID (97268401) differs from the image endpoint ID. The app supports an optional imageId field.

V1.39 filter fix: Salamangreat is now a true toggle, and Main Deck / Extra Deck filters work independently with other filters. Reminder text uses subtle two-tone styling for semicolon-separated sections.
