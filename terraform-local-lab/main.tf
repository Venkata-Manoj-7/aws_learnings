resource "local_file" "demo_file" {
  filename = "${path.module}/${var.filename}"
  content  = var.file_content
}