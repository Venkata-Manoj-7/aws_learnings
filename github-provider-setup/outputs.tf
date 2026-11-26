output "repo_html_url" {
  description = "Direct browser link to the created GitHub repository"
  value       = github_repository.demo_repo.html_url
}

output "repo_full_name" {
  description = "Owner and repository name (owner/repo)"
  value       = github_repository.demo_repo.full_name
}

output "repo_ssh_clone_url" {
  description = "SSH URL for cloning the repository locally"
  value       = github_repository.demo_repo.ssh_clone_url
}


