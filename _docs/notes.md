Create auth.json with following content:
{
  "admin": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a121313"
}

Then run this to encrypt it as auth.json.enc for github secret storage:

openssl enc -aes-256-cbc -salt -pbkdf2 -in data/auth.json -out data/auth.json.enc -pass pass:mediPilot
rm data/auth.json

✅ What’s Left to Do
Just make sure:

You’ve added the AUTH_KEY secret in GitHub > Settings > Secrets and variables > Actions > New repository secret

The encrypted file auth.json.enc is committed to your repo under data/

Your auth.js fetches /data/auth.json at runtime to validate login



bundle exec jekyll build
bundle exec jekyll serve
