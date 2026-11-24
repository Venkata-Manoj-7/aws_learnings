output "created_file_path" {
  description = "Path of the generated local file"
  value       = local_file.demo_file.filename
}

output "created_file_id" {
  description = "SHA1 checksum ID of the generated file"
  value       = local_file.demo_file.id
}