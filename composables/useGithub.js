// let blob = new Blob([frontmatter], { type: "text/markdown" });
// let url = URL.createObjectURL(blob);
// let link = document.createElement("a");
// link.href = url;
// link.download = `${restaurante.value}.md`;
// URL.revokeObjectURL(url);

//   let filename = `${restaurante.value}.md`

//github upload shenanigans

// Replace with your own GitHub settings
const config = useRuntimeConfig();
const GITHUB_TOKEN = config.public.GITHUB_TOKEN;
const GITHUB_USERNAME = "bolokoz";
const GITHUB_REPO = "furushow5";
const GITHUB_BRANCH = "main";
const PATH = "content/articles/foodrating/parmegianologo";

// Convert content to Base64 (required by GitHub API)
const contentBase64 = btoa(unescape(encodeURIComponent(frontmatter)));

// Upload the file to GitHub
 response = await fetch(
  `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}/${link.download}`,
  {
    method: "PUT",
    headers: {
      Authorization: `token ${config.public.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Added ${link.download} from api`,
      content: contentBase64,
      branch: GITHUB_BRANCH,
    }),
  }
);

export async function useGithub(path, title, text){
    
    //encode text to base64 to be accepted into github
    let contentBase64 = btoa(unescape(encodeURIComponent(text)));

    async function uploadFile(){

        const result = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${path}/${title}.md`,
            {
                method: "PUT",
                headers: {
                    Authorization: `token ${config.public.GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `Added ${title}.md from API`,
                    content: contentBase64,
                    branch: GITHUB_BRANCH,
                }),
            }
        )
    }

    return {result}
}