# Note: Effect Veiler's YGOPRODeck image endpoint uses image ID 97268402.
$cards = @(
  @{name='Salamangreat of Fire'; id=11962031},
  @{name='Salamangreat Gazelle'; id=26889158},
  @{name='Salamangreat Spinny'; id=52277807},
  @{name='Salamangreat Foxy'; id=94620082},
  @{name='Salamangreat Weasel'; id=57357130},
  @{name='Code of Soul'; id=74652966},
  @{name='Lady Debug'; id=16188701},
  @{name='Salamangreat Jack Jaguar'; id=56003780},
  @{name='Speedroid Terrortop'; id=81275020},
  @{name='Speedroid Taketomborg'; id=53932291},
  @{name='Ash Blossom & Joyous Spring'; id=14558127},
  @{name='Maxx C'; id=23434538},
  @{name='Droll & Lock Bird'; id=94145021},
  @{name='Nibiru, the Primal Being'; id=27204311},
  @{name='Cynet Mining'; id=57160136},
  @{name='Triple Tactics Talent'; id=25311006},
  @{name='Hiita the Fire Charmer, Ablaze'; id=48814566},
  @{name='Cyberse Wicckid'; id=52698008},
  @{name='Pot of Desires'; id=35261759},
  @{name='EM:P Meowmine'; id=48017189},
  @{name='Effect Veiler'; id=97268402},
  @{name='Salamangreat Sanctuary'; id=1295111},
  @{name='Will of the Salamangreat'; id=64178424},
  @{name='Called by the Grave'; id=24224830},
  @{name='Salamangreat Circle'; id=52155219},
  @{name='Crossout Designator'; id=65681983},
  @{name='Salamangreat Charge'; id=83533296},
  @{name='Evenly Matched'; id=15693423},
  @{name='Infinite Impermanence'; id=10045474},
  @{name='Salamangreat Rage'; id=14934922},
  @{name='Salamangreat Roar'; id=51339637},
  @{name='Brotherhood of the Fire Fist - Horse Prince'; id=74168099},
  @{name='Super Starslayer TY-PHON - Sky Crisis'; id=93039339},
  @{name='Salamangreat Miragestallio'; id=87327776},
  @{name='Salamangreat Balelynx'; id=14812471},
  @{name='Salamangreat Sunlight Wolf'; id=87871125},
  @{name='Splash Mage'; id=59859086},
  @{name='S:P Little Knight'; id=29301450},
  @{name='Decode Talker Heatsoul'; id=61245672},
  @{name='Promethean Princess, Bestower of Flames'; id=2772337},
  @{name='Salamangreat Pyro Phoenix'; id=31313405},
  @{name='Salamangreat Raging Phoenix'; id=57134592}
)
$folder = Join-Path $PSScriptRoot 'cards'
New-Item -ItemType Directory -Force -Path $folder | Out-Null
$ok=0; $fail=0
foreach($c in $cards){
  $dest=Join-Path $folder ($c.id.ToString()+'.jpg')
  if(Test-Path $dest -PathType Leaf -and (Get-Item $dest).Length -gt 1000){ Write-Host "Already exists: $($c.name)"; $ok++; continue }
  $url="https://images.ygoprodeck.com/images/cards/$($c.id).jpg"
  $done=$false
  for($try=1;$try -le 3 -and -not $done;$try++){
    try{
      Write-Host "Downloading $($c.name)..."
      Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop
      if((Get-Item $dest).Length -gt 1000){$done=$true;$ok++} else {Remove-Item $dest -Force -ErrorAction SilentlyContinue}
    }catch{
      if(Test-Path $dest){Remove-Item $dest -Force -ErrorAction SilentlyContinue}
      if($try -lt 3){Start-Sleep -Seconds 1}
    }
  }
  if(-not $done){Write-Host "FAILED: $($c.name)" -ForegroundColor Red;$fail++}
}
Write-Host "`nFinished. Successful: $ok / $($cards.Count). Failed: $fail / $($cards.Count)."
Write-Host "Images are stored in: $folder"
Read-Host 'Press Enter to close'
