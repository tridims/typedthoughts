---
name: new-til
description: Scaffold a new bootstrapped TIL (Today I Learned) content entry. Use when creating a new TIL post or when asked to bootstrap a TIL file.
---

# Create a New TIL Entry

When the user asks to create a new TIL entry, follow this process.

## File naming convention

Files live in `src/content/til/` and follow this pattern:

```
YYYY-MM-DD-kebab-case-slug.mdx
```

Use today's date (from the current date context) for `YYYY-MM-DD`. Derive the slug from the TIL title: lowercase, spaces replaced with hyphens, special characters stripped.

## Frontmatter

Required fields: `title`, `pubDate`
Optional fields: `description`, `tags`, `updatedDate`

```yaml
---
title: "Short, specific title of what was learned"
pubDate: "YYYY-MM-DD"
description: "One-sentence summary of the insight."
tags: ["Tag1", "Tag2"]
---
```

- `title`: Keep it concise and specific (e.g. "Limiting concurrency with errgroup.SetLimit")
- `pubDate`: Use the `YYYY-MM-DD` date string format (not ISO datetime)
- `description`: One sentence that captures the key takeaway
- `tags`: 1–3 PascalCase technology/topic tags (e.g. "Go", "Kubernetes", "Docker")

## Body content style

1. **Opening paragraph**: 1–2 sentences of context — what problem existed or what triggered the discovery. No heading needed.
2. **Code block** (if applicable): A focused, minimal snippet demonstrating the technique. Use the correct language identifier (` ```go `, ` ```bash `, etc.).
3. **Closing paragraph** (optional): 1–3 sentences explaining what the snippet does, any nuances, caveats, or follow-up tips.

Keep the total body short — TILs are micro-posts, not articles. Aim for 50–150 words of prose max.

## Example

```mdx
---
title: "Debugging a node with kubectl debug"
pubDate: "2026-05-27"
description: "kubectl debug can drop you into a privileged pod on a specific node without SSH access."
tags: ["Kubernetes", "Debugging"]
---

When a node misbehaves and SSH is locked down, `kubectl debug` can attach a
throwaway container straight onto the host's namespaces.

` `` `bash
kubectl debug node/my-node-1 -it --image=busybox
` `` `

This schedules a pod on `my-node-1` that shares the host's PID, network, and IPC
namespaces, mounting the root filesystem under `/host`. From there I can inspect
`/host/var/log`, check running processes, or poke at the kubelet — then delete
the pod and leave no trace on the node itself.
```

## What to ask the user if not provided

If the user gives a topic or rough idea but not all details, infer what you can and fill in the rest. Only ask a follow-up question if the topic is too vague to write anything meaningful.

## After creating the file

Tell the user the filename that was created and the full path, e.g.:
> Created `src/content/til/2026-07-08-my-new-til.mdx`
