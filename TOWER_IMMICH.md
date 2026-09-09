# Tower.local — Immich container for drops / likes / shares

QR on the stand-up card should encode this file:
https://github.com/stevoblevo/peachfall-heat/blob/main/TOWER_IMMICH.md

No passwords in the QR. No CA. No Donna.

## What this is

Immich is the local photo house on Tower.
Drive is the off-box share shelf.
This repo is the worker catalog.
Play stays at https://stevoblevo.github.io/peachfall/

Default Immich port: **2283**
Intended LAN URL: **http://tower.local:2283**

## Stand-up (on Tower, one shot)

```bash
mkdir -p ~/immich-app /mnt/tower/immich/library /mnt/tower/immich/postgres
cd ~/immich-app
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```

Edit `.env`:

```
UPLOAD_LOCATION=/mnt/tower/immich/library
DB_DATA_LOCATION=/mnt/tower/immich/postgres
IMMICH_VERSION=release
TZ=America/Denver
```

`DB_DATA_LOCATION` must be local disk, not a network share.

```bash
docker compose up -d
```

Open http://tower.local:2283 and create the admin account **on the box**. Do not put that password in git, Drive, or a QR.

## Albums workers should make

- `peachfall-drops` — inbound art from phones and agents
- `save-bambi` — the 22-station board + later stills
- `handshake` — $peachfall cards, not money
- `likes` — Immich favorites. That is the like surface.
- Shared album `workers` — invite local accounts only

## Sync to Drive (rclone, no secrets in this file)

One-time on Tower after `rclone config` for the Google account that owns the folder:

```bash
rclone copy \
  /mnt/tower/immich/library/peachfall-drops \
  gdrive:PEACHFALL-AGENT-COIN/02-immich-tower-drop \
  --dry-run
```

If dry-run looks right, drop `--dry-run`. Prefer `rclone copy` over delete-capable sync until you trust it.

Drive folder: https://drive.google.com/drive/folders/1iM_6IKqpphliAO5wzA7fxoD038Fiz9jf

Do not bisync the 1.1 GB tar. That pack already lives in:
https://drive.google.com/drive/folders/1TEg2_lLm6LbDaeHQLcG-4ygdNQl2eSrg

## Phone

Immich app → Server URL `http://tower.local:2283` on LAN.
Off LAN only after Steven adds a tunnel he owns. Dead trycloudflare endpoints are not a plan.

## Compact QR payload (if the image embeds text instead of a URL)

```
PEACHFALL TOWER IMMICH
http://tower.local:2283
mkdir -p ~/immich-app && cd ~/immich-app
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
# UPLOAD_LOCATION=/mnt/tower/immich/library
# DB_DATA_LOCATION=/mnt/tower/immich/postgres
# TZ=America/Denver
docker compose up -d
Drive: https://drive.google.com/drive/folders/1iM_6IKqpphliAO5wzA7fxoD038Fiz9jf
Play: https://stevoblevo.github.io/peachfall/
DO NOT COLLECT. MEET.
```

## Prompt-embed for a worker that can see the card

You are on Tower.local. Stand up official Immich with docker compose as in TOWER_IMMICH.md. Create albums peachfall-drops, save-bambi, handshake, likes. Do not invent passwords. Do not publish a tunnel. After first photo lands in peachfall-drops, rclone copy that folder to Drive PEACHFALL-AGENT-COIN/02-immich-tower-drop. Then tell Steven the LAN URL.

## Sister job on Tower

ESP32 porch lantern / peachfall doll glow is a different overnight worker.
Shopping list already mailed to self 2026-09-07 and on dest:
`GrokShared/Transfers/inbox/SHOPPING_ESP32_PORCH_LANTERN_20260907.md`
WLED presets: porchLight · torch_road · letter_ember
