
# CodeBaseJson

Convert file under ./src to a single Json File so that you can upload to Chatgpt.

## 📄 Usage
#### 1. install and compress
```
pnpm install -D cbj

npx cbj compress // or pnpm exec cbj compress
npx cbj decompress // or pnpm exec cbj decompress
```

```
npm install -D cbj

npx cbj compress 
//or 
npx cbj decompress 
```
File will be created at ./cbj_representation.json

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


## 🧱 Contribution

Welcome. Just PR.

## 📄 License

[MIT License](https://github.com/ethansnow2012/CodeBaseJson/blob/main/LICENSE) © 2019-PRESENT [Ethan Kao](https://github.com/ethansnow2012)