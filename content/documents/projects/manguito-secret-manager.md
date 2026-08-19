---
title: 'Manguito Secret Manager'
fileName: 'manguito secret manager.ts'
type: 'ts'
imageUrl: '/content_img/projects/manguito_secret_manager.webp'
githubUrl: 'https://github.com/bobbykim89/manguito-secret-manager'
pageUrl: 'https://manguito-secret-manager.bobbykim.dev'
---

::hero{:image-src="imageUrl" :rounded="false" :gradient="true" alt="manguito secret manager banner image"}

## Manguito Secret Manager

::

::abstract

A self-hosted secret manager: encrypted key/value storage with a web UI for people and a scoped API key for pipelines. Secrets live in buckets, and every value is encrypted at rest under a two-tier key hierarchy, so a stolen database yields ciphertext and nothing else. Built to be operated by one person without a platform team behind it: the deployment runbook, the key rotation procedure, and the threat model are part of the project rather than tribal knowledge. Feature complete, tested end to end, and running in production on Fly, Vercel, and Neon.

::

::text-box{title="Tech Stacks" :display-border="false" :rounded="true" border-color="light-1"}

<div class="grid grid-cols-2 gap-1">
<p>Python</p>
<p>FastAPI</p>
<p>SQLAlchemy</p>
<p>Alembic</p>
<p>PostgreSQL</p>
<p>Neon</p>
<p>React 19</p>
<p>TypeScript</p>
<p>TanStack Query</p>
<p>Vite</p>
<p>TailwindCSS</p>
<p>Docker</p>
<p>Fly.io</p>
<p>Vercel</p>
</div>

::

- Designed a two-tier envelope encryption scheme where a per-bucket data key encrypts each value with AES-256-GCM under a fresh 96-bit nonce, and that data key is itself wrapped by a key-encryption key held in the environment rather than the database. A stolen backup yields no plaintext, and rotating the master key rewraps data keys instead of rewriting every secret.
- Bound each ciphertext to its `(bucket_id, key_name)` pair with length-prefixed additional authenticated data, so a ciphertext relocated to another row fails to decrypt rather than silently returning a different secret. The length prefix is the point: plain concatenation is not injective, and bucket `ab` with key `c` would otherwise produce the same AAD as bucket `a` with key `bc`.
- Made bulk reveal a property of the credential rather than of the endpoint. An API key names the buckets it may reach and whether it may write or bulk-read, only its SHA-256 hash is stored, and a browser session is refused at that endpoint whatever the signed-in user owns. Bucket and key management endpoints resolve a session and never read the `Authorization` header at all, so a leaked key is not merely rejected there, it is never read.
- Wrote the audit log fail-closed: a read that cannot be recorded against the credential that performed it is refused rather than served. A secret manager that quietly serves unlogged reads has given up the reason for having a log.
- Closed the Python to TypeScript type gap in CI. FastAPI emits OpenAPI from the Pydantic models, `openapi-typescript` compiles it into a committed client type file, and a build script imports the app object directly to dump the schema with no server or port involved. CI runs the same script and fails if the committed file differs, so changing a response shape in Python breaks `tsc` in the frontend.
- Tested the crypto layer with Hypothesis property tests covering roundtrip, tamper detection, nonce uniqueness, and cross-row relocation, and ran the backend suite against real Postgres via testcontainers rather than SQLite, because the project depends on behavior the two do not share. Currently 373 backend and 308 frontend tests.
- Pinned security properties as tests that fail when the thing they guard is removed: rendering a secret list sends zero requests for any value, no request the frontend makes contains `reveal` asserted across every request in a test rather than one URL, a hidden value's mask is the same length whatever the value is, and browser storage is empty after a secret is revealed and after a token is shown.
- Documented the trade-offs the design does not resolve. Client-side encryption under a passphrase-derived key would take the operator out of the trust boundary but is structurally incompatible with unattended pipeline access, and RCE on the API process means the KEK regardless of encryption at rest. Per-key rate limiting is deferred rather than half-built, because an in-process counter resets every time Fly stops the machine.

::flex-container

::git-button{url="https://github.com/bobbykim89/manguito-secret-manager"}

::

::button-link{url="https://manguito-secret-manager.bobbykim.dev"}
Go to page
::

::
