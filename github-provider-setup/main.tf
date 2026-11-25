resource "github_repository" "demo_repo" {
  name                   = var.repo_name
  description            = var.repo_description
  visibility             = var.visibility
  topics                 = var.topics
  auto_init              = true
  has_issues             = true
  delete_branch_on_merge = true
  gitignore_template     = "Terraform"
}

data "github_user" "current" {
  username = ""
}

/*resource "github_issue" "demo_issue" {
  repository = github_repository.demo_repo.name
  title      = "Terraform Lifecycle Test Issue"
  body       = "Created automatically by ${data.github_user.current.login} via Terraform!"
  assignees  = [data.github_user.current.login]
}*/
