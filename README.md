## :computer: Creating your own portfolio
 1. Manually create a new repository called `your-github-username`.github.io at GitHub:
 2.  Clone the `code` branch of `guipiveti/guipiveti.guithub.com` by using the following command:
 ``` bash
git clone -b code https://github.com/guipiveti/guipiveti.github.io.git
```
 3. Edit the `homepage` declaration in **`package.json`** to:
```"homepage":  "https://your-github-username.github.io"```
 4. Edit the **username,  default_name and linkedinUrl constants**  in ```src/pages/Portfolio/index.js``` .
 5. Run:
 ```bash
 npm install
 ```
 
 6. Deploy your portfolio:
```bash
npm run deploy
```
 7. Your portfolio should be available in minutes by acessing https://`your-github-username`.github.io