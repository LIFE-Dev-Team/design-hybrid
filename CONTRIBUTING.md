# Git remotes for LIFE180 machines

This repo lives under **LIFE-Dev-Team** (work org). On machines with split SSH keys:

| Host alias | Account | Use for |
|------------|---------|---------|
| `git@github-work:` | clarke-life180 | LIFE-Dev-Team repos (this repo) |
| `git@github-personal:` | hospcreative | Personal/non-LIFE180 repos |

**Do not use bare `git@github.com:`** — it has no key configured on this machine.

```bash
git clone git@github-work:LIFE-Dev-Team/design-hybrid.git
```

HTTPS also works: `https://github.com/LIFE-Dev-Team/design-hybrid`
