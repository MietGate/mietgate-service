$file="src\app\dashboard\page.tsx"

$content = Get-Content $file -Raw -Encoding UTF8

$content = $content -replace `
'const \{ data: files \} = await supabase[\s\S]*?setDocuments\(files\?\.length \|\| 0\);', `
'const { data: docs } = await supabase.from("documents").select("id").eq("user_id", user.id);`n`n        setDocuments(docs?.length || 0);'

Set-Content $file $content -Encoding UTF8