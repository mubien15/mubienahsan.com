# Paid Execution Kit

The active paid download is `execution-kit-v1.1.enc`. The download route checks a
signed, expiring buyer token before decrypting it with `EXECUTION_KIT_V1_1_FILE_KEY`.
The key is a Vercel Secret. It cannot be retrieved after saving.

Editable source files are kept locally in the Git-ignored
`outputs/execution-kit-YYYY-MM-DD/` folders. The current source folder is
`outputs/execution-kit-2026-11-23/`; the original is
`outputs/execution-kit-2026-09-24/`. Search ignored files when locating them.
Keep a private backup of the workbook, guide, templates, and licence before
creating a new encrypted version. Do not put plaintext paid files in `public/`
or commit them to this repository.

A future version can use a separate encryption key and ciphertext file. Add the
new key before deploying the matching download route. Keep the access-token
secret and product SKU stable so existing valid buyer links continue to work.
