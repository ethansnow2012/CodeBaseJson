
# CodeBaseJson

Convert file under ./src to a single Json File so that you can upload to Chatgpt.

## 📄 Usage
#### 1. install and compress
##### (globally)
```
npm install -g cbj
```
##### (or locally)
```
npm install -D cbj // pnpm install -D cbj

npx cbj compress // or pnpm exec cbj compress
npx cbj decompress // or pnpm exec cbj decompress
```


File will be created at ./cbj_representation.json

If not lastest:　"npx cbj@latest compress" to run the lastest

(Optional) To initiate base cbj_representation.json with "npx cbj init"

#### 2. install and compress
Just upload to chat gpt with prompt template(maybe). 

#### 3. download the result
Rename the result to "cbj_representation.json" then use "npx cbj decompress".

#### 4. check the result
Good luck.



## 📄 ChatGpt Prompt Template
```
[cbj_representation.json]
This is my codebase.
<Make a wish here.>

// response formating
Generated source code should be in ./src folder.
Just give me  **json**,  **file** format with content Array of {"path":string, "content":string}  to download.
```
Next we expect ChatGpt give us the result in [cbj_representation.json].

## 🐣 Feature
<ul>
  <li>✅Check uncommitted changes before overwrite.</li>
  <li>✅Respect .gitignore file.</li>
</ul>

## 🧱 Contribution

Welcome. Just PR or open issue.
<ul>
  <li>Need more complete test case.</li>
  <li>Convert more type of files to string(in the json file) so that AI can understand it.</li>
  <li>Extends this outside of the js world.</li>
  <li>Mode for silence(not so many console.log...).</li>
</ul>

## 📄 License

[MIT License](https://github.com/ethansnow2012/CodeBaseJson/blob/main/LICENSE) © 2024-PRESENT [Ethan Kao](https://github.com/ethansnow2012)