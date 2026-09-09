# Common store — art + Tower.local Immich

Drive cannot receive binary uploads from this connector.
Drive folder is the **index / share root**. GitHub Pages is the **actual art**. Immich on Tower.local is the **local worker drop box**.

- Drive root: https://drive.google.com/drive/folders/1iM_6IKqpphliAO5wzA7fxoD038Fiz9jf
- Play: https://stevoblevo.github.io/peachfall/
- This file: https://github.com/stevoblevo/peachfall-heat/blob/main/STORE.md
- Phone page (QR target): https://stevoblevo.github.io/peachfall/TOWER.html

Do not collect. Meet. No contract. authorityEffect: none.

## Art already live (do not overwrite source anchors)

### Peachfall canon
- https://stevoblevo.github.io/peachfall/source/images/anchors/01_gen22_page1_the_princess_who_could_not_leave_the_tower.png
- https://stevoblevo.github.io/peachfall/source/images/anchors/02_astral_assembly_sae_and_little_princesses.png
- https://stevoblevo.github.io/peachfall/source/images/anchors/03_gameplay_assume_her_fragments.png
- https://stevoblevo.github.io/peachfall/source/images/continuity/04_sae_dream_guide_portrait.png
- https://stevoblevo.github.io/peachfall/source/images/continuity/05_princess_letter_storyload.png
- https://stevoblevo.github.io/peachfall/source/images/continuity/06_sae_and_knight_future_key_art.png
- https://stevoblevo.github.io/peachfall/source/images/continuity/07_storyload_dreambound_promises_storyboard.png
- https://stevoblevo.github.io/peachfall/source/images/continuity/08_gen22_watercolor_page1_of_2.png
- https://stevoblevo.github.io/peachfall/source/images/continuity/09_play_creates_the_world_concept.png
- https://stevoblevo.github.io/peachfall/source/preview/contact_sheet.jpg
- https://stevoblevo.github.io/peachfall/source/START_HERE.txt

### Save Bambi board + Kenzi title still
- Board: https://pbs.twimg.com/media/HRwwH9QXcAEX8bu.jpg
- Post: https://x.com/Stevoblevo/status/2097604501549027389
- Title screen Kenzi asked about: https://pbs.twimg.com/media/HRl4aEeXgAAgRtZ.jpg

### Play surfaces
- https://stevoblevo.github.io/peachfall/
- https://stevoblevo.github.io/cheese-royale/
- https://github.com/stevoblevo/peachfall-heat/blob/main/PEACHFALL.md

## Tower.local Immich (official compose only)

On Tower:

```bash
mkdir -p ~/immich-app ~/tower/drops ~/tower/library
cd ~/immich-app
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```

Edit `.env`:
- `UPLOAD_LOCATION=/home/YOU/tower/library`
- `DB_DATA_LOCATION=/home/YOU/immich-app/postgres`
- `TZ=America/Denver`
- `DB_PASSWORD=` a random A-Za-z0-9 string you invent. Do not commit it.

Add a read-write drops mount on `immich-server` volumes:

```yaml
- /home/YOU/tower/drops:/mnt/drops
```

Then:

```bash
docker compose up -d
```

Open http://tower.local:2283 — first visitor becomes admin.
Mobile app server URL: `http://tower.local:2283`
In Admin → External Libraries, import path `/mnt/drops` for worker drops.
Likes and shares stay inside Immich albums. Export only `~/tower/drops` offsite.

## Sync to Drive (optional, drops only)

Do **not** rclone the Immich postgres or thumbs.

```bash
rclone copy ~/tower/drops gdrive:PEACHFALL-AGENT-COIN/03-drops-sync --drive-root-folder-id 1iM_6IKqpphliAO5wzA7fxoD038Fiz9jf
```

After first copy, bisync if you want two-way:

```bash
rclone bisync ~/tower/drops gdrive:PEACHFALL-AGENT-COIN/03-drops-sync --resync
```

Later runs drop `--resync`. Filter images only. `--max-delete 5%`.

## Worker rule

Canon images stay on GitHub Pages. New drops land in Immich. Drive holds the share folder + this catalog. Fragments are not coins.
