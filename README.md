# The agent builds a game from one prompt

[![Bounty](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![Rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/yansz54/post-x-agent-builds-game/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![Reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/yansz54/post-x-agent-builds-game/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)

One prompt. One game. Zero code typed.

My AI agent built a tiny browser game — **Neon Dodger** — from a single
sentence, while I watched: steer a glowing ship with the arrow keys, dodge
falling meteors, chase the score, game over, restart. The video shows the
prompt being typed, the agent writing the code line by line, and the finished
game actually running, and ends with make.fun's referral end card.

- `game.html` — the game itself: a single self-contained file, no network, no
  external assets. Open it in any browser and play.
- `main.ts` — the entry program (Node 22, stdlib only): validates `POST.json`
  and copies it to `/output/POST.json`.
- `POST.json` — the address of the X post carrying the video.
- `build/agent-builds-a-game.mp4` — the rendered video (not committed; the
  frames and render script live in `build/` during development).

The video was posted natively on X from [@yanszwjg](https://x.com/yanszwjg)
with the bounty line and the play code `makefun-picnic-quiche-gull`.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win. Come build
on make.fun: https://make.fun/r/djwcs0np

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

## License

MIT — see [LICENSE](LICENSE).
