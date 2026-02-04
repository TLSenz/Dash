export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  html_url: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
}

export interface GitHubPR {
  id: number
  title: string
  number: number
  state: 'open' | 'closed'
  html_url: string
  created_at: string
  updated_at: string
}

export interface GitHubStats {
  user: GitHubUser | null
  repos: GitHubRepo[]
  commits: GitHubCommit[]
  pullRequests: GitHubPR[]
}