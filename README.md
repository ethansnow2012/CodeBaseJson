
# CodeBaseJson

Convert the whole codebase to a single Json File so that you can upload to Chatgpt.

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
  <li>
  Enrich prompts to be able to deal with more cases.
  </li>
  <li>White list mode that confine the files and folders for safety.</li>
  <li>Need more complete test case.</li>
  <li>Convert more type of files to string(in the json file) so that AI can understand it.</li>
  <li>Extends this outside of the js world.</li>
  <li>Mode for silence(not so many console.log...).</li>
</ul>

<!-- ## 🧱 RFC(request for comments)
<ul>
  <li>Mechanism to deal with "// Other imports...", "// Other methods..." or other ai skipping behavior.</li>
</ul> -->

## 🧱 Usage Attempts
<ul>
  <li>
    ✅(most of the time) Game of Life in HTML
  </li>
  <li>
    ✅(most of the time) Todo-list in HTML
  </li>
  <li>
    ❌ Add a simple CRUD feature to an existing full-stack (T3 stack) app. Waiting for AI to improve in reasoning capabilities.
    <ul>
      <li>
      - Do not have enough respect for existing style. For example, I am using tailwind but it generates component using traditional component.
      </li>
      <li>
      - Do not have enough respect for existing file structure.
      </li>
    </ul>
     
  </li>
</ul>

## 📄 License

[MIT License](https://github.com/ethansnow2012/CodeBaseJson/blob/main/LICENSE) © 2024-PRESENT [Ethan Kao](https://github.com/ethansnow2012)