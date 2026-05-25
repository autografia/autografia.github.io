# ===== CAMBIA SOLO ESTO =====
$RutaFotos="D:\Fotos\Moralet_2025"
# ============================

$Cantidad=5
$Calidad=65
$Resolucion="1366x768"

$imagenes = Get-ChildItem $RutaFotos `
-Include *.jpg,*.jpeg,*.png `
-File

if($imagenes.Count -lt $Cantidad){
    Write-Host "No hay suficientes fotos"
    exit
}

$seleccion = $imagenes | Get-Random -Count $Cantidad

Write-Host "Fotos seleccionadas:"
$seleccion | ForEach-Object { Write-Host $_.Name }

foreach($img in $seleccion){

    $nombre = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)

    $salida = Join-Path $RutaFotos "$nombre-min.webp"

    magick `
        "$($img.FullName)" `
        -resize $Resolucion `
        -quality $Calidad `
        -strip `
        "$salida"
}

Write-Host ""
Write-Host "Listo. WebP generados en la misma carpeta."