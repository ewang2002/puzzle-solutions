# Check if we have any arguments
if ($args.Count -ne 1) {
    Write-Host "Need at least one argument."
    exit 1
}

# Get first argument
$num = $args[0];

$files = Get-ChildItem "."
$found = ""
foreach ($f in $files) {
    # Split name so that we get the first part of the file name, which should be
    # the problem number.
    $name = $f.Name.Split('-')[0]
    if ($name -ne $num) {
        continue 
    }

    $found = $f
    break
}

if ([string]::IsNullOrEmpty($found)) {
    Write-Warning "No folder with that number found."
    exit 1
}

# Find the first java file in that directory
$javaFiles = Get-ChildItem $found | Where-Object {$_.Extension.ToLower() -eq ".java"}
# Find the first TS file in that directory
$tsFiles = Get-ChildItem $found | Where-Object {$_.Extension.ToLower() -eq ".ts"}

# Check if we have any Java or TS files
if ($javaFiles.Length -eq 0 -and $tsFiles.Length -eq 0) {
    Write-Host "No .java or .ts files found in the specified directory, $($found.Name)."
    exit 1
}

# If we have both files, ask user which one to run
$ext = $null
if ($javaFiles.Length -gt 0 -and $tsFiles.Length -gt 0) {
    Write-Host "Found both Java and TypeScript solution files. Type the number corresponding to the one you want to run:"
    Write-Host "1. Java ($($javaFiles[0].Name))"
    Write-Host "2. TypeScript ($($tsFiles[0].Name))"

    while ($true) {
        $choice = Read-Host "> "
        if ($choice -eq "1") {
            $targetFile = $javaFiles[0]
            $ext = "java"
            break
        } elseif ($choice -eq "2") {
            $targetFile = $tsFiles[0]
            $ext = "ts"
            break
        } else {
            Write-Host "Invalid choice. Please enter 1 or 2."
        }
    }
} elseif ($javaFiles.Length -gt 0) {
    # If only Java files are found, use the first one
    $targetFile = $javaFiles[0]
    $ext = "java"
} else {
    # If only TypeScript files are found, use the first one
    $targetFile = $tsFiles[0]
    $ext = "ts"
}

# If we're working with a Java file...
if ($ext -eq "java") {
    # Get all files from the dependencies folder
    $depFiles = Get-ChildItem "dependencies" | Where-Object {$_.Extension -eq ".java"}

    # Copy these files to the target file's directory, making a note of their names
    $depNames = @()
    foreach ($f in $depFiles) {
        $fullPath = "$($targetFile.Directory)/$($f.Name)"
        Copy-Item $f.FullName $fullPath
        $depNames += $fullPath
    }

    javac "$($targetFile.DirectoryName)/*.java"
    Set-Location $targetFile.DirectoryName
    java $targetFile.Name.Split('.')[0]
    Set-Location ..

    # After 1 second, delete all class files in case something in the background is still using them
    Start-Sleep -Seconds 1
    $files = Get-ChildItem $targetFile.Directory | Where-Object {$_.Extension -eq ".class"}
    foreach ($f in $files) {
        $f.Delete()
    }

    # And then delete the java files that were copied into the directory from $depFiles
    foreach ($name in $depNames) {
        Remove-Item $name -Force
    }
}
# If we're working with a TypeScript file...
elseif ($ext -eq "ts") {
    Set-Location $targetFile.DirectoryName

    # tsc won't allow us to transpile all files using a wildcard (e.g., *.ts), so we need to specify
    # all target files explicitly.

    Get-ChildItem $targetFile.Directory | Where-Object {$_.Extension -eq ".ts"} | ForEach-Object {
        tsc $_
    }

    # Then, run the target file in JS form
    node $targetFile.Name.Split('.')[0] + ".js"

    # Then, clean up the transpiled JavaScript files
    $jsFiles = Get-ChildItem $targetFile.Directory | Where-Object {$_.Extension -eq ".js"}

    Start-Sleep -Seconds 1
    foreach ($f in $jsFiles) {
        $f.Delete()
    }

    Set-Location ..
}
else {
    Write-Host "Unsupported file type: $ext"
    exit 1
}