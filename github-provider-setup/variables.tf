variable "repo_name" {
  type        = string
  description = "Name of the GitHub repository"
  default     = "terraform-managed-demo-repo"
}

variable "repo_description" {
  type        = string
  description = "Short description shown on the GitHub repo"
  default     = "Updated in-place via Terraform without recreating!"
}

variable "visibility" {
  type        = string
  description = "Repository visibility: public or private"
  default     = "public"

  validation {
    condition     = contains(["public", "private"], var.visibility)
    error_message = "Visibility must be either \"public\" or \"private\"."
  }
}

variable "topics" {
  type        = list(string)
  description = "Searchable topic tags for the repository"
  default     = ["terraform", "iac", "devops"]
}
