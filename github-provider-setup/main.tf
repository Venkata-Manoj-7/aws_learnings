resource "github_repository" "demo_repo" {
  name        = var.repo_name
  description = var.repo_description
  visibility  = var.visibility
  topics      = var.topics
  auto_init   = true
}