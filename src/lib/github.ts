import axios from 'axios'
import { GitHubUser, GitHubRepo, GitHubCommit, GitHubPR, GitHubStats } from './types'

const GITHUB_API_BASE = 'https://api.github.com'
const USERNAME = 'TLSenZ'

const githubClient = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
      'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    })
  }
})

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [userResponse, reposResponse, commitsResponse, prsResponse] = await Promise.all([
      githubClient.get<GitHubUser>(`/users/${USERNAME}`),
      githubClient.get<GitHubRepo[]>(`/users/${USERNAME}/repos?sort=updated&per_page=10`),
      githubClient.get<any>(`/search/commits?q=author:${USERNAME}&sort=date&order=desc&per_page=10`),
      githubClient.get<any>(`/search/issues?q=author:${USERNAME}+type:pr&sort=updated&order=desc&per_page=10`)
    ])

    return {
      user: userResponse.data,
      repos: reposResponse.data,
      commits: commitsResponse.data.items.map((item: any) => ({
        sha: item.sha,
        commit: item.commit,
        html_url: item.html_url
      })),
      pullRequests: prsResponse.data.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        number: item.number,
        state: item.state,
        html_url: item.html_url,
        created_at: item.created_at,
        updated_at: item.updated_at
      }))
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return {
      user: null,
      repos: [],
      commits: [],
      pullRequests: []
    }
  }
}