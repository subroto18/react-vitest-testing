export async function fetchUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("API failed");
  }

  return response.json();
}

export const response = {
  login: "subroto18",
  id: 105351439,
  node_id: "U_kgDOBkeJDw",
  avatar_url: "https://avatars.githubusercontent.com/u/105351439?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/subroto18",
  html_url: "https://github.com/subroto18",
  followers_url: "https://api.github.com/users/subroto18/followers",
  following_url:
    "https://api.github.com/users/subroto18/following{/other_user}",
  gists_url: "https://api.github.com/users/subroto18/gists{/gist_id}",
  starred_url: "https://api.github.com/users/subroto18/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/subroto18/subscriptions",
  organizations_url: "https://api.github.com/users/subroto18/orgs",
  repos_url: "https://api.github.com/users/subroto18/repos",
  events_url: "https://api.github.com/users/subroto18/events{/privacy}",
  received_events_url: "https://api.github.com/users/subroto18/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  name: "Subroto chakraborty",
  company: "EagleInbrit",
  blog: "https://www.subrotochakraborty.site/",
  location: "India",
  email: null,
  hireable: true,
  bio: "Working  at EagleInbrit as a Frontend Developer, love to travel and take pictures. Try to  build  stuff and explore the world ! #aimToAchieve 🚀📸\r\n",
  twitter_username: null,
  public_repos: 88,
  public_gists: 0,
  followers: 10,
  following: 6,
  created_at: "2022-05-11T08:52:30Z",
  updated_at: "2026-04-26T10:29:37Z",
};
